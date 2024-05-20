import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function monthPicker({ fetchData, monthGived, yearGived, animationDelay }: { fetchData: (month: number, year: number) => void, monthGived: number, yearGived: number, animationDelay: number }) {
    const moment = require('moment');

    const [month, setMonth] = useState<number>(monthGived);
    const [year, setYear] = useState<number>(yearGived);

    const getMonthName = (month: number) => {
        const monthNames = [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ];
        return monthNames[month];
    };

    // const monthName = getMonthName(month);

    const handleDecrementMonth = () => {
        if (month > 0) {
            setMonth(month - 1);
        } else {
            setMonth(11);
            setYear(year - 1);
        }
        if (month === 0) {
            fetchData(11, year);
            return;
        }
        fetchData(month - 1, year);
    }

    const handleIncrementMonth = () => {

        if (month < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);
            setYear(year + 1);
        }
        if (month === 11) {
            fetchData(0, year);
            return;
        }
        fetchData(month + 1, year);
    }
    return (
        <div className={`flex justify-between m-4 text-black dark:text-white animate-fade-down animate-delay-${animationDelay}`} >
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleDecrementMonth()} className="text-dark dark:text-white cursor-pointer hover:text-primary transition-all" />
            <p className=' font-bold'>{getMonthName(month)} {year}</p>
            <FontAwesomeIcon icon={faArrowRight} onClick={() => handleIncrementMonth()} className="text-dark dark:text-white cursor-pointer hover:text-primary transition-all" />
        </div >)

};