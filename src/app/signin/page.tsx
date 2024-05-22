'use client'

import { addTokenToUser } from "@/reducer/slices/usersSlice";
import { useAppDispatch } from "@/reducer/store";
import Link from "next/link";
import React, { useState } from "react";
import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";

export default function Signin() {
  const requireAuth = false;
  const redirect = "/dashboard"

  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  const dispatch = useAppDispatch();

  interface FormData {
    email: string;
    password: string;
  }

  interface ErrorItem {
    msg: string;
  }

  interface ErrorData {
    errors: ErrorItem[];
  }

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })
  const [errorsForm, setErrorsForm] = useState<string[]>([])

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    if (id in formData) {
      setFormData(prevData => ({
        ...prevData,
        [id]: value
      }));
    }
  }

  const handleSubmitFormData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    const data = await response.json();
    if (!response.ok) {
      // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur


      if (data.errors && data.errors.length > 0) {
        const errors = data.errors.map((error: ErrorItem) => {
          return error.msg
        })

        setErrorsForm(errors)
      } else {
        setErrorsForm([])
      }

      if (data.message) {
        setErrorsForm((prev: string[]) => {
          return [...prev,
          data.message]
        })
      }

      // throw new Error(`Erreur ${response.status}: ${errorData.msg}`);
    }

    if (data.result) {
      dispatch(addTokenToUser(data.token));
    }
  }

  return (
    <main className="bg-white dark:bg-neutral-900  w-full h-screen flex flex-col justify-around items-center">

      <div className="flex justify-center items-center flex-col">
        <p className=" font-bold text-primary text-3xl text-center animate-fade-right animate-delay-600">Unlock the door to your financial journey. Log in now!</p>
        <p className="font-bold text-dark dark:text-white text-3xl text-center animate-fade-right animate-delay-300">Signin</p>
      </div>

      <div className="bg-neutral-800 dark:bg-white rounded-2xl p-5 w-1/2  animate-fade-right animate-delay-200">
        <div className="flex flex-col items-center justify-center">
          <input type="email" name="email" placeholder="E-mail" id="email" onChange={(e) => handleChangeFormData(e)} value={formData.email} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />

          <input type="password" name="password" placeholder="Password" id="password" onChange={(e) => handleChangeFormData(e)} value={formData.password} className="w-full border border-gray-300 rounded-md py-2 px-3 m-3 focus:outline-none focus:border-primary" />
        </div>


        <div className="bg-neutral-800 text-white dark:bg-white dark:text-black rounded-2xl p-5">
          {/* Les champs de formulaire */}

          {/* Liste des erreurs */}
          {errorsForm.length > 0 && (
            <div className="bg-red-500 text-white p-4 rounded-md mt-4">
              {errorsForm.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          {/* Le bouton de soumission et le lien de connexion */}
          <div className="flex items-center justify-center flex-col mt-10">
            <button onClick={handleSubmitFormData} className="bg-gradient-to-r from-primary to-secondary hover:bg-blue-800 px-3 py-2 text-white font-bold rounded-lg mb-1">
              Signin
            </button>
            <p>You don’t have an account ?</p>
            <Link href="/signup" className="text-primary underline">Signup</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
