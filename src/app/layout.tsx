import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "52週貯金",
  description: "",
};

import { Noto_Sans_JP } from 'next/font/google';
const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
});

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' className="h-full">
      <body className={`${notoSansJP.className} --font-noto-sans-jp h-full`}>{children}</body>
    </html>
  );
}
