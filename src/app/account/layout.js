import AccountSideNav from "@/src/components/account/AccountSideNav";
import PageHeader from "@/src/components/common/PageHeader";

function layout({ children }) {
  return (
    <>
      <PageHeader heading="Account" />
      <div className="flex w-full">
        <AccountSideNav />
        {children}
      </div>
    </>
  );
}

export default layout;
