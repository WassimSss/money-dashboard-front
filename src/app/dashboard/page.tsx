'use client'

import '../globals.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faMessage, faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../../lib/components/Header';
import MiniCard from '../../lib/components/MiniCard';
import { faWallet, faHandHoldingDollar, faCircleDollarToSlot, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import Budget from '../../lib/components/Budget';
import Finances from '../../lib/components/Finances';
import AllExpenses from '../../lib/components/AllExpenses';
import Transactions from '../../lib/components/Transactions';
import IDontKnow from '../../lib/components/IDontKnow';
// import useAuth from '../hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '../hooks/useAuthServerAndRedirect';
import useAuthClientAndRedirect from '../hooks/useAuthClientAndRedirect';
// import getBalance from '@/lib/fetchRequest/getBalance';
import AddIncomeModal from "../../lib/modals/AddIncomeModal";
import { useState } from 'react';
import AddSavingModal from '@/lib/modals/AddSavingModal';
// import { useEffect, useState } from 'react';import Modal from "../../lib/modals/Modal";


const Home: React.FC = () => {
    const requireAuth = true;
    const redirect = "/signin"

    useAuthServerAndRedirect(requireAuth, redirect);
    useAuthClientAndRedirect(requireAuth, redirect);

    const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState<boolean>(false)
    const [isAddSavingModalOpen, setIsAddSavingModalOpen] = useState<boolean>(false)


    const toggleAddIncomeModal = () => {
        console.log('isAddIncomeModalOpen : ', isAddIncomeModalOpen)
        setIsAddIncomeModalOpen(true);
    };

    const closeAddIncomeModal = () => {
        setIsAddIncomeModalOpen(false);
    };

    const toggleAddSavingModal = () => {
        console.log('isAddSavingModalOpen : ', isAddSavingModalOpen)
        setIsAddSavingModalOpen(true);
    };

    const closeAddSavingModal = () => {
        setIsAddSavingModalOpen(false);
    };

    return (
        <>
            {isAddIncomeModalOpen && <AddIncomeModal closeModal={closeAddIncomeModal} />}
            {isAddSavingModalOpen && <AddSavingModal closeModal={closeAddSavingModal} />}

            <div className="bg-neutral-900 w-full grid grid-rows-layout grid-cols-4">

                <Header />

                <div className='flex flex-row  row-start-2 row-end-3 col-start-1 col-end-4 m-4'>
                    <MiniCard icon={faWallet} name="Balance" /*money={money}*/ active={true} key="Balance" />
                    <MiniCard icon={faHandHoldingDollar} name="Income" money={2130.00} openModal={toggleAddIncomeModal} key="Income" />
                    <MiniCard icon={faCircleDollarToSlot} name="Saving" money={1875.10} openModal={toggleAddSavingModal} key="Saving" />
                    <MiniCard icon={faSackDollar} name="Expenses" money={1912.00} key="Expenses" />
                </div>

                <Budget />
                <Finances />
                <AllExpenses />
                <Transactions />
                <IDontKnow />
            </div>
        </>

    );
}

export default Home;


