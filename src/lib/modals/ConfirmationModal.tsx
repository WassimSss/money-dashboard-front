import React, { ChangeEvent, useEffect, useState } from 'react';
import '../../app/globals.css';
// Remplacer import setBalance, getBalance par setX, get X from X
import { useAppDispatch, useAppSelector } from '@/reducer/store';
import { toast } from 'react-hot-toast';
import { addBudgetOfMonth } from '../fetchRequest/budget';
import { setBalance, getBalance } from '../fetchRequest/getBalance';
import { setBalanceToStore, setExpensesToStore, setIncomeToStore, setSavingToStore } from '@/reducer/slices/moneySlice';
import { addBudgetOfExpensesCategory, addExpenses, addExpensesCategoriesLabel, getExpenses, getExpensesCategories, getExpensesCategoriesLabel } from '../fetchRequest/expenses';
import { addIncome, getIncome } from '../fetchRequest/income';
import { addSaving, getSaving } from '../fetchRequest/saving';
import { addDebts } from '../fetchRequest/debts';

var moment = require('moment');
moment().format();


// @ts-ignore
const ConfirmationModal: React.FC<ModalProps> = ({ closeConfirmatinModal, text, action }) => {

    const user = useAppSelector((state) => state.users.value);



    // const handleAddBudgetCategory = async () => {
    //     const responseAdd = await addBudgetOfExpensesCategory(user.token, category, amount);

    //     if (responseAdd.result) {
    //         toast.success('Budget ajouté avec succès');

    //         if (closeModalAfterAdding) {
    //             closeModal();
    //         }
    //     } else {
    //         toast.error(responseAdd.message);
    //     }
    // }

    const handleAcceptAction = async () => {
        handleAccept()
    };
    return (
        <div>
            <div
                className="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

                    <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-center items-center">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title" onClick={action}>
                                        {text}
                                    </h3>

                                    <div className="mt-2">


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={() => closeConfirmatinModal()}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Non
                            </button>
                            <button
                                type="button"
                                onClick={() => console.log("ok")
                                }
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-600 text-white text-base font-medium  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Oui
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ConfirmationModal;
