import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const Budget: React.FC = () => {

    type objectOption = {
        option: string,
        action: Function | null
    }

    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    // const [option, setOption] = useState<objectOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // setOption([{ option: "Ajouter un revenu", action: null }, { option: "Voir ses revenus", action: null }]);
    const option = [{ option: "Ajouter un revenu", action: null }, { option: "Voir ses revenus", action: null }]

    // const toggleAddExpensesModal = () => {
    //     console.log('isAddExpensesModalOpen : ', isAddExpensesModalOpen)
    //     setIsAddExpensesModalOpen(true);
    // };

    // const closeAddExpensesModal = () => {
    //     setIsAddExpensesModalOpen(false);
    // };


    useEffect(() => {
        const handleClickOutside = (event) => {

            // console.log(dropdownRef.current, event.target)
            // console.log(typeof event.target.className === "string");

            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if ((typeof event.target.className === "string")) {
                    if (event.target.className.split(' ')[0] === "buttonAction") {

                    } else {
                        setShowDropdown(false); // Assurez-vous que setShowDropdown est défini dans votre composant
                    }
                } else {
                    setShowDropdown(false); // Assurez-vous que setShowDropdown est défini dans votre composant
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

    const optionLink = option.map((e, i) => {
        return (
            <a href="#" key={i} className="buttonAction block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem" onClick={(event) => {
                event.preventDefault(); // Empêche le comportement par défaut de l'élément <a>
                event.stopPropagation(); // Empêche la propagation de l'événement de clic
                if (e.action) {
                    e.action(); // Exécute l'action si elle est définie
                }
            }}>
                {e.option}
            </a>
        );
    });

    const mediaQueriesStyle = {
        // twoXl: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 rounded-2xl text-white flex flex-col lg:w-28 lg:h-28`,
        xlStyle:"xl:row-start-2 xl:row-end-4 xl:col-start-4 xl:col-end-5  m-4 p-3 flex flex-col",
        lgStyle:"lg:row-start-3 lg:row-end-4 lg:col-start-3 lg:col-end-5 m-4 p-3 flex flex-col",
        mdStyle:"md:row-start-3 md:row-end-4 md:col-start-3 md:col-end-5 m-4 p-3 flex flex-col",
        smStyle:"xl:row-start-2 xl:row-end-4 xl:col-start-4 xl:col-end-5 m-4 p-3 flex flex-col",
    }
    
    return (
        <section id="Budget" className={`bg-neutral-800 rounded-2xl text-white ${mediaQueriesStyle.xlStyle} ${mediaQueriesStyle.lgStyle}`}>
            <div className='relative flex justify-between'>
                <p className='font-bold'>Budget</p>
                <span className="rounded-md shadow-sm" ref={dropdownRef} onClick={() => handleDropDown()}>
                <FontAwesomeIcon icon={faEllipsisVertical} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white cursor-pointer" />
                </span>
                {showDropdown && (
                        <div className="origin-top-right absolute right-0 top-8 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {optionLink}
                                {/* <a href="#" className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem" onClick={(event) => {
                                    event.stopPropagation(); // Empêche la propagation de l'événement de clic
                                    if (event.action) {
                                        console.log("ALED") // Exécute l'action si elle est définie
                                    }
                                }}>Ajouter un revenu</a> */}
                                {/* <a href="#" className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem">Voir ses revenus</a> */}
                                {/* <a href="#" className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem">Option 3</a> */}
                            </div>
                        </div>
                    )}
            </div>
            <div className='flex flex-col flex-1 justify-between my-2 '>
                <p className='text-3xl font-bold'>250€<span className="text-primary">/mois</span></p>

                <div>
                    <div className='flex justify-between'>
                        <p>Sorties</p>
                        <p className='text-success'>25.74/100€</p>
                    </div>
                    <div className=' flex justify-between'>
                        <p>Fast-food</p>
                        <p className='text-error'>75.50/50€</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Achat</p>
                        <p className='text-success'>27/100€</p>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <p>Total</p>
                    <p className='text-success'>127.04/250€</p>
                </div>
            </div>
            <div></div>
        </section >
    );
}

export default Budget;
