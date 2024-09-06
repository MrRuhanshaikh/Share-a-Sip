import { Inter } from "next/font/google";
import Sessionwrapper from "./components/Sessionwrapper";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Share a Sip",
  description: "A Sip Closer to Supporting Talent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className="text-center {inter.className} text-white relative">
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
        </div>
        <Sessionwrapper>
          <div className="flex flex-col min-h-screen">
            <div className="mb-8">
              <Navbar />
            </div>
            <main className="flex-grow">{children}</main>
            <div className="mt-8">
              <Footer />
            </div>
          </div>
        </Sessionwrapper>
        <ToastContainer/>
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </body>
    </html>
  );
}
