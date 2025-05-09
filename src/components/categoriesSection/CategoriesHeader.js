import { IoPricetagsOutline } from "react-icons/io5";
import CategoriesButtons from "./CategoriesButtons";
import SectionHeader from "@/src/components/common/SectionHeader";

function CategoriesHeader() {
  return (
    <SectionHeader
      title="Categories"
      label="Browser by Categories"
      icon={<IoPricetagsOutline />}
      button={<CategoriesButtons />}
    />
  );
}

export default CategoriesHeader;
