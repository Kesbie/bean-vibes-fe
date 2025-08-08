import type { Metadata } from "next";
import { Quicksand, Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/providers/Providers";
import RouteLoadingBar from "@/components/shared/RouteLoadingBar";
import ClientOnly from "@/components/shared/ClientOnly";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"]
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Bean Vibes",
  description: "A platform for coffee lovers"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${openSans.variable} font-quicksand antialiased bg-gray-50`}
      >
        <RouteLoadingBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
