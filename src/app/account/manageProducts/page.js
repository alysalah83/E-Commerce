import { auth } from "@/src/auth";
import EmptyPage from "@/src/components/common/EmptyPage";
import ProductItem from "@/src/components/common/ProductItem";
import { getUserOwnProducts } from "@/src/lib/data-service";
import { MdOutlineAddShoppingCart } from "react-icons/md";

async function page() {
  const session = await auth();
  const products = await getUserOwnProducts(session?.user?.userId);
  const isEmpty = products.length === 0;

  return (
    <div className="w-full bg-gray-100 p-10">
      <main
        className={`my-14 ${isEmpty ? "mx-auto max-w-xl" : "w-full"} rounded-xl bg-white px-4 py-6`}
      >
        {!isEmpty ? (
          products.map((product) => (
            <ProductItem
              item={product}
              highlightQuery={false}
              manageProduct={true}
              key={product.id}
            />
          ))
        ) : (
          <EmptyPage
            Icon={
              <MdOutlineAddShoppingCart className="h-8 w-8 text-blue-600" />
            }
            label="No products to display!"
            buttonLabel="Add products"
            buttonHref="/account/addProduct"
          />
        )}
      </main>
    </div>
  );
}

export default page;
