'use client';

import React from 'react';
import useAuthClientAndRedirect from '@/app/hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '@/app/hooks/useAuthServerAndRedirect';
import MonthPicker from '@/lib/components/MonthPicker';
import { useAppSelector } from '@/reducer/store';
import { isValidElement, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { getBalance, getAllBalance } from '@/lib/fetchRequest/getBalance';
import { deleteDebts, getAllDebts } from '@/lib/fetchRequest/debts';
import { deleteExpenses, getAllExpenses } from '@/lib/fetchRequest/expenses';
import { getAllIncome, acceptIncome, deleteIncome } from '@/lib/fetchRequest/income';
import { getAllSaving, deleteSaving } from '@/lib/fetchRequest/saving';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getAll } from '@/lib/fetchRequest/get/getAll';

var moment = require('moment');


const dataFunctions = {
    balance: {
        title: 'Balance',
        get: getBalance,
        getAll: getAll,
        type: 'balanceObject',
        delete: null,
        accept: null
    },
    debts: {
        title: 'Debts',
        get: null,
        getAll: getAll,
        type: 'debtObject',
        delete: deleteDebts,
        accept: null
    },
    income: {
        title: 'Income',
        get: null,
        getAll: getAll,
        type: 'incomeObject',
        delete: deleteIncome,
        accept: acceptIncome
    },
    saving: {
        title: 'Saving',
        get: null,
        getAll: getAll,
        type: 'savingObject',
        delete: deleteSaving,
        accept: null
    },
    expenses: {
        title: 'Expenses',
        get: null,
        getAll: getAll,
        type: 'expenseObject',
        delete: deleteExpenses,
        accept: null
    }
};

const allValidSlugs = Object.keys(dataFunctions);

const dataTypes = {
    balanceObject: {
        id: Number,
        amount: Number,
        user: String,
        date: Date
    },
    debtsObject: {
        _id: Number,
        amount: Number,
        debtor: String,
        isPaid: Date,
        user: String,
        userIsDebtor: Boolean
    },
    incomeObject: {
        id: Number,
        description: String,
        category: String,
        date: Date,
        amount: Number,
        type: String
    },
    savingObject: {
        _id: Number,
        description: String,
        category: String,
        date: Date,
        amount: Number
    },
    expensesObject: {
        id: Number,
        description: String,
        category: String,
        date: Date,
        amount: Number,
    }
};

type monthDataObject = {
    amount: number,
    category: string
    date: string,
    debtor: string
    description: string
    expensesMethod: string | null
    frequency: null
    id: number
    isPaid: null
    paymentMethod: string | null
    savingMethod: string | null
    source: null
    status: string | null
    type: string | null
    userIsDebtor: string | null
}


export default function Page({ params }: { params: { slug: string } }) {
    if (!dataFunctions.hasOwnProperty(params.slug)) {
        return (<div className="bg-neutral-900 w-full min-h-screen flex justify-center items-center text-white">
            <h1>404 Page Not Found</h1>
        </div>)
    }
    const requireAuth = true;
    const redirect = '/signin';

    useAuthServerAndRedirect(requireAuth, redirect);
    useAuthClientAndRedirect(requireAuth, redirect);

    var fr = moment().locale('fr');
    const token = useAppSelector((state) => state.users.value).token;
    const [data, setData] = useState<any[] | undefined>(undefined);
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const dataFunctionOfParams = dataFunctions[params.slug as keyof typeof dataFunctions]
    const title = dataFunctionOfParams.title
    const [month, setMonth] = useState<number>(moment().month());
    const [year, setYear] = useState<number>(moment().year());
    const [allMonthsData, setAllMonthsData] = useState<{ [key: string]: monthDataObject } | {}>({});
    const [monthAndYearString, setMonthAndYearString] = useState<string>(`${fr.localeData().months(moment([year, month]))}_${year}`)

    const fetchData = async (monthNumber: number = month, yearNumber: number = year, hardRefresh: boolean = false) => {
        const monthAndYear = `${fr.localeData().months(moment([yearNumber, monthNumber]))}_${year}`
        // console.log(monthAndYearString, allMonthsData);
        setMonthAndYearString(monthAndYear);
        setMonth(monthNumber);
        setYear(yearNumber);

        if (monthAndYear in allMonthsData && hardRefresh === false) {
            console.log("il est deja la");


        } else {
            console.log("il est pas la");
            const data = await dataFunctionOfParams.getAll(token, "month", monthNumber + 1, yearNumber, params.slug);
            setAllMonthsData({ ...allMonthsData, [monthAndYear]: data.data });
            setData(data.data as any[]);

            if (dataFunctionOfParams.get) {
                const amount = await dataFunctionOfParams.get(token);
                setAmount(amount)
            }
        }
    };

    const handleAccept = async (id: number) => {
        console.log("accpted", id);

        if (dataFunctionOfParams.accept === null) return;

        const acceptData = await dataFunctionOfParams.accept(token, id);
        fetchData(month, year, true);


        if (acceptData.result) {
            toast.success(acceptData.message);
        }
    }

    const handleDelete = async (id: number) => {
        if (dataFunctionOfParams.delete === null) return;

        const deleteData = await dataFunctionOfParams.delete(token, id);
        fetchData(month, year, true);


        if (deleteData.result) {
            toast.success(deleteData.message);
        }
    }

    useEffect(() => {


        fetchData(month, year);
    }, []);
    // Use the functions to manipulate the data object based on the slug
    // if params.slug is not in dataFunctions, return a 404 page

    const typeObject = `${params.slug}Object` as keyof typeof dataTypes;


    const allData = allMonthsData[monthAndYearString]?.map((oneData, i) => {

        if (params.slug === "balance") {
            const oneBalanceType = oneData.type;

            return (<div className='flex my-3 text-neutral-400 justify-around items-center w-full' key={i}>
                {oneData.description && <p className={`text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 ${oneBalanceType ? "text-primary" : oneBalanceType === "virement" ? "text-green-600" : oneBalanceType === "prelevement" ? "text-red-600" : "text-primary"} font-medium`}>{oneData.description}</p>}
                {oneData.category && <p className='text-xs w-24 sm:w-24 md:w-36 md:text-base px-3'>{oneData.category}</p>}
                <p className='text-xs w-24 sm:w-24 md:w-36 md:text-base px-3'>{moment(oneData.date).format('DD/MM/YYYY')}</p>
                <p className='text-xs w-24 sm:w-24 md:w-36 md:text-base px-3 text-primary font-medium'>{oneData.amount}€</p>
            </div>)
        } else {
            const keys = Object.keys(dataTypes[typeObject]);

            if (params.slug === "debts") {
                return (
                    <div className={`flex my-3 text-neutral-400 justify-around items-center w-full ${oneData.type && (oneData.type === 'virement' ? 'text-success' : '!text-red-500')}`} key={i}>

                        <p className='text-xs w-24 sm:w-36 w- md:w-44 md:text-base px-3'>
                            {oneData.userIsDebtor ? `Je dois ${oneData.amount}€ à ${oneData.debtor}` : `${oneData.debtor} me doit ${oneData.amount}€`}
                        </p>
                        <button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDelete(oneData["id"])}>
                            <FontAwesomeIcon icon={faTrash as IconProp} />
                        </button>
                    </div>
                );
            }

            const dataRow = keys.map((key, i) => {
                if (!oneData[key] || key === 'id') return null;

                return (<>
                    {key !== 'type' && <p className={`text-xs w-16 sm:w-24 md:w-36 md:text-base px-3 `} key={i}>
                        {key === "date" ? moment(oneData[key]).format('DD/MM/YYYY') : key === 'amount' ? oneData[key] + "€" : oneData[key]}
                    </p>}



                    {dataFunctionOfParams.accept && keys.length - 1 === i &&
                        (<button className={`m-1 hover:text-green-600 transition-colors`} onClick={() => handleAccept(oneData["id"])}>
                            <FontAwesomeIcon icon={faCheck as IconProp} />
                        </button>)
                    }

                    {dataFunctionOfParams.delete && keys.length - 1 === i &&
                        (<button className={`m-1 hover:text-red-600 transition-colors`} onClick={() => handleDelete(oneData["id"])}>
                            <FontAwesomeIcon icon={faTrash as IconProp} />
                        </button>)
                    }
                </>)
            })

            return (
                <>
                    <div className={`flex my-3 text-neutral-400 justify-around items-center w-full ${oneData.type && (oneData.type === 'virement' ? 'text-success' : '!text-red-500')}`} key={i}>
                        {dataRow}
                    </div>
                </>
            );

        }
    });

    console.log(monthAndYearString, allMonthsData, allData)
    const linkAllValidSlugs = allValidSlugs.map((slug, i) => {
        const formattedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);
        const isActive = slug === params.slug ? 'text-primary' : 'text-neutral-400';
        return (
            <a href={`/dashboard/data/${slug}`} key={i}>
                <button className={`m-1 ${isActive} underline hover:text-primary transition-colors`}>{formattedSlug}</button>
            </a>
        )
    });

    return (
        <div className="bg-neutral-900 w-full min-h-screen">
            <div className='flex flex-col items-center my-14 min-h-screen'>
                <div className=" mt-8">{linkAllValidSlugs}</div>
                {params.slug !== 'debts' && (<div className='mt-8  w-1/2'>
                    <MonthPicker fetchData={fetchData} monthGived={month} yearGived={year} />
                </div>)}

                <p className="font-bold text-primary text-3xl mt-8">{title}</p>

                {allMonthsData[monthAndYearString] !== undefined ? (
                    allMonthsData[monthAndYearString].length ?? 0 > 0 ? (
                        <>


                            <div className=' bg-neutral-800 m-8 rounded-2xl w-full md:w-3/4 flex flex-col justify-around items-center'>
                                {/* {amount && <div className='bg-primary rounded-tl-2xl rounded-tr-2xl w-full h-10 sm:h-14 flex items-center pl-5'>
                                    <p className='text-white font-bold text-l sm:text-2xl'>Solde : {amount?.toFixed(2)}€</p>
                                </div>} */}
                                {(allMonthsData[monthAndYearString]?.length ?? 0) > 0 && (
                                    <div className='flex flex-col justify-center items-center  w-full'>{allData}</div>
                                )}
                            </div>
                        </>
                    ) : (<p className='text-primary text-xl m-8'>Vous n'avez pas encore rentré de dépenses</p>)
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
        </div>
    )
}
