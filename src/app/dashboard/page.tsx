'use client'

import '../globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMessage, faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import MiniCard from '../../components/MiniCard';
import { faWallet, faHandHoldingDollar, faCircleDollarToSlot, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import Budget from '../../components/Budget';
import Finances from '../../components/Finances';
import AllExpenses from '../../components/AllExpenses';
import Transactions from '../../components/Transactions';
import IDontKnow from '../../components/IDontKnow';
const Home: React.FC = () => {
    return (
        <div className="bg-neutral-900  w-full grid grid-rows-layout grid-cols-4">
            <Header />

            <div className='flex flex-row  row-start-2 row-end-3 col-start-1 col-end-4 m-4'>
                <MiniCard icon={faWallet} name="Balance" money={2190.19} active={true} />
                <MiniCard icon={faHandHoldingDollar} name="Income" money={2130.00} />
                <MiniCard icon={faCircleDollarToSlot} name="Saving" money={1875.10} />
                <MiniCard icon={faSackDollar} name="Expenses" money={1912.00} />
            </div>

            <Budget />
            <Finances />
            <AllExpenses />
            <Transactions />
            <IDontKnow />
        </div>
    );
}

export default Home;


