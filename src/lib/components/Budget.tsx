import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { getBudget, getMonthBudget } from '../fetchRequest/budget';
import { useAppSelector } from '@/reducer/store';
import AddModal from '../modals/AddModal';
import ContentLoader from 'react-content-loader';
import { Oval } from 'react-loader-spinner';
const moment = require('moment');

const Budget: React.FC = () => {

    type objectOption = {
        option: string,
        action: Function | null
    }

    const dropdownRef = useRef(null);
    var fr = moment().locale('fr');
    const [showDropdown, setShowDropdown] = useState(false);
    const [modalOpen, setModalOpen] = useState<string>("")
    const [month, setMonth] = useState<number>(moment().month());
    const [year, setYear] = useState<number>(moment().year());
    const [monthExpensesAmount, setMonthExpensesAmount] = useState<number | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const token = useAppSelector(state => state.users.value).token;
    const [monthBudget, setMonthBudget] = useState<monthBudgetObject | undefined>(undefined);
    const [allMonthsBudget, setAllMonthsBudget] = useState<{ [key: string]: monthBudgetObject } | undefined>({});
    const [monthAmount, setMonthAmount] = useState<number | undefined>(undefined);
    const [monthBudgetAmount, setMonthBudgetAmount] = useState<number | undefined>(undefined);


    const option = [{ option: "Ajouter un budget par mois", action: () => setModalOpen("setMonthBudget") }, { option: "Ajouter un budget par catégorie de dépense", action: () => setModalOpen("setBudget") }]

    type monthBudgetObject = {
        result: boolean,
        budgetAmount: number,
        expensesAmount: number,
        expensesByCategory: Array<{
            categoryName: string,
            categoryAmount: number,
            categoryBudget: number
        }>
    }


    const fetchBudget = async (token: string, period: string, month: number) => {
        const budget = await getMonthBudget(token, period, month + 1, year);
        // const budgetTest = await getMonthBudget(token, period, month + 1, year);
        const monthAndYear = `${fr.localeData().months(moment([year, month]))}_${year}`
        setMonthBudget(budget)
        setMonthExpensesAmount(budget?.expensesAmount);
        setMonthBudgetAmount(budget?.budgetAmount);
        // @ts-ignore
        setAllMonthsBudget({ ...allMonthsBudget, [monthAndYear]: budget });
    };

    useEffect(() => {
        const monthAndYear = `${fr.localeData().months(moment([year, month]))}_${year}`
        // @ts-ignore
        if (monthAndYear in allMonthsBudget) {
            // @ts-ignore
            setMonthExpensesAmount(allMonthsBudget[monthAndYear]?.expensesAmount);
            // @ts-ignore
            setMonthBudgetAmount(allMonthsBudget[monthAndYear]?.budgetAmount);


        } else {
            fetchBudget(token, "month", month);
        }
    }, [month])


// @ts-ignore
    const categoriesWithAmount = allMonthsBudget[`${fr.localeData().months(moment([year, month]))}_${year}`]?.expensesByCategory.map((e: { categoryName: string, categoryAmount: number, categoryBudget: number }, i: number) => {
        return (
            <div key={e.categoryName} className='flex justify-between'>
                <p>{e.categoryName}</p>
                <p className={`${e.categoryBudget ? (e.categoryAmount < e.categoryBudget ? "text-success" : "text-error") : "text-primary"}  `}>{e.categoryAmount.toFixed(2)}{e.categoryBudget && <span>/{e.categoryBudget}€</span>}</p>
            </div>
        );
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            const dropdownRefCurrent = dropdownRef.current as HTMLDivElement | null;

            if (dropdownRefCurrent && !dropdownRefCurrent.contains(event.target as Node)) {
                if ((typeof (event.target as HTMLElement).className === "string")) {
                    if ((event.target as HTMLElement).className.split(' ')[0] === "buttonAction") {

                    } else {
                        setShowDropdown(false); // Assurez-vous que setShowDropdown est défini dans votre composant
                    }
                } else {
                    setShowDropdown(false); // Assurez-vous que setShowDropdown est défini dans votre composant
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDropDown = () => {
        setShowDropdown(false); // Assurez-vous que setShowDropdown est défini dans votre composant
        setShowDropdown(!showDropdown)
    }

    const handleDecrementMonth = () => {
        if (month > 0) {
            setMonth(month - 1);
        } else {
            setMonth(11);
            setYear(year - 1);
        }
    }

    const handleIncrementMonth = () => {

        if (month < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);
            setYear(year + 1);
        }
    }

    const optionLink: JSX.Element[] = option.map((e: objectOption, i: number) => {
        return (
            <a href="#" key={i} className="buttonAction block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault(); // Empêche le comportement par défaut de l'élément <a>
                event.stopPropagation(); // Empêche la propagation de l'événement de clic
                if (e.action) {
                    e.action(); // Exécute l'action si elle est définie
                }
            }}>
                {e.option}
            </a>
        );
    });
// @ts-ignore
    let allBudgetWithDate = allMonthsBudget[`${fr.localeData().months(moment([year, month]))}_${year}`]

    return (
        <>
        {/* @ts-ignore */}
            {modalOpen && <AddModal closeModal={() => setModalOpen("")} title={modalOpen} needsDate={false} refreshData={() => fetchBudget(token, "month", month)} monthChoose={month + 1} yearChoose={year} />}

            <section id="Budget" className={`bg-neutral-800 rounded-2xl text-white w-3/4 sm:w-1/2 p-3 my-4 lg:mx-4 flex flex-col animate-fade-left animate-duration-600`}>
                <div className='relative flex justify-between'>
                    <p className='font-bold'>Budget</p>
                    <span className="rounded-md shadow-sm" ref={dropdownRef} onClick={() => handleDropDown()}>
                        <FontAwesomeIcon icon={faEllipsisVertical} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white cursor-pointer" />
                    </span>

                    {showDropdown && (
                        <div className="origin-top-right absolute right-0 top-8 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {optionLink}
                            </div>
                        </div>
                    )}
                </div>
                {monthBudget !== undefined ? (
                <div className='flex flex-col flex-1 justify-between my-2 '>
                    <div className="flex justify-between m-4">
                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleDecrementMonth()} className="text-white cursor-pointer hover:text-primary transition-all" />
                        <p className=' font-bold'>{fr.localeData().months(moment([year, month]))} {year}</p>
                        <FontAwesomeIcon icon={faArrowRight} onClick={() => handleIncrementMonth()} className="text-white cursor-pointer hover:text-primary transition-all" />
                    </div>
                    <p className='text-3xl font-bold'>{allBudgetWithDate?.budgetAmount ? allBudgetWithDate.budgetAmount + '€' : "Pas encore de budget par mois entré"}<span className="text-primary">{allBudgetWithDate?.budgetAmount && '/mois'}</span></p>

                    <div className='my-4'>
                        {categoriesWithAmount}
                    </div>

                    <div className='flex justify-between'>
                        <p>Total</p>
                        {/* @ts-ignore */}
                        <p className={`${monthExpensesAmount < allBudgetWithDate?.budgetAmount ? 'text-success' : 'text-error'} ${allBudgetWithDate?.budgetAmount === null ? 'text-primary' : ''}`}>{`${monthExpensesAmount && monthExpensesAmount.toFixed(2)}${allBudgetWithDate?.budgetAmount ? '/' + allBudgetWithDate?.budgetAmount + '€' : ""}`}</p>
                    </div>
                </div>) : (<Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4F72D8"
                    secondaryColor="#ffffff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />)}


            </section >
        </>
    );
}

export default Budget;
