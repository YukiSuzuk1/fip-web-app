import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "FIP学習ゲーム",
  description: "FIP太陽光発電制度を体系的に学ぶ学習アプリ",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FIP学習",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,   // Allow pinch-zoom for accessibility
  viewportFit: "cover",
  themeColor: "#12192e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {/* Sidebar: CSS class app-sidebar controls visibility.
            display:none on mobile via media query in globals.css */}
        <Sidebar />

        <div className="app-content">
          <Header />
          <main className="app-main">{children}</main>
        </div>

        {/* Bottom nav: CSS class bottom-nav, display:none on desktop */}
        <BottomNav />
      </body>
    </html>
  );
}
