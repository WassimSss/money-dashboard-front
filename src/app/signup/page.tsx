'use client'

import Link from "next/link";
import React, { useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';;
import { addTokenToUser } from "../../reducer/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/store";
// import { requireAuth } from "../modules/requireAuth";
// import { useRouter } from "next/router";
import useAuthClientAndRedirect from '../hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '../hooks/useAuthServerAndRedirect';

export default function Signup() {
  const requireAuth = false;
  const redirect = "/dashboard"

  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  const users = useAppSelector((state) => state.users.value);

  const dispatch = useAppDispatch();
  interface UserState {
    value: {
      token: string;
    };
  }

  interface RootState {
    users: UserState;
  }

  // const dispatch = useDispatch();

  // const users = "user test"

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }

  interface ErrorItem {
    msg: string;
  }

  interface ErrorData {
    errors: ErrorItem[];
  }



  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
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


    try {

      const response = await fetch(`https://money-dashboard-back.vercel.app/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        console.log("error")
        // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
        const errorData = await response.json();
        console.error('Erreur lors de l\'envoi des données:', errorData);

        if (errorData.errors && errorData.errors.length > 0) {
          const errors = errorData.errors.map((error: ErrorItem) => {
            return error.msg
          })

          setErrorsForm(errors)
        }

        if (errorData.result === false) {
          setErrorsForm([errorData.message])
        }

        throw new Error(`Erreur ${response.status}: ${errorData.msg}`);
      }

      const data = await response.json();
      dispatch(addTokenToUser(data.token));




    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }



  }

  const test = () => {
  }

  return (
    <main className="bg-white dark:bg-neutral-900  w-full h-screen flex flex-col justify-around items-center">

      <div className="flex justify-center items-center flex-col">
        <p className=" font-bold text-primary text-3xl text-center animate-fade-right animate-delay-600">Start taking control of your finances today! </p>
        <button className="font-bold text-black dark:text-white text-3xl text-center animate-fade-right animate-delay-300">Signup</button>

      </div>

      <div className="bg-neutral-800 dark:bg-white rounded-2xl p-5 w-1/2 animate-fade-right animate-delay-200">
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
            <button onClick={handleSubmitFormData} className="bg-gradient-to-r from-primary to-secondary hover:bg-blue-800 px-3 py-2 text-white font-bold rounded-lg mb-1">Signup</button>
            <p>Already have an account ?</p>
            <Link href="/signin" className="text-primary underline">Signin</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
