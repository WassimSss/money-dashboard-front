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
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import Footer from '@/lib/components/Footer';
// import { useEffect, useState } from 'react';import Modal from "../../lib/modals/Modal";


const Home: React.FC = () => {
    const requireAuth = true;
    const redirect = "/signin"

    useAuthServerAndRedirect(requireAuth, redirect);
    useAuthClientAndRedirect(requireAuth, redirect);

    const [modalOpen, setModalOpen] = useState<string>("")

    const toggleAddModal = (modalName: string) => {
        // console.log('test')
        // console.log('modalName : ', modalName)
        setModalOpen(modalName)
        // setIsAddBalanceModalOpen(true);
    };

    const closeAddModal = () => {
        setModalOpen("")
    };

    const miniCards: string[] = ["Balance", "Income", "Saving", "Expenses"];

    const miniCardsIcons: { [key: string]: IconDefinition } = {
        Balance: faWallet,
        Income: faHandHoldingDollar,
        Saving: faCircleDollarToSlot,
        Expenses: faSackDollar,
    }

    const miniCardsComponent = miniCards.map((card, index) => {
        let isActive = false;
        if (card === "Balance") {
            isActive = true;
        }
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

    const mediaQueriesStyle = {
        // twoXl: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 rounded-2xl text-white flex flex-col lg:w-28 lg:h-28`,
        xlStyle: `xl:row-start-2 xl:row-end-3 xl:col-start-1 xl:col-end-4`,
        lgStyle: `lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-4`,
        mdStyle: `md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-5 justify-center`,
        smStyle: `sm:row-start-2 sm:row-end-3 sm:col-start-1 sm:col-end-5 justify-center`,
    }
    return (
        <>
            {modalOpen && <AddModal closeModal={closeAddModal} title={modalOpen} needsDate={true} />}
            {/* {isAddBalanceModalOpen && <AddModal closeModal={closeAddBalanceModal} title='Balance' needsDate={true}/>}
            {isAddIncomeModalOpen && <AddIncomeModal closeModal={closeAddIncomeModal} />}
            {isAddSavingModalOpen && <AddSavingModal closeModal={closeAddSavingModal} />}
            {isAddExpensesModalOpen && <AddExpensesModal closeModal={closeAddExpensesModal} />} */}


            <div className="bg-neutral-900  h-full ">

                <Header />

                <div className='flex flex-col w-full justify-center items-center'>


                    <div className=' w-full flex flex-col lg:flex-row lg:px-8 justify-center items-center lg:items-stretch xl:items-start'>
                        <div className={`flex flex-column flex-wrap w-3/4 sm:w-1/2 justify-center items-center my-4`}>
                            {miniCardGroups}
                        </div>
                        <Budget />
                    </div>



                    <div className='w-full flex flex-col lg:flex-row lg:px-8 justify-center items-center lg:items-end'>
                        <Finances />
                        <AllExpenses />
                    </div>
                </div>

                <Footer />
                {/* <Transactions /> */}
                {/* <IDontKnow /> */}
            </div>
        </>

    );
}

export default Home;


