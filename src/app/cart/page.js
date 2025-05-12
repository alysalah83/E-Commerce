import Cart from "@/src/components/cart/Cart";
import PageHeader from "@/src/components/common/PageHeader";

export const dynamic = "force-static";

export const metadata = {
  title: "Cart",
};

function page() {
  return (
    <>
      <PageHeader heading="Cart" />
      <Cart />
    </>
  );
}

export default page;
