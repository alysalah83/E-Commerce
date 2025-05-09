import ButtonLink from "../common/ButtonLink";

function EmptyPage({ label, Icon, buttonLargePadding = false }) {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="rounded-full bg-gray-100 p-8">{Icon}</div>
      <h3 className="text-lg font-medium tracking-wide text-gray-400 capitalize">
        {label}
      </h3>
      <ButtonLink
        href="/shop"
        classes="xl:text-xl xl:w-[85%]"
        color="bg-blue-900"
        hoverColor="hover:bg-blue-950"
        buttonLargePadding={buttonLargePadding}
      >
        Continue shopping
      </ButtonLink>
    </div>
  );
}

export default EmptyPage;
