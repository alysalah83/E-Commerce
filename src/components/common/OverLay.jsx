function OverLay({
  visible,
  handleToggleVisibility,
  color = "bg-blue-900/60",
}) {
  const visibility = visible ? "block" : "hidden";

  return (
    <div
      className={`fixed ${visibility} inset-0 z-30 ${color} cursor-pointer`}
      onClick={handleToggleVisibility}
    />
  );
}

export default OverLay;
