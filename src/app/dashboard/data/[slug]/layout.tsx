'use client'

import Footer from "@/lib/components/Footer"
import Header from "@/lib/components/Header"



export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
      <Header />
   
        {children}
        <Footer />
        </>
    )
  }