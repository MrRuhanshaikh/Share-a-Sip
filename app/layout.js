import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Share a Sip",
  description: "A Sip Closer to Supporting Talent",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/icon.png" /></head>
      <body className="text-center {inter.className}">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
