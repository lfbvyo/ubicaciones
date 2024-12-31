import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ubicaciones de Costa Rica",
  description:
    "Documentación del API de Ubicaciones para obtener provincias, cantones y distritos de Costa Rica",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="md:bg-[#fbfceb]">{children}</body>
    </html>
  );
}
