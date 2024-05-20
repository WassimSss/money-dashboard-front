// @ts-nocheck
'use client'

import '../globals.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faMessage, faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faCircleDollarToSlot, faHandHoldingDollar, faSackDollar, faWallet } from '@fortawesome/free-solid-svg-icons';
import AllExpenses from '../../lib/components/AllExpenses';
import Budget from '../../lib/components/Budget';
import Finances from '../../lib/components/Finances';
import MiniCard from '../../lib/components/MiniCard';
// import useAuth from '../hooks/useAuthClientAndRedirect';
import useAuthClientAndRedirect from '../hooks/useAuthClientAndRedirect';
import useAuthServerAndRedirect from '../hooks/useAuthServerAndRedirect';
// import getBalance from '@/lib/fetchRequest/getBalance';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import AddModal from "../../lib/modals/AddModal";
// import { useEffect, useState } from 'react';import Modal from "../../lib/modals/Modal";


const Home: React.FC = () => {
    const requireAuth = true;
    const redirect = "/"

    useAuthServerAndRedirect(requireAuth, redirect);
    useAuthClientAndRedirect(requireAuth, redirect);

    const [modalOpen, setModalOpen] = useState<string>("")

    const toggleAddModal = (modalName: string) => {

        setModalOpen(modalName)
        // setIsAddBalanceModalOpen(true);
    };

    const closeAddModal = () => {
        setModalOpen("")
    };

    const miniCards: string[] = ["Balance", "Income", "Saving", "Expenses", "Debts"];

    const miniCardsIcons: { [key: string]: IconDefinition } = {
        Balance: faWallet,
        Income: faHandHoldingDollar,
        Saving: faCircleDollarToSlot,
        Expenses: faSackDollar,
        Debts: faAddressBook
    }

    const miniCardsComponent = miniCards.map((card, index) => {
        let isActive = false;
        if (card === "Balance") {
            isActive = true;
        }
        let delay = ["100", "150", "200", "300", "500", "700"]
        return (
            <MiniCard
                icon={miniCardsIcons[card]}
                name={card}
                active={isActive}
                openModal={toggleAddModal}
                key={card}
            />
        );
    });

    const miniCardGroups = [];
    for (let i = 0; i < miniCardsComponent.length; i += 2) {
        miniCardGroups.push(
            <div className="flex flex-row justify-center items-center" key={i}>
                {miniCardsComponent[i]}
                {miniCardsComponent[i + 1]}
            </div>
        );
    }

    return (
        <>
            {modalOpen && <AddModal closeModal={closeAddModal} title={modalOpen} needsDate={true} />}
            {/* {isAddBalanceModalOpen && <AddModal closeModal={closeAddBalanceModal} title='Balance' needsDate={true}/>}
            {isAddIncomeModalOpen && <AddIncomeModal closeModal={closeAddIncomeModal} />}
            {isAddSavingModalOpen && <AddSavingModal closeModal={closeAddSavingModal} />}
            {isAddExpensesModalOpen && <AddExpensesModal closeModal={closeAddExpensesModal} />} */}


            <div className="bg-white dark:bg-neutral-900  h-full ">


                <div className='flex flex-col w-full justify-center items-center'>


                    <div className=' w-full flex flex-col lg:flex-row lg:px-8 justify-center items-center lg:items-stretch xl:items-start'>
                        <div className={`flex flex-column flex-wrap w-3/4 sm:w-1/2 justify-center items-center my-4 animate-fade-right animate-delay-600 animate-duration-600`}>
                            {miniCardGroups}
                        </div>
                        <Budget />
                    </div>



                    <div className='w-full flex flex-col lg:flex-row lg:px-8 justify-center items-center lg:items-end'>
                        <Finances />
                        <AllExpenses />
                    </div>
                </div>

                {/* <Transactions /> */}
                {/* <IDontKnow /> */}
            </div>
        </>

    );
}

export default Home;


