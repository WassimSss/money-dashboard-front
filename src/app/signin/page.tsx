'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";
import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";

export default function Signin() {
  const requireAuth = false;
  const redirect = "/dashboard" 

  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  interface FormData {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    if (id in formData) {
      setFormData(prevData => ({
        ...prevData,
        [id]: value
      }));
    }
  }

  const handleSubmitFormData = () => {
    console.log(formData);

  }

  return (
    <main className="bg-neutral-900  w-full h-screen flex flex-col justify-around items-center">

      <div className="flex justify-center items-center flex-col">
        <p className=" font-bold text-primary text-3xl">Unlock the door to your financial journey. Log in now!</p>
        <p className="font-bold text-white text-3xl">Signin</p>
      </div>

      <div className="bg-white rounded-2xl p-5">
        <div className="flex flex-col items-center justify-center">
          <input type="email" name="email" placeholder="E-mail" id="email" onChange={(e) => handleChangeFormData(e)} value={formData.email} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />

          <input type="password" name="password" placeholder="Password" id="password" onChange={(e) => handleChangeFormData(e)} value={formData.password} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />
        </div>

        <div className="flex items-center justify-center flex-col mt-10">
          <button onClick={handleSubmitFormData} className="bg-gradient-to-r from-primary to-secondary hover:bg-blue-800 px-3 py-2 text-white font-bold rounded-lg mb-1">
            Signin
          </button>
          <p>You don’t have an account ?</p>
          <Link href="/signup" className="text-primary underline">Signup</Link>
        </div>
      </div>
    </main>
  );
}
