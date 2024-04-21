import React, { useState } from "react";
import '../../app/globals.css'
// Remplacer import setBalance, getBalance par setX, get X from X
import { useAppDispatch, useAppSelector } from "@/reducer/store";
import { toast } from 'react-hot-toast';
import { setBalance, getBalance } from "../fetchRequest/getBalance"
import { setBalanceToStore, setExpensesToStore, setIncomeToStore, setSavingToStore } from "@/reducer/slices/moneySlice";
import { addExpenses, getExpenses } from "../fetchRequest/expenses";
import { addIncome, getIncome } from "../fetchRequest/income";
import { addSaving, getSaving } from "../fetchRequest/saving";


var moment = require('moment');
moment().format();

// Remplacer AddBalanceModalProps par AddXModalProps
interface ModalProps {
    closeModal: () => void;
    title: string; // Le nom à afficher, remplaçant "Balance"
    needsDate: boolean; // Indique si une date est nécessaire
}

const addFunctions = {
    Balance: setBalance,
    Expenses: addExpenses,
    Income: addIncome,
    Saving: addSaving
   };

   const setToStore = {
    Balance: setBalanceToStore,
    Expenses: setExpensesToStore,
    Income: setIncomeToStore,
    Saving: setSavingToStore
   }

   const getFunctions = {
    Balance: getBalance,
    Expenses: getExpenses,
    Income: getIncome,
    Saving: getSaving
   };

// Remplacer AddBalanceModal par AddXModal
const AddModal: React.FC<ModalProps> = ({ closeModal, title, needsDate }) => {
    console.log("AddModal : ", title)
    console.log("addFunctions[title] : ", addFunctions[title])

    const user = useAppSelector(state => state.users.value)
    const dispatch = useAppDispatch()
    const [amount, setAmount] = useState<number>(0)
    const [date, setDate] = useState<string>("")
    // Mettre un params date a true ou false (besoin de la date ou pas)
    
    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(e.target.value)
        setAmount(Number(e.target.value))
    }
    
    // Mettre un params date a true ou false (besoin de la date ou pas)
    const handleDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(moment(e.target.value).toDate())
        setDate(e.target.value)
    }
    

    const handleSubmit = async () => {
        // Remplacer responseAddBalance par responseAddX
        // Remplacer setBalance par setX

        const responseAdd = await addFunctions[title](user.token, amount, moment(date))
        console.log(responseAdd)

        // Remplacer setBalanceToStore par setXToStore
        // Remplacer setBalanceToStore par setXToStore
        
        // Remplacer responseAddBalance.balance par responseAddX.x

        dispatch(setToStore[title](responseAdd[title.toLocaleLowerCase()]))
        if (responseAdd.result) {
            toast.success('Revenu ajouté avec succès');
            closeModal();
        } else {
            toast.error(responseAdd.message);
        }
    }

    return (
        <div>
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Entrer votre {title} actuel
                                    </h3>
                                    <div className="mt-2">
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Montant</label>
                                        <input type="number" onChange={(e) => handleChangeAmount(e)} value={amount === 0 ? "" : amount} name="amount" id="amount" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Entrer le montant" />
                                    </div>
                                    {needsDate && <div className="mt-2">
                                        <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">Date de paiement</label>
                                        <input type="date" onChange={(e) => handleDate(e)} name="paymentDate" id="paymentDate" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" onClick={handleSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Envoyer
                            </button>
                            <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddModal;

