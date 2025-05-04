import type { Metadata } from "next";
import {
  Bebas_Neue,
  Inter,
  Libre_Baskerville,
  Playfair_Display,
  Roboto_Slab,
} from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "sonner";
import ProgressBarProvider from "@/components/ProgressBarProvider";

export const metadata: Metadata = {
  title: "JNeedle",
};

const inter = Inter({ subsets: ["latin"] });
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={cn(
          `relative min-h-screen antialiased`,
          robotoSlab.className
        )}
      >
        <ProgressBarProvider>
          <QueryProvider>
              <Navbar />
              {children}
              <Footer />
            <Toaster richColors />
          </QueryProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
