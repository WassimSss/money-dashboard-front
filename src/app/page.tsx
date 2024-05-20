'use client'

import Link from "next/link";
import useAuthClientAndRedirect from "./hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "./hooks/useAuthServerAndRedirect";


export default function Home() {
  const requireAuth = false;
  const redirect = "/dashboard"

  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);
  return (
    <>
      <section className="bg-primary">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">Manage Your Finances Better</h1>
            <p className="max-w-2xl mb-6 font-light text-slate-50 lg:mb-8 md:text-lg lg:text-xl">Track your expenses, manage debts, and set budgets with our intuitive dashboard.</p>
            <Link href="/signup" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-slate-50 hover:bg-slate-200 transition-colors focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Get started
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
            {/* <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-white dark:hover:bg-primary dark:focus:ring-gray-800">
                Speak to Sales
            </a>  */}
          </div>
          {/* <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
          </div> */}
        </div>
      </section>

      <section id="features" className="py-20 bg-white dark:bg-neutral-800 ">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-100">Features</h2>
            <p className="mt-4 text-gray-600 dark:text-white">Everything you need to take control of your finances.</p>
          </div>
          <div className="flex flex-wrap justify-around">
            <div className="block max-w-sm p-6 m-4 bg-gray-800 border border-gray-200 rounded-lg shadow hover:bg-gray-900 dark:bg-white dark:border-gray-700 dark:hover:bg-slate-200">

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-gray-900">Track Expenses</h5>
              <p className="font-normal text-slate-100 dark:text-gray-400">Easily log and categorize your expenses to see where your money is going.</p>
            </div>
            <div className="block max-w-sm p-6 m-4 bg-gray-800 border border-gray-200 rounded-lg shadow hover:bg-gray-900 dark:bg-white dark:border-gray-700 dark:hover:bg-slate-200">

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-gray-900">Manage Debts</h5>
              <p className="font-normal text-slate-100 dark:text-gray-400">Keep track of your debts and payments to stay on top of what you owe.</p>
            </div>
            <div className="block max-w-sm p-6 m-4 bg-gray-800 border border-gray-200 rounded-lg shadow hover:bg-gray-900 dark:bg-white dark:border-gray-700 dark:hover:bg-slate-200">

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-gray-900">Set Budgets</h5>
              <p className="font-normal text-slate-100 dark:text-gray-400">Define monthly and category-based budgets to better manage your finances.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
