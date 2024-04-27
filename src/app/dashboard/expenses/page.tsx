'use client';

import useAuthClientAndRedirect from '@/app/hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '@/app/hooks/useAuthServerAndRedirect';
import Header from '@/lib/components/Header';
import { getAllExpenses } from '@/lib/fetchRequest/expenses';
import { useAppSelector } from '@/reducer/store';
import { useEffect, useState } from 'react';
var moment = require('moment');

export default function Expenses() {
	const requireAuth = true;
	const redirect = '/signin';

	useAuthServerAndRedirect(requireAuth, redirect);
	useAuthClientAndRedirect(requireAuth, redirect);

	const token = useAppSelector((state) => state.users.value).token;
	const [ expenses, setExpenses ] = useState<object[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const expensesData = await getAllExpenses(token);

			setExpenses(expensesData.expenses);
		};

		fetchData();
	}, []);

	const allExpenses = expenses.map((expense) => {
        return (
            <div className='flex m-3 text-neutral-400'>
                <p className='w-36 px-3 text-primary font-medium'>{expense.description}</p>
                <p className='w-36 px-3'>{expense.category}</p>
                <p className='w-36 px-3'>{moment(expense.date).format('DD/MM/YYYY')}</p>
                <p className='w-36 px-3 text-primary font-medium'>{expense.amount}€</p>
            </div>
        );
	});
	return (
		<div className="bg-neutral-900 w-full h-screen">
			<Header />

            <div className='flex flex-col items-center justify-center'>
            <p className=" font-bold text-primary text-3xl my-14">Expenses</p>

		    	<div className=' bg-neutral-800 m-8 p-3 rounded-2xl'>{allExpenses}</div>
            </div>
		</div>
	);
}
