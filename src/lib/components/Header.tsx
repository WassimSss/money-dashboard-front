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
        <header id="Header" className="bg-neutral-950 md:h-32 w-full flex justify-between items-center p-3">
            <div className=' animate-fade'>
                <Link className='text-white md:text-lg lg:text-2xl no-underline font-bold' href="/dashboard">Dashboard</Link>
            </div>

            <div className='hidden sm:block animate-fade'>
                <input type="search" className='bg-neutral-800 rounded-lg text-sm p-2' placeholder="Search for transaction, item, etc..." id="" />
            </div>

            <div className='flex flex-row animate-fade'>
                <span className='text-white px-2'>
                    <FontAwesomeIcon icon={faBell} />
                </span>

                <span className='text-white px-2 animate-fade'>
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
