import "@/src/styles/globals.css";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import {
  CartProvider,
  WhitelistProvider,
} from "../contexts/HybridStorageFactory";
import QueryProvider from "../contexts/QueryProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative flex h-screen flex-col text-base text-slate-700">
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
      </body>
    </html>
  );
}
