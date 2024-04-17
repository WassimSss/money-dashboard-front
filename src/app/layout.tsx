// src/components/RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import dynamic from "next/dynamic";
import { Toaster } from 'react-hot-toast';

const ReduxProvider = dynamic(() => import("./StoreProvider"), {
  ssr: false
});

export const metadata: Metadata = {
  title: "Money Dashboard",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
