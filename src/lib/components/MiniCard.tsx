import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState, useRef } from 'react';
import getBalance from '../fetchRequest/getBalance';
import { useAppDispatch, useAppSelector } from '@/reducer/store';
import { getIncome } from '../fetchRequest/income';
// import { IconType } from "react-icons";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'; // Importez le CSS pour le style par défaut
import AddIncomeModal from '../modals/AddIncomeModal';
import { setBalanceToStore, setIncomeToStore } from '@/reducer/slices/moneySlice';

type MiniCardProps = {
    icon: IconProp;
    name: string;
    active: boolean;
    openModal: () => void
};

type objectOption = {
    option: string,
    action: Function | null
}


const MiniCard: React.FC<MiniCardProps> = ({ icon, name, /*money,*/ active, openModal }) => {
    let [money, setMoney] = useState<number | undefined>(0)
    const token = useAppSelector(state => state.users.value).token; // Assurez-vous que le sélecteur correspond à la structure de votre store Redux
    const moneys = useAppSelector(state => state.moneys.value); // Assurez-vous que le sélecteur correspond à la structure de votre store Redux
    console.log(moneys)
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [option, setOption] = useState<objectOption[]>([]);

    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () => {
            switch (name) {
                case 'Balance':
                    const balance = await getBalance(token)
                    setOption([{ option: "Option 1", action: null }, { option: "Option 2", action: null }, { option: "Option 3", action: null }]);
                    dispatch(setBalanceToStore(balance))
                    setMoney(moneys.balance)
                    break;
                case 'Income':
                    const income = await getIncome(token)
                    setOption([{ option: "Ajouter un revenu", action: openModal }, { option: "Voir ses revenus", action: null }]);
                    dispatch(setIncomeToStore(income))
                    setMoney(moneys.income)
                    break;
                case 'Saving':
                    // const balance = await getBalance(token)
                    setOption([{ option: "Option 1", action: null }, { option: "Option 2", action: null }, { option: "Option 3", action: null }]);
                    setMoney(300)
                    break;
                case 'Expenses':
                    // const balance = await getBalance(token)
                    setOption([{ option: "Option 1", action: null }, { option: "Option 2", action: null }, { option: "Option 3", action: null }]);
                    setMoney(136)
                    break;


                default:
                    break;
            }

        }

        fetchData()
    }, [moneys])

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

    // const handleSelectChange = (option) => {
    //     setSelectedOption(option.value);
    // };

    const dropdownRef = useRef(null);

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

    return (
        <div className={`${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} w-40 h-40 m-8 p-3 rounded-2xl text-white flex flex-col`}>
            <div className='flex justify-end'>
                <div className="relative inline-block text-left">
                    <div>
                        <span className="rounded-md shadow-sm" ref={dropdownRef} onClick={() => handleDropDown()}>
                            <FontAwesomeIcon icon={faEllipsisVertical} className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white cursor-pointer" />
                        </span>
                    </div>

                    {showDropdown && (
                        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
            </div>
            <div className="flex flex-1 flex-col justify-around">
                <div className='bg-white-opacity rounded-full w-10 h-10 flex justify-center items-center p-2'>
                    <span className='text-center w-full'>

                        <FontAwesomeIcon icon={icon} />
                    </span>
                </div>


                <p>{name}</p>

                <p className='font-bold'>{String(money)}€</p>
            </div>
        </div>
    );
}

export default MiniCard;
