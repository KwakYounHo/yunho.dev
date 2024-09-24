import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yunho Kwak :: Juno",
  description: "Juno's playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
