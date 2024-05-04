import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMessage, faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/reducer/store';
import { disconnect } from '@/reducer/slices/usersSlice';
const Footer: React.FC = () => {

    const dispatch = useAppDispatch();

    const [chevronDownActive, setChevronDownActive] = useState<boolean>(false)
    
    const handleOpenMenuHeader = (): void => {
        setChevronDownActive(!chevronDownActive);
    }

    const handleDisconnect = () => {
        dispatch(disconnect())
    }

    const year = new Date().getFullYear();
    return (
        <footer className="p-4 bg-neutral-950 ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} <Link href="http://localhost:3000/" className="hover:underline">Dashboard™</Link>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
                <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
                <Link href="#" className="hover:underline me-4 md:me-6">Licensing</Link>
            </li>
            <li>
                <Link href="#" className="hover:underline">Contact</Link>
            </li>
        </ul>
        </div>
    </footer>
    );
}

export default Footer;
