import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import getBalance from '../fetchRequest/getBalance';
import { useAppSelector } from '@/reducer/store';

interface MiniCardProps {
    icon: IconProp,
    name: string,
    money?: number,
    active?: boolean
}

const MiniCard: React.FC<MiniCardProps> = ({ icon, name, /*money,*/ active }) => {
    let [money, setMoney] = useState<number | undefined>(0)
    const token = useAppSelector(state => state.users.value).token; // Assurez-vous que le sélecteur correspond à la structure de votre store Redux

    useEffect(() => {
        const fetchData = async () => {
            switch (name) {
                case 'Balance':
                    const balance = await getBalance(token)
                    console.log("balance : ", balance)
                    setMoney(balance)
                    break;
                case 'Income':
                    // const balance = await getBalance(token)
                    // console.log("balance : ", balance)
                    setMoney(3300)
                    break;
                case 'Saving':
                    // const balance = await getBalance(token)
                    // console.log("balance : ", balance)
                    setMoney(300)
                    break;
                case 'Expenses':
                    // const balance = await getBalance(token)
                    // console.log("balance : ", balance)
                    setMoney(136)
                    break;


                default:
                    break;
            }

        }

        fetchData()
    }, [])

    console.log(name)
    return (
        <div className={`${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} w-40 h-40 m-8 p-3 rounded-2xl text-white flex flex-col`}>
            <div className='flex justify-end'>
                <span>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </span>
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
