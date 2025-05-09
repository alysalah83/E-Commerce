/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://cdn.dummyjson.com/products/images/**"),
      new URL(
        "https://msxxdsxdobsfqyxuvjla.supabase.co/storage/v1/object/public/categories//**",
      ),
      new URL("https://lh3.googleusercontent.com/a/**"),
    ],
  },
};

export default nextConfig;
