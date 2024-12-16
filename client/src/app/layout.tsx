import type { Metadata } from "next";
import { ThemeProvider } from "@/utils/theme";
import "./globals.css";
import ToggleAbsolute from "./home-component/ToggleAbsolute";
import { ReduxProvider } from "@/utils/state/reduxProvider";

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
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToggleAbsolute />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
