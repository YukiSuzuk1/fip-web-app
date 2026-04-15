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
  maximumScale: 1,
  // Prevent user scaling (prevents accidental zoom on iOS)
  userScalable: false,
  viewportFit: "cover", // Needed for safe-area-inset on iPhone notch
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
        {/* Sidebar — visible on desktop, hidden on mobile (CSS) */}
        <Sidebar />

        <div className="app-content">
          <Header />
          <main className="app-main">{children}</main>
        </div>

        {/* Bottom nav — visible on mobile only (CSS) */}
        <BottomNav />
      </body>
    </html>
  );
}
