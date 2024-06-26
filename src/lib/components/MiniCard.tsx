// @ts-nocheck
import { useAppDispatch, useAppSelector } from '@/reducer/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisVertical, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import '../../app/globals.css';
// import { IconType } from "react-icons";
import { setBalanceToStore, setDebtsToStore, setExpensesToStore, setIncomeToStore, setSavingToStore } from '@/reducer/slices/moneySlice';
import { useRouter } from 'next/navigation';
import ContentLoader from "react-content-loader";
import 'react-dropdown/style.css'; // Importez le CSS pour le style par défaut
import { get } from '../fetchRequest/get/get';

type MiniCardProps = {
    icon: IconProp;
    name: string;
    active: boolean;
    openModal: (modalName: string) => void,
    animationDelay: number
};

type objectOption = {
    option: string,
    action: Function | null
}


const MiniCard: React.FC<MiniCardProps> = ({ icon, name, /*money,*/ active, openModal }) => {
    const router = useRouter();
    let [money, setMoney] = useState<number | undefined>(undefined)
    const token = useAppSelector(state => state.users.value).token;
    const moneys = useAppSelector(state => state.moneys.value);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [option, setOption] = useState<objectOption[]>([]);
    const [hasFetched, setHasFetched] = useState(false);

    const dispatch = useAppDispatch()
    const nameToLowerCase = name.toLowerCase()
    useEffect(() => {
        const fetchData = async () => {

            const data = await get(token, nameToLowerCase)
            console.log("name : ", name)
            console.log("data : ", data)

            setMoney(data)
            switch (name) {
                case 'Balance':
                    dispatch(setBalanceToStore(data))
                    setOption([{ option: "Modification de votre montant actuel", action: openModal }, { option: "Historique des actions", action: () => router.push(`/dashboard/data/${nameToLowerCase}`) }]);
                    break;
                case 'Income':
                    dispatch(setIncomeToStore(data))
                    setOption([{ option: "Ajouter un revenu", action: openModal }, { option: "Voir ses revenus", action: () => router.push(`/dashboard/data/${nameToLowerCase}`) }]);
                    break;
                case 'Saving':
                    console.log('saving : ', data)
                    dispatch(setSavingToStore(data))
                    setOption([{ option: "Ajouter une économie", action: openModal }, { option: "Voir ses économies", action: () => router.push(`/dashboard/data/${nameToLowerCase}`) }]);
                    break;
                case 'Expenses':
                    dispatch(setExpensesToStore(data))
                    setOption([{ option: "Ajouter une dépense", action: openModal }, { option: "Voir ses dépenses", action: () => router.push(`/dashboard/data/${nameToLowerCase}`) }]);
                    break;
                case 'Debts':
                    // const debts = await getDebts(token);
                    dispatch(setDebtsToStore(data))
                    setOption([{ option: "Ajouter une dette", action: openModal }, { option: "Voir les dettes", action: () => router.push(`/dashboard/data/${nameToLowerCase}`) }]);
                    // setMoney(moneys.debts)


                    break;

                default:
                    break;
            }

        }

        // if (!hasFetched) {
        // setHasFetched(true)
        fetchData()
        // }
    }, [])

    // console.log(moneys, nameToLowerCase)

    const optionLink = option.map((e, i) => {
        return (
            <a href="#" key={i} className="buttonAction block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800" role="menuitem" onClick={(event) => {
                event.preventDefault(); // Empêche le comportement par défaut de l'élément <a>
                event.stopPropagation(); // Empêche la propagation de l'événement de clic
                if (e.action) {
                    e.action(name); // Exécute l'action si elle est définie
                    setShowDropdown(false);
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
        const handleClickOutside = (event: MouseEvent) => {

            const dropdownRefType = dropdownRef.current as HTMLElement | null;
            const target = event.target as HTMLElement;
            if (dropdownRefType && !dropdownRefType?.contains(target)) {
                if (typeof target.className === "string") {
                    if (target.className.split(' ')[0] === "buttonAction") {

                    } else {
                        setShowDropdown(false);
                    }
                } else {
                    setShowDropdown(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    console.log("moneys : ", moneys)
    const handleDropDown = () => {
        setShowDropdown(false); // Assurez-vous que setShowDropdown est défini dans votre composant
        setShowDropdown(!showDropdown)
    }

    const mediaQueriesStyle = {
        // twoXl: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 rounded-2xl text-white flex flex-col lg:w-28 lg:h-28`,
        xlStyle: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 xl:text-base`,
        lgStyle: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} lg:w-36 lg:h-36 lg:m-8 lg:p-3 lg:text-base`,
        mdStyle: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} md:w-36 md:h-36 md:m-8 md:p-3 md:text-base`,
        smStyle: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 rounded-2xl text-white flex flex-col lg:w-28 lg:h-28`,
    }

    return (
        <div className={` ${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} p-3 m-3 rounded-2xl text-white flex flex-col w-28 h-28 md:h-36 md:w-36`}>
            <div className='flex justify-end'>
                <div className="relative inline-block text-left">
                    <div>
                        <span className="rounded-md shadow-sm" ref={dropdownRef} onClick={() => handleDropDown()}>
                            <FontAwesomeIcon icon={faEllipsisVertical} className="justify-center w-full rounded-md px-4 py-2 md:text-sm font-medium text-white cursor-pointer" />
                        </span>
                    </div>

                    {showDropdown && (
                        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {optionLink}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-around">
                <div className='bg-white-opacity rounded-full hidden md:flex md:w-10 md:h-10 justify-center items-center p-2'>
                    <span className='text-center w-full'>
                        <FontAwesomeIcon icon={icon} />
                    </span>
                </div>

                <p>{name}</p>


                {money !== undefined ? (
                    <p className='font-bold'>{moneys[nameToLowerCase].toFixed(2)}€</p>
                ) : (
                    <ContentLoader
                        speed={2}
                        width={400}
                        height={160}
                        viewBox="0 0 400 160"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#999999"
                    >
                        <rect x="0" y="0" rx="3" ry="3" width="50" height="15" />
                    </ContentLoader>
                )}
            </div>
        </div >
    );
}

export default MiniCard;
