"use client";
import { useCart } from "@/src/hooks/useCart";
import OverLay from "../common/OverLay";
import CartSideBar from "./CartSideBar";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { togglePanel } from "@/src/store/cartSlice";

function SideBarCart() {
  const {
    showPanel,
    totalPrice,
    products,
    isLoading,
    totalItems,
    handleActions,
    getItemCount,
  } = useCart();
  const dispatch = useDispatch();

  const handleTogglePanel = useCallback(
    () => dispatch(togglePanel()),
    [dispatch],
  );

  return (
    <>
      <OverLay visible={showPanel} handleToggleVisibility={handleTogglePanel} />
      <CartSideBar
        items={products}
        isLoading={isLoading}
        totalItems={totalItems}
        visible={showPanel}
        handleToggleCart={handleTogglePanel}
        totalPrice={totalPrice}
        handleActions={handleActions}
        getItemCount={getItemCount}
      />
    </>
  );
}

export default memo(SideBarCart);
