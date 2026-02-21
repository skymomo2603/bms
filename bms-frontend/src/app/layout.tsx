import ThemeRegistry from "@/ThemeRegistry";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
        <ThemeRegistry>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
