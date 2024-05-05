'use client';

import useAuthClientAndRedirect from '@/app/hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '@/app/hooks/useAuthServerAndRedirect';
import Header from '@/lib/components/Header';
import { getAllSaving, deleteSaving } from '@/lib/fetchRequest/saving';
import { useAppSelector } from '@/reducer/store';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import Footer from '@/lib/components/Footer';


var moment = require('moment');

export default function Saving() {
	const requireAuth = true;
	const redirect = '/signin';

	useAuthServerAndRedirect(requireAuth, redirect);
	useAuthClientAndRedirect(requireAuth, redirect);

	type savingObject = {
		_id: number
		description: string;
		category: string;
		date: Date;
		amount: number;
	};

	const token = useAppSelector((state) => state.users.value).token;
	const [saving, setSaving] = useState<savingObject[] | undefined>(undefined);

	// handle delete income
	const handleDeleteSaving = async (id: number) => {
		const deleteSavingData = await deleteSaving(token, id);
		fetchData();
		console.log(deleteSavingData);

		if (deleteSavingData.result) {
			toast.success(deleteSavingData.message);
		}
	};

	const fetchData = async () => {
		const savingData = await getAllSaving(token);

		console.log(savingData);
		
		setSaving(savingData.saving as savingObject[]);
	};

	useEffect(() => {


		fetchData();
	}, []);
	
	const allSavings = saving?.map((saving, i) => {
		return (
			<div className='flex my-3 text-neutral-400 justify-around items-center w-full' key={i}>
				{/* {saving?.description && <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>{saving.description}</p>} */}
				{/* {saving?.category && <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3'>{saving.category}</p>} */}
				<p className='text-xs w-24 sm:w-24 md:w-36 md:text-base px-3'>{moment(saving.date).format('DD/MM/YYYY')}</p>
				<p className='text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>{saving.amount}€</p>
				<button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDeleteSaving(saving["_id"])}><FontAwesomeIcon icon={faTrash} /></button>
			</div>
		);
	});
	return (
		<div className="bg-neutral-900 w-full min-h-screen">
			<Header />


			<div className='flex flex-col items-center justify-center my-14 min-h-screen'>
				{saving !== undefined ? (
					allSavings?.length ?? 0 > 0 ? (
						<>
							<p className=" font-bold text-primary text-3xl">Saving</p>

							<div className=' bg-neutral-800 m-8 rounded-2xl w-full md:w-3/4 flex flex-col justify-around items-center'>
{(allSavings?.length ?? 0) > 0 && 
							<div className='flex flex-col justify-center items-center  w-full'>{allSavings}</div>}</div>
						</>
					) : <p className='text-primary text-xl m-8'>Vous n'avez pas encore rentré d'économies</p>
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
