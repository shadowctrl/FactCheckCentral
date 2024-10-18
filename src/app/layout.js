import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/navbar/page.jsx";
import Footer from "@/components/footer/page";
const inter = Inter({ subsets: ["latin"] });
import Loading from "@/app/loading.js";
import { Suspense } from "react";
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const metadata = {
  title: "Fact Check Central | News | Fact Checks",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${bebas.className}`}>
        <Navbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}

export const fetchCache = "no-store";
