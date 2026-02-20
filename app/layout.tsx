import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Windows 10 Portfolio",
  description: "Portfolio with Windows 10 desktop UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="win10-body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
