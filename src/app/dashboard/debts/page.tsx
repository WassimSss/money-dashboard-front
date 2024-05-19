'use client';

import useAuthClientAndRedirect from '@/app/hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '@/app/hooks/useAuthServerAndRedirect';
import Header from '@/lib/components/Header';
import { deleteDebts, getAllDebts } from '@/lib/fetchRequest/debts';
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

export default function Debts() {
    const requireAuth = true;
    const redirect = '/signin';

    useAuthServerAndRedirect(requireAuth, redirect);
    useAuthClientAndRedirect(requireAuth, redirect);

    type debtObject = {
        _id: number
        amount: number;
        debtor: string;
        isPaid: Date;
        user: string;
        userIsDebtor: boolean;
    };

    const token = useAppSelector((state) => state.users.value).token;
    const [debts, setDebts] = useState<debtObject[] | undefined>(undefined);

    // handle delete debt


    const fetchData = async () => {
        const debtsData = await getAllDebts(token);
        setDebts(debtsData as debtObject[]);
    };

    const handleDeleteDebt = async (id: number) => {
        const deleteDebtData = await deleteDebts(token, id);
        fetchData();

        if (deleteDebtData.result) {
            toast.success(deleteDebtData.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const allDebts = debts?.map((debt, i) => {
        return (
            <div className='flex my-3 text-neutral-400 justify-around items-center w-full' key={i}>
                {debt.userIsDebtor ? <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3'>Je dois <span className='text-primary'>{debt.amount}€</span> à {debt.debtor} </p> : <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3'>{debt.debtor} me doit <span className='text-primary'>{debt.amount}€</span></p>}
                {/* {debt.description && <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>{debt.description}</p>}
                {debt.category && <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3'>{debt.category}</p>}
                <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3'>{moment(debt.date).format('DD/MM/YYYY')}</p>
                <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>{debt.amount}€</p> */}
                <button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDeleteDebt(debt["_id"])}><FontAwesomeIcon icon={faTrash as IconProp} /></button>
            </div >
        );
    });
    return (
        <div className="bg-neutral-900 w-full min-h-screen">
            <Header />

            <div className='flex flex-col items-center justify-center my-14 min-h-screen'>
                {debts !== undefined ? (

                    allDebts?.length ?? 0 > 0 ? (
                        <>
                            <p className=" font-bold text-primary text-3xl">Debts</p>

                            <div className=' bg-neutral-800 m-8 rounded-2xl w-full md:w-3/4 flex flex-col justify-around items-center'>
                                {(allDebts?.length ?? 0) > 0 && (<div className='flex flex-col justify-center items-center  w-full'>
                                    <div className='flex my-3 text-neutral-400 justify-around items-center w-full' >
                                        {/* <p className='text-xs w-16 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>Amount</p> */}
                                        {/* <button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDeleteDebt(debt["_id"])}><FontAwesomeIcon icon={faTrash as IconProp} /></button> */}
                                    </div>
                                    {allDebts}
                                </div>)}</div>
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
