import type { Metadata } from "next";
import "./globals.css";
import {
  Nunito_Sans,
  Outfit,
  Poppins,
  Roboto,
  Ubuntu,
  Unbounded,
} from "next/font/google";
import { Providers } from "./providers";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
});
export const metadata: Metadata = {
  title: "GrowVatika Admin",
  description: "Its a growvatika super admin platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${outfit.variable} ${poppins.variable} ${roboto.variable} ${ubuntu.variable} ${unbounded.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
