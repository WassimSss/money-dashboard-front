import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getExpensesOfTheDay, getExpensesOfTheMonth, getExpensesOfTheWeek, getExpensesCategories } from '../fetchRequest/expenses';
import { useAppDispatch, useAppSelector } from '@/reducer/store';
import { useEffect, useRef, useState } from 'react';
import { setExpensesOfTheDayToStore, setExpensesOfTheMonthToStore, setExpensesOfTheWeekToStore } from '@/reducer/slices/moneySlice';
import 'react-dropdown/style.css'; // Importez le CSS pour le style par défaut

const AllExpenses: React.FC = () => {

    const [expensesDay, setExpensesDay] = useState<number | undefined>(undefined);
    const [expensesWeek, setExpensesWeek] = useState<number | undefined>(undefined);
    const [expensesMonth, setExpensesMonth] = useState<number | undefined>(undefined);
    const [expensesCategories, setExpensesCategories] = useState<object[] | undefined>(undefined);
    const [period, setPeriod] = useState<string>('month'); // 'day', 'week', 'month'
    const token = useAppSelector(state => state.users.value).token;
    const moneys = useAppSelector(state => state.moneys.value);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useAppDispatch();

    const fetchExpensesofTheDay = async () => {
        const expensesofTheDay = await getExpensesOfTheDay(token);
        dispatch(setExpensesOfTheDayToStore(expensesofTheDay))
        setExpensesDay(moneys.expensesofTheDay)
    }

    const fetchExpensesOfTheWeek = async () => {
        const expensesOfTheWeek = await getExpensesOfTheWeek(token);
        dispatch(setExpensesOfTheWeekToStore(expensesOfTheWeek))
        setExpensesWeek(moneys.expensesofTheWeek)
    }

    const fetchExpensesOfTheMonth = async () => {
        const expensesOfTheMonth = await getExpensesOfTheMonth(token);
        dispatch(setExpensesOfTheMonthToStore(expensesOfTheMonth))
        setExpensesMonth(moneys.expensesofTheMonth)
    }

    useEffect(() => {
        fetchExpensesofTheDay()
        fetchExpensesOfTheWeek()
        fetchExpensesOfTheMonth()

    }, [moneys])

    const fetchData = async () => {


        const fetchExpensesCategories = await getExpensesCategories(token, period);
        setExpensesCategories(fetchExpensesCategories.expenses)

        // calculer pourcentage

    }

    useEffect(() => {
        console.log(expensesCategories)
        fetchData();
    }, [moneys, period])

    let sumPercentage = 0;
    const camembertColors = ["#2C4487", "#3F61C2", "#8CA0D9", "#C4CFED"]

    const camambertData = expensesCategories?.map((category: any, i: number) => {
        const ammount = category[1];
        if (ammount !== 0) {
            const formattedPeriod = "expensesofThe" + period[0].toLocaleUpperCase() + period.slice(1);

            const percentage = Number(ammount) / moneys[formattedPeriod] * 100;

            sumPercentage += percentage;

            return (
                <div key={i} style={{
                    background: `radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, ${camembertColors[i]} ${(percentage + 1)}%, transparent 0)`, // 20% + 1 pour eviter les erreurs d'affichages
                    transform: `${i !== 0 && `rotate(${360 * ((sumPercentage - percentage) / 100)}deg)`}`
                }} className='absolute w-24 h-24 rounded-full ' ></div>
            )
        }
    })
    // console.log("expensesCategories : ", expensesCategories, expensesDay, expensesWeek, expensesMonth)
    const camambertCategories = expensesCategories?.map((category: any, i: number) => {
        const titleCategory = category[0]
        const amount = category[1];
        if (amount > 0) {

            return (
                <p className='flex flex-row' key={i}><span className={`block size-3 rounded-full bg-[${camembertColors[i]}]`}></span><span className='text-neutral-400'>{titleCategory}</span></p>

            )
        }
    })
    const mediaQueriesStyle = {
        // twoXl: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 rounded-2xl text-white flex flex-col lg:w-28 lg:h-28`,

        xlStyle: "xl:row-start-3 xl:row-end-4 xl:col-start-3 xl:col-end-4 m-4 p-3 m-4 p-3",
        lgStyle: "lg:row-start-2 lg:row-end-3 lg:col-start-4 lg:col-end-5 m-4 p-3 flex flex-col",
        mdStyle: "md:row-start-4 md:row-end-5 md:col-start-3 md:col-end-4 m-4 p-3 flex flex-col",
        smStyle: "xl:row-start-2 xl:row-end-4 xl:col-start-4 xl:col-end-5 m-4 p-3 flex flex-col",
    }

    const option = [{ option: "Mois", action: () => setPeriod('month') }, { option: "Semaine", action: () => setPeriod('week') }, { option: "Jour", action: () => setPeriod('day') }]
    const optionLink = option.map((e, i) => {
        console.log(period)
        return (
            <a href="#" key={i} className="z-20 buttonAction block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem" onClick={(event) => {
                event.preventDefault(); // Empêche le comportement par défaut de l'élément <a>
                event.stopPropagation(); // Empêche la propagation de l'événement de clic
                if (e.action) {
                    e.action(name); // Exécute l'action si elle est définie
                }
            }}>
                {e.option}
            </a>
        );
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            const dropdownRefType = dropdownRef.current as HTMLElement | null;
            const target = event.target as HTMLElement;
            if (dropdownRefType && !dropdownRefType?.contains(target)) {
                if (typeof target.className === "string") {
                    if (target.className.split(' ')[0] === "buttonAction") {

                    } else {
                        setShowDropdown(false);
                    }
                } else {
                    setShowDropdown(false);
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
    console.log(period)

    return (
        <div id="AllExpenses" className={`${mediaQueriesStyle.xlStyle} ${mediaQueriesStyle.lgStyle} ${mediaQueriesStyle.mdStyle} bg-neutral-800 rounded-2xl  text-white flex flex-col`}>
            <div className="relative inline-block text-left">

                <div className='flex justify-between'>
                    <p onClick={() => (setPeriod('month'))} className='font-bold'>All Expenses </p>

                    <p className='text-neutral-400'><span onClick={() => fetchData()}>{period == 'day' ? 'Daily' : period == 'week' ? 'Weekly' : 'Monthly'}</span> <span className=' cursor-pointer hover:text-primary duration-300'><FontAwesomeIcon icon={faChevronDown} ref={dropdownRef} onClick={() => handleDropDown()} /></span></p>
                </div>

                {showDropdown && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {optionLink}
                        </div>
                    </div>
                )}
            </div>
            <div className='flex flex-col flex-1 justify-between my-2 '>
                <div className='flex justify-between mt-8'>
                    <div className='relative -translate-y-4 '>
                        {camambertData?.length == 0 ? <p className='text-neutral-400'>No expenses</p> : camambertData}
                        {/* <div style={{
                            background: 'radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, #FF0000 21%, transparent 0)', // 20% + 1 pour eviter les erreurs d'affichages
                        }} className='absolute w-24 h-24 rounded-full ' ></div>

                        <div style={{
                            background: 'radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, #8CA0D9 16%, transparent 0)',
                            transform: `rotate(${360 * 0.2}deg)`
                        }} className='absolute w-24 h-24 rounded-full ' ></div>

                        <div style={{
                            background: 'radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, #C4CFED 31%, transparent 0)',
                            transform: `rotate(${360 * 0.35}deg)`

                        }} className='absolute w-24 h-24 rounded-full ' ></div>

                        <div style={{
                            background: 'radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, #2C4487 36%, transparent 0)',
                            transform: `rotate(${360 * 0.65}deg)`
                        }} className='absolute w-24 h-24 rounded-full ' ></div> */}
                    </div>
                    <div className='flex flex-col justify-around'>
                        {camambertCategories}
                        {/* <p className='flex flex-row'><span className='block size-3 rounded-full bg-primary'></span><span className='text-neutral-400'>Shopping</span></p>
                        <p className='flex flex-row'><span className='block size-3 rounded-full bg-primary'></span><span className='text-neutral-400'>Food</span></p>
                        <p className='flex flex-row'><span className='block size-3 rounded-full bg-primary'></span><span className='text-neutral-400'>Workout</span></p> */}
                        {/* <p className='flex flex-row'><span className='block size-3 rounded-full bg-[#2C4487]'></span><span className='text-neutral-400'>Workin</span></p> */}
                    </div>
                </div>

                <div className='flex flex-row  justify-around'>
                    <div className='flex flex-col'>
                        <p className='text-neutral-400'>Daily</p>
                        <p className='font-bold'>{expensesDay?.toFixed(2)}€</p>
                    </div>
                    <div>
                        <p className='text-neutral-400'>Weekly</p>
                        <p className='font-bold'>{expensesWeek?.toFixed(2)}€</p>
                    </div>
                    <div>
                        <p className='text-neutral-400'>Monthly</p>
                        <p className='font-bold'>{expensesMonth?.toFixed(2)}€</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AllExpenses;
