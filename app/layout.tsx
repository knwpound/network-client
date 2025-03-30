import type { Metadata } from "next";
import { Geist, DM_Sans } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const dm_sans = DM_Sans({
  subsets:['latin'],
  weight:["400", "500","600","700","800"]
})


export const metadata: Metadata = {
  title: "Chat",
  description: "Network Term Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className}`}>
        {children}
      </body>
    </html>
  );
}
