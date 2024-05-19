import { useAppSelector } from '@/reducer/store';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import '../../app/globals.css';
import { getExpensesOfThePeriod } from '../fetchRequest/expenses';
import { getVirementOfYear } from '../fetchRequest/income';
const moment = require('moment');
const Finances = () => {
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    
    const chartRef = useRef(null);
    const [monthsExpenses, setMonthsExpenses] = useState<number[] | undefined>(undefined);
    const [monthsVirements, setMonthsVirements] = useState<number[] | undefined>(undefined);
    const token = useAppSelector(state => state.users.value).token;
    const fetchMonthsExpenses = async () => {
        let expensesOfYear = await getExpensesOfThePeriod(token, "year", null, year);
        setMonthsExpenses(expensesOfYear?.expenses);

   

    };

    const fetchMonthsVirements = async () => {
        let virementOfYear = await getVirementOfYear(token, year);

        setMonthsVirements(virementOfYear);

    }

    useEffect(() => {
        fetchMonthsExpenses();
        fetchMonthsVirements();
    }, [])

    useEffect(() => {
        // @ts-ignore
        const ctx = chartRef.current.getContext('2d');
        if (chartRef.current) {
            const chartInstance = Chart.getChart(chartRef.current);
            if (chartInstance) {
                chartInstance.destroy();
            }
        }

        const resizeHandler = () => {
            // Code for handling resize event
        };

        window.addEventListener('resize', resizeHandler);

        new Chart(ctx, { // Use the Chart class to create a new instance of the chart
            type: 'bar',
            data: {
                labels: ['Janv', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Expenses and prelevement',
                    data: monthsExpenses,
                    backgroundColor: '#4F72D8',
                    borderColor: '#3456B9',
                    borderWidth: 1
                },
                {
                    label: 'Virements',
                    data: monthsVirements,
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6384',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return value + '€';
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        // display: true,
                        // text: '2024 Monthly Finances', // Change the title here
                        font: {
                            size: 16
                        },
                        color: '#fff'
                    }
                }
            }
        });

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [monthsExpenses, monthsVirements]);



    return (
        <div id="Finances" className={/*row-start-3 row-end-4 col-start-1 col-end-3 flex flex-col*/" bg-neutral-800 rounded-2xl text-white w-3/4 sm:w-1/2 p-3 my-4 lg:mx-4 h-full animate-fade-right animate-duration-750"}>
            <div className='flex justify-between'>
                <p className='font-bold'>Finances</p>
                {/* <FontAwesomeIcon icon={faEllipsisVertical} /> */}
            </div>


            <div className='flex justify-center items-end relative h-full w-full'>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default Finances;