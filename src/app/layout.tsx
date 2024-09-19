import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavHeader from "@/components/navigation/nav-header";
import { Viewport } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Option",
  description: "I just name it Option",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider  
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <div className="bg-[var(--background)] text-[var(--foreground)]">
            <NavHeader />
            <div className="min-h-screen">
            {children}
            <Toaster />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
