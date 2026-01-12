import type { Metadata } from "next";
import { Fira_Sans, Open_Sans } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";
import NavigationPanel from "./_components/NavigationPanel";

export const firaSans = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-fira-sans",
  weight: ["400", "800"],
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Flatiron School Demos",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaSans.variable} ${openSans.variable} antialiased`}
      >
        <Providers>
          <NavigationPanel />
          <main className="blue-light text-foreground bg-background w-screen h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
