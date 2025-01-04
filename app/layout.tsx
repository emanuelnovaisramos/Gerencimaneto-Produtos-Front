import "./globals.scss";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import QueryProvider from "@/domains/QueryProvider";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avaliação",
  description:
    "Avaliação de Competência - Desenvolvedor(a) de Software (Full stack)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} antialiased`}>
        <PrimeReactProvider>
          <QueryProvider>{children}</QueryProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
