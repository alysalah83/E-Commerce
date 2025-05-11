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
    <menu className="flex justify-center gap-5 text-lg font-semibold text-gray-700 lg:gap-10 lg:text-xl">
      {links.map(({ href, label }) => (
        <NavLink href={href} label={label} key={href} />
      ))}
    </menu>
  );
}

export default NavLinks;
