import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrowVatika Seller",
  description: "Collaborate and grow your plant nursery business with growvatika",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
