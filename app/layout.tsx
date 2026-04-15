import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "FIP学習ゲーム",
  description: "FIP太陽光発電制度を体系的に学ぶ学習アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" style={{ height: "100%" }}>
      <body style={{ height: "100%", display: "flex", margin: 0 }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Header />
          <main
            style={{
              flex: 1,
              overflow: "auto",
              backgroundColor: "var(--bg-main)",
              padding: "24px",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
