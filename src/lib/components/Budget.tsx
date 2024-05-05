import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { getBudget } from '../fetchRequest/budget';
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
    const [showDropdown, setShowDropdown] = useState(false);
    const [modalOpen, setModalOpen] = useState<string>("")
    const [month, setMonth] = useState<number>(moment().month());
    const [year, setYear] = useState<number>(moment().year());

    var fr = moment().locale('fr');



    // const [option, setOption] = useState<objectOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const token = useAppSelector(state => state.users.value).token;

    // setOption([{ option: "Ajouter un revenu", action: null }, { option: "Voir ses revenus", action: null }]);
    const option = [{ option: "Ajouter un budget par mois", action: null }, { option: "Ajouter un budget par catégorie de dépense", action: () => setModalOpen("setBudget") }]

    // const toggleAddExpensesModal = () => {
    //     console.log('isAddExpensesModalOpen : ', isAddExpensesModalOpen)
    //     setIsAddExpensesModalOpen(true);
    // };

    // const closeAddExpensesModal = () => {
    //     setIsAddExpensesModalOpen(false);
    // };

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
    const [monthBudget, setMonthBudget] = useState<monthBudgetObject | undefined>(undefined);

    const fetchBudget = async (token: string, period: string, month : number) => {
        const budget = await getBudget(token, period, month + 1);
        console.log("budget : ", budget)
        setMonthBudget(budget)
    };

    useEffect(() => {
        fetchBudget(token, "month", month);
    }, [month])


    console.log("monthBudget : ", monthBudget);

    const categoriesWithAmount = monthBudget?.expensesByCategory.map((e: { categoryName: string, categoryAmount: number, categoryBudget: number }, i: number) => {
        return (
            <div key={e.categoryName} className='flex justify-between'>
                <p>{e.categoryName}</p>
                <p className={`${e.categoryBudget ? (e.categoryAmount < e.categoryBudget ? "text-success" : "text-error") : "text-primary"}  `}>{e.categoryAmount.toFixed(2)}{e.categoryBudget && <span>/{e.categoryBudget}€</span>}</p>
            </div>
        );
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            // console.log(dropdownRef.current, event.target)
            // console.log(typeof event.target.className === "string");

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

    const handleDecrementMonth= () => {
        if(month > 0){
            setMonth(month - 1);
        } else {
            setMonth(11);
            setYear(year - 1);
        }
    }

    const handleIncrementMonth= () => {
        if(month < 11){
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

    const mediaQueriesStyle = {
        // twoXl: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 rounded-2xl text-white flex flex-col lg:w-28 lg:h-28`,
        xlStyle: "xl:row-start-2 xl:row-end-4 xl:col-start-4 xl:col-end-5  m-4 p-3 flex flex-col",
        lgStyle: "lg:row-start-3 lg:row-end-4 lg:col-start-3 lg:col-end-5 m-4 p-3 flex flex-col",
        mdStyle: "md:row-start-3 md:row-end-4 md:col-start-3 md:col-end-5 m-4 p-3 flex flex-col",
        smStyle: "xl:row-start-2 xl:row-end-4 xl:col-start-4 xl:col-end-5 m-4 p-3 flex flex-col",
    }

    return (
        <>
            {modalOpen && <AddModal closeModal={() => setModalOpen("")} title={modalOpen} needsDate={false} />}

            <section id="Budget" className={`bg-neutral-800 rounded-2xl text-white w-3/4 sm:w-1/2 p-3 my-4 lg:mx-4 flex flex-col`}>
                <div className='relative flex justify-between'>
                    <p className='font-bold'>Budget - {fr.localeData().months(moment([2024, month]))} {year}</p>
                    <span className="rounded-md shadow-sm" ref={dropdownRef} onClick={() => handleDropDown()}>
                        <FontAwesomeIcon icon={faEllipsisVertical} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white cursor-pointer" />
                    </span>
                    
                    {showDropdown && (
                        <div className="origin-top-right absolute right-0 top-8 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {optionLink}
                                {/* <a href="#" className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem" onClick={(event) => {
                                    event.stopPropagation(); // Empêche la propagation de l'événement de clic
                                    if (event.action) {
                                        console.log("ALED") // Exécute l'action si elle est définie
                                    }
                                }}>Ajouter un revenu</a> */}
                                {/* <a href="#" className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem">Voir ses revenus</a> */}
                                {/* <a href="#" className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem">Option 3</a> */}
                            </div>
                        </div>
                    )}
                </div>
                {monthBudget !== undefined? ( <div className='flex flex-col flex-1 justify-between my-2 '>
                <div className="flex justify-between m-4">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleDecrementMonth()} className="text-white cursor-pointer hover:text-primary transition-all" />
                    <FontAwesomeIcon icon={faArrowRight}onClick={() => handleIncrementMonth()}  className="text-white cursor-pointer hover:text-primary transition-all" />
                </div>
                    <p className='text-3xl font-bold'>{monthBudget.budgetAmount}€<span className="text-primary">/mois</span></p>

                    <div className='my-4'>
                        {categoriesWithAmount}
                    </div>

                    <div className='flex justify-between'>
                        <p>Total</p>
                        <p className='text-success'>{`${monthBudget.expensesAmount && monthBudget.expensesAmount.toFixed(2)}/${monthBudget.budgetAmount}€`}</p>
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
