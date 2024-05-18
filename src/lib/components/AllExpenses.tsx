import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faChevronDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getExpensesOfThePeriod, getExpensesCategories } from '../fetchRequest/expenses';
import { useAppDispatch, useAppSelector } from '@/reducer/store';
import { useEffect, useRef, useState } from 'react';
import { setExpensesOfTheDayToStore, setExpensesOfTheMonthToStore, setExpensesOfTheWeekToStore } from '@/reducer/slices/moneySlice';
import 'react-dropdown/style.css'; // Importez le CSS pour le style par défaut
import Chart from 'chart.js/auto';
import ContentLoader from 'react-content-loader';
import { Oval } from 'react-loader-spinner';
const moment = require("moment");

const AllExpenses: React.FC = () => {
    const chartRef = useRef(null);

    type expensesCategoriesType = {
        expenses: Array<[string, number]>;
        [index: number]: [string, number]; // Add index signature
    };

    var fr = moment().locale('fr');
    const [expensesDay, setExpensesDay] = useState<number | undefined>(undefined);
    const [expensesWeek, setExpensesWeek] = useState<number | undefined>(undefined);
    const [expensesMonth, setExpensesMonth] = useState<number | undefined>(undefined);
    const [expensesCategories, setExpensesCategories] = useState<expensesCategoriesType[] | undefined>(undefined);
    const [period, setPeriod] = useState<string>('day'); // 'day', 'week', 'month'
    const [month, setMonth] = useState<number>(moment().month());
    const [year, setYear] = useState<number>(moment().year());
    const token = useAppSelector(state => state.users.value).token;
    const moneys = useAppSelector(state => state.moneys.value);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    // @ts-ignore
    const [allMonthsData, setAllMonthsData,] = useState<{ [key: string]: monthExpensesObject } | undefined>({});


    const dispatch = useAppDispatch();

    const fetchExpensesofTheDay = async () => {
        const expensesofTheDay = await getExpensesOfThePeriod(token, 'day');

        dispatch(setExpensesOfTheDayToStore(expensesofTheDay?.amount))
        setExpensesDay(moneys.expensesofTheDay)
    }

    const fetchExpensesOfTheWeek = async () => {
        const expensesOfTheWeek = await getExpensesOfThePeriod(token, 'week');
        dispatch(setExpensesOfTheWeekToStore(expensesOfTheWeek?.amount))
        setExpensesWeek(moneys.expensesofTheWeek)
    }

    const fetchExpensesOfTheMonth = async () => {
        // get number of the month with the date
        const expensesOfTheMonth = await getExpensesOfThePeriod(token, "month", month + 1, year);
        const monthAndYear = `${fr.localeData().months(moment([year, month]))}_${year}`
        console.log("expensesOfTheMonth : ", expensesOfTheMonth);
        dispatch(setExpensesOfTheMonthToStore(expensesOfTheMonth?.amount))
        setExpensesMonth(moneys.expensesofTheMonth)
        setAllMonthsData({ ...allMonthsData, [monthAndYear]: expensesOfTheMonth });
    }

    useEffect(() => {
        if (period === 'day') {
            fetchExpensesofTheDay()
        }
        if (period === 'week') {
            fetchExpensesOfTheWeek()
        }
        fetchExpensesOfTheMonth()


    }, [moneys])

    const fetchData = async () => {

        const fetchExpensesCategories = await getExpensesOfThePeriod(token, "month", month + 1, year);
        // @ts-ignore
        setExpensesCategories(fetchExpensesCategories.expenses)
        // calculer pourcentage

    }



    useEffect(() => {
        fetchData();
    }, [moneys, period, month])

    const labelDougnut = expensesCategories?.map(expense => {
        return expense[0]
    })

    const colorDougnut = ["#2C4487", "#3F61C2", "#8CA0D9", "#C4CFED"].slice(0, labelDougnut?.length)

    const dataDougnut = expensesCategories?.map(expense => {
        return expense[1]
    })

    useEffect(() => {
        console.log("hello");

        const chartRefType = chartRef.current as HTMLCanvasElement | null;
        const ctx = chartRefType?.getContext('2d');
        if (chartRefType && ctx) {
            const chartInstance = Chart.getChart(chartRefType);
            if (chartInstance) {
                chartInstance.destroy();
            }

            new Chart(ctx, { // Use the Chart class to create a new instance of the chart
                type: 'doughnut',
                data: {
                    labels: labelDougnut,
                    datasets: [{
                        data: dataDougnut,
                        backgroundColor: colorDougnut,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            font: {
                                size: 16
                            },
                            color: '#fff'
                        }
                    }
                }
            });
        }

        const resizeObserver = new ResizeObserver(() => {
            const chartInstance = chartRefType ? Chart.getChart(chartRefType) : null;
            if (chartInstance) {
                chartInstance.resize();
            }
        });

        if (chartRefType) {
            resizeObserver.observe(chartRefType);
        }

        return () => {
            if (chartRef.current) {
                resizeObserver.unobserve(chartRef.current);
            }
        };
    }, [dataDougnut]);

    useEffect(() => {
        console.log('test')
        console.log(setAllMonthsData);

    }, [month])

    const camembertColors = ["#2C4487", "#3F61C2", "#8CA0D9", "#C4CFED"]

    const option = [{ option: "Mois", action: () => setPeriod("month") }, { option: "Semaine", action: () => setPeriod('week') }, { option: "Jour", action: () => setPeriod('day') }]
    const optionLink = option.map((e, i) => {
        // console.log(period)
        return (
            <a href="#" key={i} className="buttonAction block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem" onClick={() => {
                e.action(); // Exécute l'action si elle est définie
                setShowDropdown(false); // Ferme le menu déroulant
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

    const handleDecrementMonth = () => {
        // a terme ne pas faire de fetch si les données sont déjà en cache
        console.log("expensesCategories : ", expensesCategories)
        // fetchData();
        if (month > 0) {
            setMonth(month - 1);
        } else {
            setMonth(11);
            setYear(year - 1);
        }
    }

    const handleIncrementMonth = () => {
        // a terme ne pas faire de fetch si les données sont déjà en cache
        console.log("expensesCategories : ", expensesCategories)

        // fetchData();

        if (month < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);
            setYear(year + 1);
        }
    }

    return (
        <div id="AllExpenses" className={`bg-neutral-800 rounded-2xl text-white w-3/4 sm:w-1/2 my-4 lg:mx-4 p-3 h-full flex flex-col animate-fade-left animate-duration-750`}>
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
            <div className="flex justify-between m-4">
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleDecrementMonth()} className="text-white cursor-pointer hover:text-primary transition-all" />
                <p className=' font-bold'>{fr.localeData().months(moment([year, month]))} {year}</p>
                <FontAwesomeIcon icon={faArrowRight} onClick={() => handleIncrementMonth()} className="text-white cursor-pointer hover:text-primary transition-all" />
            </div>
            <div className='flex flex-col flex-1 justify-between my-2 '>
                <div className='flex justify-center mt-8 w-full'>
                    {expensesCategories === undefined && (<Oval
                        visible={true}
                        height="80%"
                        width="80%"
                        color="#4F72D8"
                        secondaryColor="#ffffff"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />)}
                    <div className={`flex justify-center items-center h-5/6 w-5/6 lg:h-1/2 lg:w-1/2 p-5`}>
                        <canvas className={`${expensesCategories === undefined || expensesCategories.length === 0 && "!hidden "}`} ref={chartRef}></canvas>
                        {expensesCategories && expensesCategories.length === 0 && <p className='text-primary text-2xl'>No expenses for this period</p>}
                    </div>
                </div>

                <div className='flex flex-row  justify-around'>
                    <div className='flex flex-col'>
                        <p className='text-neutral-400'>Daily</p>
                        {expensesDay !== undefined ? (
                            <p className='font-bold'>{expensesDay?.toFixed(2)}€</p>
                        ) : (
                            <ContentLoader
                                speed={2}
                                width={50}
                                height={15}
                                viewBox="0 0 50 15"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#999999"
                            >
                                <rect x="0" y="0" rx="3" ry="3" width="50" height="15" />
                            </ContentLoader>
                        )}
                    </div>
                    <div>
                        <p className='text-neutral-400'>Weekly</p>
                        {expensesWeek !== undefined ? (
                            <p className='font-bold'>{expensesWeek?.toFixed(2)}€</p>
                        ) : (
                            <ContentLoader
                                speed={2}
                                width={50}
                                height={15}
                                viewBox="0 0 50 15"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#999999"
                            >
                                <rect x="0" y="0" rx="3" ry="3" width="50" height="15" />
                            </ContentLoader>
                        )}                    </div>
                    <div>
                        <p className='text-neutral-400'>Monthly</p>
                        {expensesMonth !== undefined ? (
                            <p className='font-bold'>{expensesMonth?.toFixed(2)}€</p>
                        ) : (
                            <ContentLoader
                                speed={2}
                                width={50}
                                height={15}
                                viewBox="0 0 50 15"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#999999"
                            >
                                <rect x="0" y="0" rx="3" ry="3" width="50" height="15" />
                            </ContentLoader>
                        )}                    </div>
                </div>
            </div>
        </div >
    );
}

export default AllExpenses;
