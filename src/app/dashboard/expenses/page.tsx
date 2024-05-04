'use client';

import useAuthClientAndRedirect from '@/app/hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '@/app/hooks/useAuthServerAndRedirect';
import Header from '@/lib/components/Header';
import { deleteExpenses, getAllExpenses } from '@/lib/fetchRequest/expenses';
import { useAppSelector } from '@/reducer/store';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast';
// import iconProp
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Oval } from 'react-loader-spinner';
import Footer from '@/lib/components/Footer';

var moment = require('moment');

export default function Expenses() {
    const requireAuth = true;
    const redirect = '/signin';

    useAuthServerAndRedirect(requireAuth, redirect);
    useAuthClientAndRedirect(requireAuth, redirect);

    type expenseObject = {
        id: number
        description: string;
        category: string;
        date: Date;
        amount: number;
        type: string;
    };

    const token = useAppSelector((state) => state.users.value).token;
    const [expenses, setExpenses] = useState<expenseObject[] | undefined>(undefined);

    // handle delete expense
    const handleDeleteExpense = async (id: number) => {
        console.log(id)
        const deleteExpenseData = await deleteExpenses(token, id);
        fetchData();
        console.log(deleteExpenseData);

        if (deleteExpenseData.result) {
            toast.success(deleteExpenseData.message);
        }
    };

    const fetchData = async () => {
        const expensesData = await getAllExpenses(token);

        setExpenses(expensesData.expenses as expenseObject[]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const allExpenses = expenses?.map((expense, i) => {
        console.log(expense)
        return (
            <div className='flex my-3 text-neutral-400 justify-around items-center w-full' key={i}>
                {expense.description && <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>{expense.description}</p>}
                {expense.category && <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3'>{expense.category}</p>}
                <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3'>{moment(expense.date).format('DD/MM/YYYY')}</p>
                <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>{expense.amount}€</p>
                <button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDeleteExpense(expense["id"])}><FontAwesomeIcon icon={faTrash as IconProp} /></button>
            </div>
        );
    });
    return (
        <div className="bg-neutral-900 w-full min-h-screen">
            <Header />

            <div className='flex flex-col items-center justify-center my-14 min-h-screen'>
                {expenses !== undefined ? (

                    allExpenses?.length ?? 0 > 0 ? (
                        <>
                            <p className=" font-bold text-primary text-3xl">Expenses</p>

                            <div className=' bg-neutral-800 m-8 rounded-2xl w-full md:w-3/4 flex flex-col justify-around items-center'>
                                {(allExpenses?.length ?? 0) > 0 && (<div className='flex flex-col justify-center items-center  w-full'>{allExpenses}</div>)}</div>
                        </>
                    ) : <p className='text-primary text-xl m-8'>Vous n'avez pas encore rentré de dépenses</p>
                ) : (<Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4F72D8"
                    secondaryColor="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />)}
            </div>

            <Footer />
        </div>
    );
}
