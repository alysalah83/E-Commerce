import {
  HIGHEST_DISCOUNT_RANGE_FROM,
  HIGHEST_DISCOUNT_RANGE_TO,
  HIGHEST_RATING_RANGE_FROM,
  HIGHEST_RATING_RANGE_TO,
  NEW_PRODUCT_COUNT,
  PAGINATION_ITEMS_PER_PAGE,
  PAGINATION_POPULAR_ITEMS_PER_PAGE,
} from "./config";
import { supabase } from "./supabase/supabase";

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Couldn't create the product");
  }

  return data;
}

export async function getHightestDiscountProducts() {
  const { data, error } = await supabase
    .from("products")
    .select()
    .order("discountPercentage", { ascending: false })
    .range(HIGHEST_DISCOUNT_RANGE_FROM, HIGHEST_DISCOUNT_RANGE_TO);

  if (error) {
    console.error(error);
    throw new Error("couldn't get the discount products");
  }

  return data;
}

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select(`
    id, 
    category,
    image,
    products_count:products(count)
  `);
  if (error) {
    console.error(error);
    throw new Error("couldn't get categories");
  }

  return data;
}

export async function getNewProductsWithLimit() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .gt("stock", 0)
    .order("created_at", { ascending: false })
    .limit(NEW_PRODUCT_COUNT);

  if (error) {
    console.error(error);
    throw new Error("couldn't get new products");
  }

  return data;
}

export async function getNewProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .gt("stock", 0)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("couldn't get new products");
  }

  return data;
}

export async function getHightestRatedProducts({ allProducts, page = false }) {
  let query = supabase
    .from("products")
    .select()
    .order("rating", { ascending: false });

  if (!allProducts)
    query = query.range(HIGHEST_RATING_RANGE_FROM, HIGHEST_RATING_RANGE_TO);

  if (page)
    query = query.range(
      (page - 1) * PAGINATION_POPULAR_ITEMS_PER_PAGE,
      page * PAGINATION_POPULAR_ITEMS_PER_PAGE - 1,
    );

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("couldn't get the best sellers products");
  }

  return data;
}

export async function getProductPriceRange(params) {
  const [highestQuery, lowestQuery] = await Promise.all([
    supabase
      .from("products")
      .select("price")
      .order("price", { ascending: false })
      .limit(1),
    supabase
      .from("products")
      .select("price")
      .order("price", { ascending: true })
      .limit(1),
  ]);

  // Handle errors
  if (highestQuery.error || lowestQuery.error) {
    console.error(highestQuery.error || lowestQuery.error);
    throw new Error("Couldn't get the prices");
  }

  return {
    highestPrice: highestQuery.data[0]?.price || null,
    lowestPrice: lowestQuery.data[0]?.price || null,
  };
}

export async function getProductsCount() {
  const { count, error } = await supabase.from("products").select("*", {
    count: "exact",
    head: true,
  });

  if (error) {
    console.error(error);
    throw new Error("couldnt get the count of products for pagination");
  }

  return count;
}

export async function geNewtProductsPerPage(page) {
  const { data, error } = await supabase
    .from("products")
    .select()
    .order("created_at", { ascending: false })
    .range(
      (page - 1) * PAGINATION_ITEMS_PER_PAGE,
      page * PAGINATION_ITEMS_PER_PAGE - 1,
    );

  if (error) {
    console.error(error);
    throw new Error("couldnt get the products per page");
  }

  return data;
}

export async function getFilteredProducts(
  page,
  categoryParams,
  minPrice,
  maxPrice,
  date,
) {
  const categories = categoryParams?.split("_").filter(Boolean) || [];

  let countQuery = supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .gte("price", minPrice || 0)
    .lte("price", maxPrice || Infinity);

  let dataQuery = supabase
    .from("products")
    .select("*")
    .gte("price", minPrice || 0)
    .lte("price", maxPrice || Infinity)
    .order("created_at", { ascending: date === "oldestProducts" })
    .range(
      (page - 1) * PAGINATION_ITEMS_PER_PAGE,
      page * PAGINATION_ITEMS_PER_PAGE - 1,
    );

  if (categories.length > 0) {
    countQuery = countQuery.in("category", categories);
    dataQuery = dataQuery.in("category", categories);
  }

  const [dataResult, countResult] = await Promise.all([dataQuery, countQuery]);

  const { data, error: dataError } = dataResult;
  const { count, error: countError } = countResult;

  if (countError) {
    console.error(countError);
    throw new Error("Could not get total count");
  }
  if (dataError) {
    console.error(dataError);
    throw new Error("Could not get filtered products");
  }

  return {
    products: data,
    productsCount: count || 0,
  };
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("couldnt get the product");
  }

  return data;
}

export async function getAllProductsId() {
  const { data, error } = await supabase.from("products").select("id");

  if (error) {
    console.error(error);
    throw new Error("couldnt get the products id");
  }

  return data;
}

export async function addReview({
  productId,
  rating,
  comment,
  reviewerName,
  reviewerEmail,
}) {
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("reviews")
    .eq("id", productId)
    .single();

  if (fetchError) {
    console.error("Error fetching product:", fetchError);
    throw new Error("Couldn't fetch product details");
  }

  const newReview = {
    date: new Date().toISOString(),
    rating,
    comment,
    reviewerName,
    reviewerEmail,
  };

  const currentReviews = product.reviews || [];
  const updatedReviews = [...currentReviews, newReview];

  const totalRatings = updatedReviews.reduce(
    (sum, review) => sum + review.rating,
    0,
  );
  const averageRating =
    updatedReviews.length > 0
      ? parseFloat((totalRatings / updatedReviews.length).toFixed(1))
      : 0;

  const { error } = await supabase
    .from("products")
    .update({
      reviews: updatedReviews,
      rating: averageRating,
    })
    .eq("id", productId)
    .select();

  if (error) {
    console.error("Error adding review:", error);
    return {
      success: false,
      message: "Couldn't add your review",
    };
  }

  return { success: true };
}

export async function getProductsByIds(cartItemsId) {
  if (cartItemsId.length === 0 || !cartItemsId) return [];

  const ids = cartItemsId.map((item) => item.id);

  const { data, error } = await supabase
    .from("products")
    .select("id, title, image, price, stock")
    .in("id", ids);

  if (error) {
    console.error(error);
    throw new Error("couldn't get the cart products");
  }

  return data;
}

export async function checkEmailExists(email) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking email:", error);
    return false;
  }

  return !!data;
}

export async function addUser({ fullName, email }) {
  const { error } = await supabase
    .from("users")
    .insert([{ fullName, email }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("couldn't sign in");
  }
}

export async function getUserByEmail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("id,fullName")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error checking email:", error);
    return false;
  }

  return { id: data.id, fullName: data.fullName };
}

export async function updateUser({ fullName, address, email }) {
  const { data, error } = await supabase
    .from("users")
    .update({ fullName, address })
    .eq("email", email)
    .select();

  if (error) {
    console.error(error);
    return { success: false, message: "couldn\'t update your information" };
  }
  return { success: true, message: "your setting has been updated" };
}

export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error checking email:", error);
    throw new Error("couldn't get account information");
  }

  return data;
}

export async function getUserCartOrWhitelist({ email, key }) {
  const { data, error: fetchError } = await supabase
    .from("users")
    .select(key)
    .eq("email", email)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error(`Could not fetch user ${key}`);
  }

  return data[key] || [];
}

export async function updateUserCartOrWhitelist({
  email,
  item: newItem,
  items: newItems,
  key,
  action,
}) {
  const curItems = await getUserCartOrWhitelist({ email, key });

  let updatedItems;

  switch (action) {
    case "mergeItems":
      updatedItems = [
        ...curItems,
        ...newItems.filter(
          (item) => !curItems.some((curItem) => curItem.id === item.id),
        ),
      ];
      break;
    case "addItem":
      const isAdded = curItems.some((curItem) => curItem.id === newItem.id);
      updatedItems = isAdded ? [...curItems] : [...curItems, newItem];
      break;
    case "updateItem":
      updatedItems = curItems.map((item) =>
        item.id === newItem.id
          ? { id: newItem.id, count: newItem.count }
          : item,
      );
      break;
    case "removeItem":
      updatedItems = curItems.filter((curItem) => curItem.id !== newItem.id);
      break;
    default:
      throw new Error("invalid action");
  }

  const { data: updatedData, error } = await supabase
    .from("users")
    .update({ [key]: updatedItems })
    .eq("email", email)
    .select();

  if (error) {
    console.error(error);
    throw new Error(`couldn't update the ${key}`);
  }

  return updatedData;
}

export async function getUserProducts({ email, key }) {
  const { data, error: fetchError } = await supabase
    .from("users")
    .select(key)
    .eq("email", email)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error(`Could not fetch user ${key}`);
  }

  const itemsArr = data[key] || [];

  if (itemsArr.length === 0 || !itemsArr) return [];
  const items = (await getProductsByIds(itemsArr)) || [];

  const itemsWithCount = items?.map((item) => {
    const itemCount =
      itemsArr.find((itemObj) => itemObj.id === item.id)?.count || 1;
    return { ...item, count: itemCount };
  });

  return itemsWithCount || [];
}

export async function getSearchItems(query) {
  const { data, error } = await supabase
    .from("products")
    .select("id, image, title, price, rating, brand")
    .like("title", `%${query}%`)
    .order("title", { ascending: true })
    .range(0, 10);

  if (error) {
    console.error(error);
    throw new Error("couldn't get search query products");
  }
  return data;
}

export async function uploadProductImage(imageFile) {
  const imageName = `${Math.random()}_${imageFile.name}`;

  const { data, error } = await supabase.storage
    .from("products-images")
    .upload(imageName, imageFile);

  if (error) {
    console.error(error);
    return {
      success: false,
      error: true,
      message: "couldn't upload that the image",
    };
  }

  return data;
}

export async function addProduct(product) {
  const { error } = await supabase.from("products").insert([product]);

  if (error) {
    console.error(error);
    return {
      success: false,
      message: "couldn't upload the product",
    };
  }

  return null;
}

export async function getCategoryId(category) {
  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("category", category)
    .single();

  if (error) {
    console.error("Error fetching category:", error);
    return { success: false, error: true, message: "inVialed category" };
  }

  return data.id;
}

export async function getUserOwnProducts(userId) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("userID", userId);

  if (error) {
    console.error(error);
    throw new Error("couldn't get the user products");
  }

  return data;
}

export async function deleteProduct(productId) {
  if (!productId) throw new Error("now product selected to be deleted");

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error(error);
    throw new Error("couldn't delete the product");
  }
}
