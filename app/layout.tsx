import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/ui/shared/header";
import Footer from "./components/footer";
import ToastClientContainer from "./components/ui/shared/toast-container";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Distribuidora Multimarcas SRL",
  description:
    "Distribuidora multimarcas de productos alimenticios. Calidad, variedad y servicio para tu negocio. ¡Descubre nuestro catálogo hoy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen max-w-[1000px] mx-auto`}
      >
        <Header />
        <main className="bg-gray-100">{children}</main>
        <Footer />
        <ToastClientContainer />
      </body>
    </html>
  );
}
