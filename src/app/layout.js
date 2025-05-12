import "@/src/styles/globals.css";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import {
  CartProvider,
  WhitelistProvider,
} from "../contexts/HybridStorageFactory";
import QueryProvider from "../contexts/QueryProvider";
import { Toaster } from "react-hot-toast";
import { auth } from "../auth";
import { Inter } from "next/font/google";
import AuthProvider from "../contexts/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | ShopDigital",
    default: "ShopDigital",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`$inter.className} overflow-x-hidden`}>
      <body className="relative flex h-screen flex-col overflow-x-hidden text-base text-slate-700">
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
