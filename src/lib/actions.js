"use server";

import { revalidatePath } from "next/cache";
import {
  addReview as addReviewApi,
  getCategoryId,
  uploadProductImage,
} from "./data-service";
import { auth, signIn, signOut } from "../auth";
import {
  updateUser as updateUserApi,
  addProduct as addProductApi,
} from "./data-service";
import { useQueryClient } from "@tanstack/react-query";

export async function addReview(productId, rating, prevState, formData) {
  const comment = formData.get("comment");
  const reviewerName = formData.get("reviewerName");
  const reviewerEmail = formData.get("reviewerEmail");

  if (!rating)
    return {
      success: false,
      message: "You must add a rating",
    };

  if (comment.length > 250)
    return {
      success: false,
      message: "comment are too long",
    };

  if (comment.trim().length < 2)
    return {
      success: false,
      message: "comment are too short",
    };

  if (
    !reviewerName ||
    reviewerName.trim() === "" ||
    reviewerName.length > 50 ||
    reviewerName.length < 2
  )
    return {
      success: false,
      message: "Enter a valid name",
    };

  if (
    !reviewerEmail ||
    reviewerEmail.trim() === "" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewerEmail)
  )
    return {
      success: false,
      message: "enter a valid email",
    };

  const state = await addReviewApi({
    productId,
    comment,
    reviewerName,
    reviewerEmail,
    rating,
  });

  if (!state.success) return state;

  revalidatePath(`/shop/${productId}`);

  return { success: true, message: "your review has been added successfully" };
}

export async function updateUser(email, prevState, formData) {
  const session = await auth();
  if (!session) return { success: false, message: "user isn't logged in" };
  const { user } = session;

  if (user.email !== email)
    return {
      success: false,
      message: "user only allowed to update his information",
    };

  const fullName = formData.get("fullName");
  const address = formData.get("address");

  if (fullName.trim().length > 30)
    return {
      success: false,
      message: "Full Name must be less than 30 letters",
    };
  if (fullName.trim().length < 5)
    return {
      success: false,
      message: "Full Name must be greater than 5 letters",
    };

  if (fullName.trim().length > 100)
    return { success: false, message: "Address must be less than 100 letters" };
  const state = await updateUserApi({ fullName, address, email });

  if (!state.success) return state;

  revalidatePath("/");

  return { success: true, message: "user settings has been updated" };
}

export async function addProduct(prevState, formData) {
  const product = {};
  for (const [key, value] of formData.entries()) product[key] = value;
  console.log(product);
  const { category, imageFile } = product;
  const title = product.title.trim();
  const brand = product.brand.trim();
  const description = product.description.trim();
  const price = Number(product.price);
  const stock = Number(product.stock);

  if (title.length > 100)
    return { success: false, message: "title must be less than 100 letter" };

  if (brand.length > 50)
    return { success: false, message: "brand must be less than 50 letter" };

  if (price <= 0)
    return { success: false, message: "price must be greater than 0" };

  if (price >= 100000)
    return {
      success: false,
      message: "can't publish products with large price",
    };

  if (stock <= 0 && stock > 10000)
    return { success: false, message: "in vialed stock number" };

  if (description.length > 5000)
    return {
      success: false,
      message: "description must be less than 5000 letter",
    };

  const categoriesID = await getCategoryId(category);
  console.log(categoriesID);

  if (categoriesID.error) return categoriesID;

  const data = await uploadProductImage(imageFile);

  console.log(data);

  if (data.error) return data;

  const error = await addProductApi({
    image: `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`,
    title,
    category,
    price,
    discountPercentage: 0,
    description,
    brand,
    stock,
    rating: 0,
    reviews: [],
    categoriesID,
  });

  if (error) return error;

  return { success: true, message: "Your product has been added" };
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account/settings" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
