import FooterCard from "./FooterCard";
import FooterLists from "./FooterLists";
import FooterReversedRights from "./FooterReversedRights";

function Footer() {
  return (
    <footer>
      <div className="mx-auto mt-16 max-w-7xl p-6 pt-0 pb-0">
        <FooterCard />
        <FooterLists />
      </div>
      <FooterReversedRights />
    </footer>
  );
}

export default Footer;
