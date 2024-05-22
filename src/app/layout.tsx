// src/components/RootLayout.tsx
import Footer from "@/lib/components/Footer";
import Header from "@/lib/components/Header";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

const ReduxProvider = dynamic(() => import("./StoreProvider"), {
  ssr: false
});

export const metadata: Metadata = {
  title: "Money Dashboard",
  description: "An application to track your expenses, manage debts, and set budgets with our intuitive dashboard.",

};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {


  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ReduxProvider>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
