// @ts-nocheck
import React, { ChangeEvent, useEffect, useState } from 'react';
import '../../app/globals.css';
// Remplacer import setBalance, getBalance par setX, get X from X
import { setBalanceToStore, setDebtsToStore, setExpensesToStore, setIncomeToStore, setSavingToStore } from '@/reducer/slices/moneySlice';
import { useAppDispatch, useAppSelector } from '@/reducer/store';
import { toast } from 'react-hot-toast';
import { addBudgetOfMonth } from '../fetchRequest/budget';
import { addDebts } from '../fetchRequest/debts';
import { addBudgetOfExpensesCategory, addExpenses, addExpensesCategoriesLabel, getExpenses, getExpensesCategoriesLabel } from '../fetchRequest/expenses';
import { getBalance, setBalance } from '../fetchRequest/getBalance';
import { addIncome, getIncome } from '../fetchRequest/income';
import { addSaving, getSaving } from '../fetchRequest/saving';

var moment = require('moment');
moment().format();



// Remplacer AddBalanceModalProps par AddXModalProps
interface ModalProps {
	closeModal: () => void;
	title: string; // Le nom à afficher, remplaçant "Balance"
	needsDate: boolean; // Indique si une date est nécessaire
}

interface Category {
	addFunction: Function; // Remplacez 'Function' par le type de la fonction addFunction
	getFunction?: Function; // Remplacez 'Function' par le type de la fonction getFunction
	setToStore?: Function; // Remplacez 'Function' par le type de la fonction setToStore
	form: {
		title: string;
		input: string[];
	};
}

interface Categories {
	[key: string]: Category;
}
const categories: Categories = {
	Balance: {
		addFunction: setBalance,
		getFunction: getBalance,
		setToStore: setBalanceToStore,
		form: {
			title: 'Entrer votre montant actuel',
			input: ['amount']
		}
	},
	Expenses: {
		addFunction: addExpenses,
		getFunction: getExpenses,
		setToStore: setExpensesToStore,
		form: {
			title: 'Entrer les détails de la dépense',
			input: ['amount', 'date', 'description', 'category']
		}
	},
	Income: {
		addFunction: addIncome,
		getFunction: getIncome,
		setToStore: setIncomeToStore,
		form: {
			title: 'Entrer les détails de paiement',
			input: ['amount', 'date', 'description', 'category']
		}
	},
	Saving: {
		addFunction: addSaving,
		getFunction: getSaving,
		setToStore: setSavingToStore,
		form: {
			title: "Entrer les détails de l'économie",
			input: ['amount', 'date']
		}
	},
	Debts: {
		addFunction: addDebts,
		// getFunction: getSaving,
		setToStore: setSavingToStore,
		form: {
			title: "Entrer les détails de l'économie",
			input: ['amount', 'debtor', 'whoIsDebtor']
		}
	},
	setBudget: {
		addFunction: addBudgetOfExpensesCategory,
		// getFunction: getExpenses,
		// setToStore: setExpensesToStore,
		form: {
			title: 'Entrer votre budget pour chaque catégorie de dépenses',
			input: ['amount', 'category']
		}
	},
	setMonthBudget: {
		addFunction: addBudgetOfMonth,
		// getFunction: getExpenses,
		// setToStore: setExpensesToStore,
		form: {
			title: 'Entrer votre budget pour ce mois',
			input: ['amount']
		}
	}
};
// @ts-ignore
const AddModal: React.FC<ModalProps> = ({ closeModal, title, needsDate, refreshData = null, monthChoose = null, yearChoose = null }) => {

	type expensesCategoriesObject = {
		id: string,
		category: string,
		name?: string
	}
	const user = useAppSelector((state) => state.users.value);

	const dispatch = useAppDispatch();
	const [amount, setAmount] = useState<string>("");
	const [description, setDescription] = useState<string>('');
	const [category, setCategory] = useState<string | undefined>('');
	const [newCategory, setNewCategory] = useState<string>('');
	const [expensesCategories, setExpensesCategories] = useState<expensesCategoriesObject[] | undefined>([]);
	const [paymentType, setPaymentType] = useState<string>('virement');
	const [date, setDate] = useState<string>('');
	const [closeModalAfterAdding, setCloseModalAfterAdding] = useState<boolean>(true);
	const [changeBalanceAmount, setChangeBalanceAmount] = useState<boolean>(true);
	const [whoIsDebtor, setWhoIsDebtor] = useState<string>('me');
	const [debtor, setDebtor] = useState<string>('');
	// const [expensesCategories, setExpensesCategories] = useState<expensesCategoriesObject[] | undefined>([]);

	const fetchExpensesCategories = async () => {
		const response = await getExpensesCategoriesLabel(user.token, 'month');
		setExpensesCategories(response.expensesCategories);
		setCategory(response.expensesCategories?.[0]?.id);
	}

	useEffect(() => {
		fetchExpensesCategories();
	}, []);

	const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let str = e.target.value;

		// Permettre uniquement les nombres et un seul point
		const regex = /^(\d+(\.\d{0,2})?)?$/;

		if (regex.test(str)) {
			setAmount(str);
		}
	};

	// Mettre un params date a true ou false (besoin de la date ou pas)
	const handleDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setDate(e.target.value);
	};

	const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setDescription(e.target.value);
	};

	const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
		//setCategory(e.target.value);
		setCategory(e.target.value);
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCloseModalAfterAdding(!closeModalAfterAdding);
	};
	const handleCheckboxChangeBalance = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setChangeBalanceAmount(!changeBalanceAmount);
	};
	const handleChangeNewCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewCategory(e.target.value);
	}

	const handlePaymentType = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPaymentType(e.target.value);
	};


	const handleAddCategory = async () => {

		const responseAddCategory = await addExpensesCategoriesLabel(user.token, newCategory);
		if (responseAddCategory.result) {
			toast.success(responseAddCategory.message);
		} else {
			toast.error(responseAddCategory.message);
		}
		setCategory(newCategory);
		fetchExpensesCategories()

	}

	const handleAddBudgetCategory = async () => {
		const responseAdd = await addBudgetOfExpensesCategory(user.token, category, amount);

		if (responseAdd.result) {
			toast.success('Budget ajouté avec succès');

			if (closeModalAfterAdding) {
				closeModal();
			}
		} else {
			toast.error(responseAdd.message);
		}
	}

	const handleSubmit = async () => {
		// Remplacer responseAddBalance par responseAddX
		// Remplacer setBalance par setX

		if (title === "setBudget") {
			handleAddBudgetCategory();

			refreshData();
			return;
		}

		if (title === "setMonthBudget") {
			// @ts-ignore
			const addBudgetOfMonthResponse = await addBudgetOfMonth(user.token, monthChoose, yearChoose, amount);
			if (addBudgetOfMonthResponse) {
				toast.success('Budget ajouté avec succès');
				if (closeModalAfterAdding) {
					refreshData();
					closeModal();
				}
			} else {
				toast.error('Erreur lors de l\'ajout du budget');
			}
			return;
		}

		if (title === "Debts") {
			const addDebtsRequest = await addDebts(user.token, amount, debtor, whoIsDebtor !== "me");
			console.log("addDebtsRequest : ", addDebtsRequest)
			if (addDebtsRequest.result) {
				console.log("add modal debts : ", addDebtsRequest)
				toast.success('Dette ajoutée avec succès');
				// dispatch(categories[title]['setToStore'](addDebtsRequest["debt"]));
				dispatch(setDebtsToStore(addDebtsRequest["debt"]))
				if (closeModalAfterAdding) {
					closeModal();
				}
			} else {
				toast.error(addDebtsRequest.message);
			}
			return;
		}




		const responseAdd = await categories[title]['addFunction'](
			user.token,
			amount,
			title === "Income" ? paymentType : undefined,
			moment(date).format(),
			description,
			category,
			changeBalanceAmount
		);

		console.log("responseAdd : ", responseAdd)



		// Remplacer setBalanceToStore par setXToStore
		// Remplacer setBalanceToStore par setXToStore

		// Remplacer responseAddBalance.balance par responseAddX.x

		if (categories[title]['setToStore']) {
			// @ts-ignore
		}
		if (responseAdd.result) {
			toast.success('Revenu ajouté avec succès');
			dispatch(categories[title]['setToStore'](responseAdd[title.toLocaleLowerCase()]));

			if (closeModalAfterAdding) {
				closeModal();
			}
		} else {
			toast.error(responseAdd.message);
		}
	};
	// @ts-ignore
	const test = (e) => {
		setWhoIsDebtor(e.target.value)
	}
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
									<h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
										{categories[title].form.title}
									</h3>
									{/* Faire en sorte que je peux utiliser l'input pour entrer un nombre a virgule qui representera un montant */}
									{categories[title].form.input.includes('amount') && (<div className="mt-2">
										<label htmlFor="amount" className="block text-sm font-medium text-gray-700">
											Montant
										</label>
										<input type="text" onChange={(e) => handleChangeAmount(e)} value={amount} name="amount" id="amount" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Entrer le montant" />
										{title === "Income" && (
											<div className="mt-2">
												<label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">
													Type de paiement
												</label>
												<div className="mt-1">
													<label className="inline-flex items-center">
														<input
															type="radio"
															className="form-radio"
															name="paymentType"
															value="virement"
															onChange={(e) => handlePaymentType(e)}
															checked={paymentType === "virement"}
														/>
														<span className="ml-2">Virement</span>
													</label>
													<label className="inline-flex items-center ml-6">
														<input
															type="radio"
															className="form-radio"
															name="paymentType"
															value="prelevement"
															onChange={(e) => handlePaymentType(e)}
															checked={paymentType === "prelevement"}
														/>
														<span className="ml-2">Prélèvement</span>
													</label>
												</div>
											</div>
										)}
										{title === "Debts" && (
											<>
												<div className="mt-2">
													<label htmlFor="whoIsDebtor" className="block text-sm font-medium text-gray-700">
														Qui attend la dette ?
													</label>
													<div className="mt-1">
														<label className="inline-flex items-center">
															<input
																type="radio"
																className="form-radio"
																name="whoIsDebtor"
																value="me"
																onChange={(e) => test(e)}
																checked={whoIsDebtor === "me"}
															/>
															<span className="ml-2">Moi</span>
														</label>
														<label className="inline-flex items-center ml-6">
															<input
																type="radio"
																className="form-radio"
																name="whoIsDebtor"
																value="he"
																onChange={(e) => test(e)}
																checked={whoIsDebtor === "he"}
															/>
															<span className="ml-2">Lui</span>
														</label>
													</div>
												</div>
												<label htmlFor="debtor" className="block text-sm font-medium text-gray-700">
													{whoIsDebtor === "me" ? "Personne qui doit vous rembourser" : "Personne que vous devez rembourser"}
												</label>
												<input type="text" onChange={(e) => setDebtor(e.target.value)} value={debtor} name="debtor" id="debtor" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													placeholder="Nom de la personne" />
											</>
										)}
									</div>)}

									{categories[title].form.input.includes('date') && (
										<div className="mt-2">
											<label
												htmlFor="paymentDate"
												className="block text-sm font-medium text-gray-700"
											>
												Date de paiement
											</label>
											<input
												type="date"
												onChange={(e) => handleDate(e)}
												name="paymentDate"
												id="paymentDate"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>
									)}
									{categories[title].form.input.includes('description') && (
										<div className="mt-2">
											<label
												htmlFor="description"
												className="block text-sm font-medium text-gray-700"
											>
												Description
											</label>
											<input
												type="text"
												onChange={(e) => handleChangeDescription(e)}
												value={description}
												name="description"
												id="description"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												placeholder="Entrer la description"
											/>
										</div>
									)}
									{categories[title].form.input.includes('category') && (
										<>
											<div className="mt-2">
												{/* <Autocomplete suggestions={expensesCategories} /> */}
												<label className="block text-sm font-medium text-gray-700"
												>
													Categorie
													<select
														// @ts-ignore
														onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeCategory(e)}
														name="category" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													>
														{expensesCategories?.map((category, i) => {
															return <option key={i} value={category.id}>{category.name}</option>
														})}
													</select>
												</label>

											</div>

											{title === "Expenses" && (
												<>
													<div style={{ height: "2px" }} className="w-full bg-black my-5" />

													<div className='mt-2'>
														<label
															htmlFor="description"
															className="block text-sm font-medium text-gray-700"
														>
															Ajouter une catégorie
														</label>
														<div className='flex'>
															<input
																type="text"
																onChange={(e) => handleChangeNewCategory(e)}
																value={newCategory}
																name="description"
																id="description"
																className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
																placeholder="Nouvelle catégorie"
															/>
															<button className='bg-green-600 p-2 ml-3 rounded-xl text-white' onClick={handleAddCategory}>
																Ajouter
															</button>
														</div>
													</div>
												</>
											)}

										</>
									)}
									<div className="mt-2">
										<label className="flex items-center">
											<input
												type="checkbox"
												className="form-checkbox"
												checked={closeModalAfterAdding}
												onChange={(e) => handleCheckboxChange(e)}
											/>
											<span className="ml-2">
												Fermer la modal après l'ajout
											</span>
										</label>
										{(title === "Saving" || title === "Expenses") && (

											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox"
													checked={changeBalanceAmount}
													onChange={(e) => handleCheckboxChangeBalance(e)}
												/>
												<span className="ml-2">
													Affecter votre solde actuel
												</span>
											</label>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								type="button"
								onClick={handleSubmit}
								className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Envoyer
							</button>
							<button
								type="button"
								onClick={closeModal}
								className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							>
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
