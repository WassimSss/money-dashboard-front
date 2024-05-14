'use client'

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  console.log(process.env)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white-800">
      <Link href="/dashboard" className="text-white text-bold">Dashboard</Link>
      <Link href="/signup" className="text-white text-bold">Signup</Link>
      <Link href="/signin" className="text-white text-bold">Signin</Link>
    </main>
  );
}
