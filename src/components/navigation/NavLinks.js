import NavLink from "./NavLink";
import ListWindowTap from "./ListWindowTap";

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

  const allLinks = [
    ...links,
    { label: "Cart", href: "/cart" },
    { label: "Whitelist", href: "/whitelist" },
    { label: "Account settings", href: "/account/settings" },
    { label: "Add Product", href: "/account/addProduct" },
    { label: "Manage Products", href: "/account/manageProducts" },
    { label: "SignIn", href: "/signIn" },
    { label: "Product", href: "/shop/78" },
    { label: "Not Found", href: "/not-found" },
  ];

  return (
    <menu className="flex justify-center gap-4 font-semibold text-gray-700 sm:gap-5 sm:text-lg lg:gap-10 lg:text-xl">
      {links.map(({ href, label }) => (
        <NavLink href={href} label={label} key={href} />
      ))}
      <ListWindowTap allLinks={allLinks} />
    </menu>
  );
}

export default NavLinks;
