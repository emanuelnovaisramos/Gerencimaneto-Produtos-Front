import "./globals.scss";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import QueryProvider from "@/domains/QueryProvider";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { Header } from "@/components/Header";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerencimento de Produtos",
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
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
