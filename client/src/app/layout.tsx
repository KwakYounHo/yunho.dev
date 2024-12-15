import type { Metadata } from "next";
import { ThemeProvider } from "@/utils/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juno",
  description: "Juno's Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
