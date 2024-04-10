'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
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
        <p className=" font-bold text-primary text-3xl">Start taking control of your finances today! </p>
        <p className="font-bold text-white text-3xl">Signup</p>
      </div>

      <div className="bg-white rounded-2xl p-5">
        <div>
          <div className="flex">
            <input type="text" name="first_name" id="firstName" placeholder="First Name" onChange={(e) => handleChangeFormData(e)} value={formData.firstName} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />
            <input type="text" name="last_name" id="lastName" placeholder="Last Name" onChange={(e) => handleChangeFormData(e)} value={formData.lastName} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />
          </div>

          <div className="flex">
            <input type="email" name="email" id="email" placeholder="E-mail" onChange={(e) => handleChangeFormData(e)} value={formData.email} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />
            <input type="email" name="confirm_email" id="confirmEmail" placeholder="Confirm E-mail" onChange={(e) => handleChangeFormData(e)} value={formData.confirmEmail} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />
          </div>

          <div className="flex">
            <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => handleChangeFormData(e)} value={formData.password} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />
            <input type="password" name="confirm_password" id="confirmPassword" placeholder="Password" onChange={(e) => handleChangeFormData(e)} value={formData.confirmPassword} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div className="flex items-center justify-center flex-col mt-10">
          <button onClick={handleSubmitFormData} className="bg-gradient-to-r from-primary to-secondary hover:bg-blue-800 px-3 py-2 text-white font-bold rounded-lg mb-1">Signup</button>
          <p>Already have an account ?</p>
          <Link href="/signin" className="text-primary underline">Signin</Link>
        </div>
      </div>
    </main>
  );
}
