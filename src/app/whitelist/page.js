import PageHeader from "@/src/components/common/PageHeader";
import WhitelistContent from "@/src/components/whitelist/WhitelistContent";

export const metadata = {
  title: "Whitelist",
};

function page() {
  return (
    <>
      <PageHeader heading="whitelist" />
      <WhitelistContent />
    </>
  );
}

export default page;
