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
import { useState } from 'react';
import AddModal from "../../lib/modals/AddModal";
import AddBalanceModal from "../../lib/modals/AddBalanceModal";
import AddIncomeModal from "../../lib/modals/AddIncomeModal";
import AddSavingModal from '@/lib/modals/AddSavingModal';
import AddExpensesModal from '@/lib/modals/AddExpensesModal';
// import { useEffect, useState } from 'react';import Modal from "../../lib/modals/Modal";


const Home: React.FC = () => {
    const requireAuth = true;
    const redirect = "/signin"

    useAuthServerAndRedirect(requireAuth, redirect);
    useAuthClientAndRedirect(requireAuth, redirect);

    const [modalOpen, setModalOpen] = useState<string>("")

    const toggleAddModal = (modalName: string) => {
        console.log('test')
        console.log('modalName : ', modalName)
        setModalOpen(modalName)
        // setIsAddBalanceModalOpen(true);
    };

    const closeAddModal = () => {
        setModalOpen("")
        // setIsAddBalanceModalOpen(false);
    };

    const miniCards : string[] = ["Balance", "Income", "Saving","Expenses"];

    const miniCardsIcons = {
        Balance: faWallet,
        Income: faHandHoldingDollar,
        Saving: faCircleDollarToSlot,
        Expenses: faSackDollar,
    }

    const miniCardsComponent = miniCards.map(card => {
        let isActive = false
        if(card === "Balance"){
            isActive = true
        }
        return <MiniCard icon={miniCardsIcons[card]} name={card} active={isActive} openModal={toggleAddModal} key={card} />
    })

    return (
        <>
        {modalOpen && <AddModal closeModal={closeAddModal} title={modalOpen} needsDate={true}/>}
            {/* {isAddBalanceModalOpen && <AddModal closeModal={closeAddBalanceModal} title='Balance' needsDate={true}/>}
            {isAddIncomeModalOpen && <AddIncomeModal closeModal={closeAddIncomeModal} />}
            {isAddSavingModalOpen && <AddSavingModal closeModal={closeAddSavingModal} />}
            {isAddExpensesModalOpen && <AddExpensesModal closeModal={closeAddExpensesModal} />} */}


            <div className="bg-neutral-900 w-full grid grid-rows-layout grid-cols-4">

                <Header />

                <div className='flex flex-row  row-start-2 row-end-3 col-start-1 col-end-4 m-4'>
                {miniCardsComponent}
                    {/* <MiniCard icon={faHandHoldingDollar}  active={false} name="Income" openModal={toggleAddIncomeModal} key="Income" />
                    <MiniCard icon={faCircleDollarToSlot}  active={false} name="Saving" openModal={toggleAddSavingModal} key="Saving" />
                    <MiniCard icon={faSackDollar}  active={false} name="Expenses" openModal={toggleAddExpensesModal} key="Expenses" /> */}
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


