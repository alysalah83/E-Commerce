"use client";
import { useCart } from "@/src/contexts/HybridStorageFactory";
import OverLay from "../common/OverLay";
import CartSideBar from "./CartSideBar";
import { memo } from "react";

function SideBarCart() {
  const { showPanel, handleTogglePanel } = useCart();
  return (
    <>
      <OverLay visible={showPanel} handleToggleVisibility={handleTogglePanel} />
      <CartSideBar visible={showPanel} handleToggleCart={handleTogglePanel} />
    </>
  );
}

export default memo(SideBarCart);
