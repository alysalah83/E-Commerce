import SectionHeader from "@/src/components/common/SectionHeader";
import Button from "../common/Button";
import { IoBagHandleOutline } from "react-icons/io5";
import Link from "next/link";

function NewHeader() {
  return (
    <SectionHeader
      title="new arrivals"
      label="this weak's"
      icon={<IoBagHandleOutline />}
      button={
        <Link href="/shop?date=latestProducts">
          <Button type="secondary" size="small">
            view all
          </Button>
        </Link>
      }
    />
  );
}

export default NewHeader;
