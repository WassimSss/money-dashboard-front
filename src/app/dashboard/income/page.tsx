'use client';

import useAuthClientAndRedirect from '@/app/hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '@/app/hooks/useAuthServerAndRedirect';
import Header from '@/lib/components/Header';
import { getAllIncome, acceptIncome, deleteIncome } from '@/lib/fetchRequest/income';
import { useAppSelector } from '@/reducer/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast';

import { useEffect, useState } from 'react';
var moment = require('moment');

export default function Income() {
	const requireAuth = true;
	const redirect = '/signin';

	useAuthServerAndRedirect(requireAuth, redirect);
	useAuthClientAndRedirect(requireAuth, redirect);

	type incomeObject = {
		_id: number
		description: string;
		category: string;
		date: Date;
		amount: number;
		type: string;
	};	

	const token = useAppSelector((state) => state.users.value).token;
	const [ income, setIncome ] = useState<incomeObject[]>([]);

	// handle accept income
	const handleAcceptIncome = async (id: number) => {
		const acceptIncomeData = await acceptIncome(token, id);
		fetchData();
		console.log(acceptIncomeData);

		if(acceptIncomeData.result){
			toast.success(acceptIncomeData.message);
		}
	};

	// handle delete income
	const handleDeleteIncome = async (id: number) => {
		const deleteIncomeData = await deleteIncome(token, id);
		fetchData();
		console.log(deleteIncomeData);

		if(deleteIncomeData.result){
			toast.success(deleteIncomeData.message);
		}
	};

	const fetchData = async () => {
		const incomeData = await getAllIncome(token);
		console.log(incomeData);
		setIncome(incomeData.income as incomeObject[]);
	};

	useEffect(() => {

		
		fetchData();
	}, []);

	const allIncome = income.map( oneIncome => {
		const isVirement = oneIncome.type === "virement" ;
		const style = isVirement ? 'text-green-600' : 'text-red-600';
		return (
			<div className={`flex m-3 text-neutral-400 `}>
				<p className={`w-3 ${isVirement ? 'text-green-600' : 'text-red-600'}`}>{isVirement ? '+' : '-'}</p>
				<p className={`w-36 px-3 text-primary font-medium ${style}`}>{oneIncome.description}</p>
				<p className={`w-36 px-3 ${style}`}>{oneIncome.category}</p>
				<p className={`w-36 px-3 ${style}`}>{moment(oneIncome.date).format('DD/MM/YYYY')}</p>
				<p className={`w-36 px-3 text-primary font-medium ${style}`}>{oneIncome.amount}€</p>
				<button className={`m-1 hover:text-green-600 transition-colors`} onClick={() => handleAcceptIncome(oneIncome["_id"])}><FontAwesomeIcon icon={faCheck}/></button>
				<button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDeleteIncome(oneIncome["_id"])}><FontAwesomeIcon icon={faTrash}/></button>
			</div>
		);
	});
	return (
		<div className="bg-neutral-900 w-full h-screen">
			<Header />

            <div className='flex flex-col items-center justify-center'>
            <p className=" font-bold text-primary text-3xl my-14">Income</p>

		    	<div className=' bg-neutral-800 m-8 p-3 rounded-2xl'>{allIncome}</div>
            </div>
		</div>
	);
}
