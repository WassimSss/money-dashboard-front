'use client';

import useAuthClientAndRedirect from '@/app/hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '@/app/hooks/useAuthServerAndRedirect';
import Header from '@/lib/components/Header';
import { getBalance, getAllBalance } from '@/lib/fetchRequest/getBalance';
import { useAppSelector } from '@/reducer/store';
import { isValidElement, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast';
// import iconProp
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Oval } from 'react-loader-spinner';
import Footer from '@/lib/components/Footer';

var moment = require('moment');

export default function Balance() {
    const requireAuth = true;
    const redirect = '/signin';

    useAuthServerAndRedirect(requireAuth, redirect);
    useAuthClientAndRedirect(requireAuth, redirect);

    type balanceObject = {
        _id: number
        description: string;
        category: string;
        date: Date;
        amount: number;
        type: string;
    };

    const token = useAppSelector((state) => state.users.value).token;
    const [balance, setBalance] = useState<balanceObject[] | undefined>(undefined);
    const [amount, setAmount] = useState<number | undefined>(undefined);

    const fetchData = async () => {
        const balanceData = await getAllBalance(token);
        const amount = await getBalance(token);
        setAmount(amount)
        setBalance(balanceData.history as balanceObject[]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const allBalances = balance?.map((oneBalance, i) => {
        const oneBalanceType = oneBalance.type;
        // const style = oneBalanceType ? 'text-green-600' : 'text-red-600';
        return (
            <div className='flex my-3 text-neutral-400 justify-around items-center w-full' key={i}>
                {oneBalance.description && <p className={`text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 ${oneBalanceType === undefined ? "text-primary" : oneBalanceType === "virement" ? "text-green-600" : "text-red-600"} font-medium`}>{oneBalance.description}</p>}
                {oneBalance.category && <p className='text-xs w-24 sm:w-24 md:w-36 md:text-base px-3'>{oneBalance.category}</p>}
                <p className='text-xs w-24 sm:w-24 md:w-36 md:text-base px-3'>{moment(oneBalance.date).format('DD/MM/YYYY')}</p>
                <p className='text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>{oneBalance.amount}€</p>
            </div>
        );
    });
    return (
        <div className="bg-neutral-900 w-full min-h-screen">
            <Header />

            <div className='flex flex-col items-center justify-center my-14 min-h-screen'>
                {balance !== undefined ? (

                    allBalances?.length ?? 0 > 0 ? (
                        <>
                            <p className=" font-bold text-primary text-3xl">Balance</p>

                            <div className=' bg-neutral-800 m-8 rounded-2xl w-full md:w-3/4 flex flex-col justify-around items-center'>
                                <div className='bg-primary rounded-tl-2xl rounded-tr-2xl w-full h-10 sm:h-14 flex items-center pl-5'>
                                    <p className='text-white font-bold text-l sm:text-2xl'>Solde : {amount?.toFixed(2)}€</p>
                                </div>
                                {(allBalances?.length ?? 0) > 0 && (
                                <div className='flex flex-col justify-center items-center  w-full'>{allBalances}</div>)}
                            </div>
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
