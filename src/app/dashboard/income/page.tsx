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
import { Oval } from 'react-loader-spinner';
import Footer from '@/lib/components/Footer';

var moment = require('moment');

export default function Income() {
	const requireAuth = true;
	const redirect = '/signin';

	useAuthServerAndRedirect(requireAuth, redirect);
	useAuthClientAndRedirect(requireAuth, redirect);

	type incomeObject = {
		id: number
		description: string;
		category: string;
		date: Date;
		amount: number;
		type: string;
	};

	const token = useAppSelector((state) => state.users.value).token;
	const [income, setIncome] = useState<incomeObject[] | undefined>(undefined);

	// handle accept income
	const handleAcceptIncome = async (id: number) => {
		const acceptIncomeData = await acceptIncome(token, id);
		fetchData();
		console.log(acceptIncomeData);

		if (acceptIncomeData.result) {
			toast.success(acceptIncomeData.message);
		}
	};

	// handle delete income
	const handleDeleteIncome = async (id: number) => {
		const deleteIncomeData = await deleteIncome(token, id);
		fetchData();
		console.log(deleteIncomeData);

		if (deleteIncomeData.result) {
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

	const allIncome = income?.map((oneIncome, i) => {
		const isVirement = oneIncome.type === "virement";
		const style = isVirement ? 'text-green-600' : 'text-red-600';
		return (
<div className='flex my-3 text-neutral-400 justify-around items-center w-full' key={i}>				<p className={`w-3 md:w-3 ${isVirement ? 'text-green-600' : 'text-red-600'}`}>{isVirement ? '+' : '-'}</p>
				{oneIncome.description && <p className={` text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium ${style}`}>{oneIncome.description}</p>}
				{oneIncome.category && <p className={` text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 ${style}`}>{oneIncome.category}</p>}
				<p className={` text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 ${style}`}>{moment(oneIncome.date).format('DD/MM/YYYY')}</p>
				<p className={` text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium ${style}`}>{oneIncome.amount}€</p>
				<div>
				<button className={`m-1 hover:text-green-600 transition-colors`} onClick={() => handleAcceptIncome(oneIncome["id"])}><FontAwesomeIcon icon={faCheck} /></button>
				<button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDeleteIncome(oneIncome["id"])}><FontAwesomeIcon icon={faTrash} /></button>
				</div>
			</div >
		);
	});
	return (
		<div className="bg-neutral-900 w-full min-h-screen">
			<Header />

			<div className='flex flex-col items-center justify-center my-14 min-h-screen'>
				{income !== undefined ? (
					allIncome?.length ?? 0 > 0 ? (
						<>
							<p className=" font-bold text-primary text-3xl">Income</p>

							<div className=' bg-neutral-800 m-8 rounded-2xl w-full md:w-3/4 flex flex-col justify-around items-center'>
{(allIncome?.length ?? 0) > 0 && (<div className='flex flex-col justify-center items-center  w-full'>{allIncome}</div>)}</div>
						</>
					) : <p className='text-primary text-xl m-8'>Vous n'avez pas encore rentré de revenu en cours</p>
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
		</div >
	);
}
