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
	const [ saving, setSaving ] = useState<savingObject[]>([]);

	// handle delete income
	const handleDeleteSaving = async (id: number) => {
		const deleteSavingData = await deleteSaving(token, id);
		fetchData();
		console.log(deleteSavingData);

        if(deleteSavingData.result){
            toast.success(deleteSavingData.message);
        }
	};

    const fetchData = async () => {
        const savingData = await getAllSaving(token);

        setSaving(savingData.saving as savingObject[]);
    };

	useEffect(() => {


		fetchData();
	}, []);

	const allSavings = saving.map((saving) => {
        return (
            <div className='flex m-3 text-neutral-400'>
                { saving.description && <p className='w-36 px-3 text-primary font-medium'>{saving.description}</p>}
                { saving.category && <p className='w-36 px-3'>{saving.category}</p>}
                <p className='w-36 px-3'>{moment(saving.date).format('DD/MM/YYYY')}</p>
                <p className='w-36 px-3 text-primary font-medium'>{saving.amount}€</p>
				<button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDeleteSaving(saving["_id"])}><FontAwesomeIcon icon={faTrash}/></button>
            </div>
        );
	});
	return (
		<div className="bg-neutral-900 w-full h-screen">
			<Header />

            <div className='flex flex-col items-center justify-center'>
            <p className=" font-bold text-primary text-3xl my-14">Saving</p>

		    	<div className=' bg-neutral-800 m-8 p-3 rounded-2xl'>{allSavings}</div>
            </div>
		</div>
	);
}
