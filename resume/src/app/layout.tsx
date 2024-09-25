import type { Metadata } from "next";
import "./globals.css";

// components
import Header from "@/components/header/Header";

// providers
import { ThemeProvider } from "@/components/providers/theme-provider";

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
      <body className={"min-h-screen"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className={"flex-1"}>
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
