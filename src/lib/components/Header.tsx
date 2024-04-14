import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMessage, faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/reducer/store';
import { disconnect } from '@/reducer/slices/usersSlice';


const Header: React.FC = () => {

    const dispatch = useAppDispatch();

    const [chevronDownActive, setChevronDownActive] = useState<boolean>(false)
    
    const handleOpenMenuHeader = (): void => {
        setChevronDownActive(!chevronDownActive);
    }

    const handleDisconnect = () => {
        dispatch(disconnect())
    }

    return (
        <header id="Header" className=" row-start-1 row-end-2 col-start-1 col-end-5 bg-neutral-950 h-16 w-full flex justify-between items-center p-3">
            <div>
                <a className='text-white text-2xl no-underline font-bold' href="#">Dashboard</a>
            </div>

            <div>
                <input type="search" className='bg-neutral-800 rounded-lg text-sm p-2' placeholder="Search for transaction, item, etc..." id="" />
            </div>

            <div className='flex flex-row'>
                <span className='text-white px-2'>
                    <FontAwesomeIcon icon={faBell} />
                </span>

                <span className='text-white px-2'>
                    <FontAwesomeIcon icon={faMessage} />
                </span>


                <div className="ml-4 relative">
                    <span>
                        <FontAwesomeIcon icon={faCircle} className='w-5 h-5 px-2 text-gray-400' />
                    </span>

                    <span className='text-white' onClick={handleOpenMenuHeader}>
                        <FontAwesomeIcon style={{ transform: `rotate(${chevronDownActive ? '90deg' : '0deg'})` }} icon={faChevronDown} />
                    </span>

                    {chevronDownActive && <div className='absolute right-0 -bottom-24 pt-4 pr-2 pb-8 pl-2 bg-white '>
                        <ul className='p-0'>
                            <button className='font-bold whitespace-nowrap cursor-pointer text-black' onClick={handleDisconnect}>Se deconnecter</button>
                        </ul>
                    </div>}

                </div>


            </div>
        </header >
    );
}

export default Header;
