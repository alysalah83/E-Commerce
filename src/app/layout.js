import "@/src/styles/globals.css";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import {
  CartProvider,
  WhitelistProvider,
} from "../contexts/HybridStorageFactory";
import QueryProvider from "../contexts/QueryProvider";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import AuthProvider from "../contexts/AuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | ShopDigital",
    default: "ShopDigital",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className} overflow-x-hidden overflow-y-auto`}
    >
      <body className="relative flex min-h-screen w-full flex-col overflow-x-hidden text-base text-slate-700">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
              style: {
                background: "#eff6ff",
                color: "#162456",
              },
              success: {
                duration: 3000,
              },
            }}
          />
          <SpeedInsights />
          <Analytics />
          <QueryProvider>
            <CartProvider localKey="cart">
              <WhitelistProvider localKey="whitelist">
                <header>
                  <div className="mx-auto max-w-7xl">
                    <Navigation />
                  </div>
                </header>
                {children}
                <footer>
                  <Footer />
                </footer>
              </WhitelistProvider>
            </CartProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
