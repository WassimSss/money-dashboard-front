import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getExpensesOfTheMonth } from '../fetchRequest/expenses';
import { useAppSelector } from '@/reducer/store';
import { getVirementOfMonth } from '../fetchRequest/income';

const Finances = () => {
    const chartRef = useRef(null);
    const [monthsExpenses, setMonthsExpenses] = useState<object[] | undefined>(undefined);
    const [monthsVirements, setMonthsVirements] = useState<object[] | undefined>(undefined);
    const token = useAppSelector(state => state.users.value).token;

    const fetchMonthsExpenses = async () => {
        const arrayOfMonthExpenses = []
        for (let i = 1; i < 13; i++) {
            let monthExpenses = await getExpensesOfTheMonth(token, i);
            // console.log("monthExpenses : ", monthExpenses);
            arrayOfMonthExpenses.push(monthExpenses.expensesAmountTotal)
        }
        setMonthsExpenses(arrayOfMonthExpenses);
        // console.log("arrayOfMonthExpenses : ", arrayOfMonthExpenses);

    };

    const fetchMonthsVirements = async () => {
        const arrayOfMonthVirements = []
        for (let i = 1; i < 13; i++) {
            let monthIncomes = await getVirementOfMonth(token, i);
            console.log("monthIncomes : ", monthIncomes);
            arrayOfMonthVirements.push(monthIncomes)
        }
        setMonthsVirements(arrayOfMonthVirements);
        console.log("arrayOfMonthIncomes : ", arrayOfMonthVirements);

    }

    useEffect(() => {
        fetchMonthsExpenses();
        fetchMonthsVirements();
    }, [])

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        if (chartRef.current) {
            const chartInstance = Chart.getChart(chartRef.current);
            if (chartInstance) {
                chartInstance.destroy();
            }
        }

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
                        display: true,
                        text: '2024 Monthly Finances', // Change the title here
                        font: {
                            size: 16
                        },
                        color: '#fff'
                    }
                }
            }
        });
    }, [monthsExpenses, monthsVirements]);



    return (
        <div id="Finances" className="row-start-3 row-end-4 col-start-1 col-end-3 bg-neutral-800 rounded-2xl m-4 text-white p-3 flex flex-col">
            <div className='flex justify-between'>
                <p className='font-bold'>Finances</p>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
            <div className='flex justify-center items-end h-full'>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default Finances;