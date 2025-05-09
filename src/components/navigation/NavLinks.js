import NavLink from "./NavLink";

function NavLinks() {
  const links = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "Popular",
      href: "/popular",
    },

    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <menu className="flex justify-center gap-7 text-xl font-bold text-slate-600 lg:gap-12 lg:text-[22px]">
      {links.map(({ href, label }) => (
        <NavLink href={href} label={label} key={href} />
      ))}
    </menu>
  );
}

export default NavLinks;
