'use client'
import { disconnect, toggleDarkMode } from '@/reducer/slices/usersSlice';
import { useAppDispatch, useAppSelector } from '@/reducer/store';
import Link from 'next/link';
import { useEffect } from 'react';
import '../../app/globals.css';
const Header: React.FC = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.users.value)
    console.log("user.darkMode : ", user.darkMode)

    // const [chevronDownActive, setChevronDownActive] = useState<boolean>(false)

    // const handleOpenMenuHeader = (): void => {
    //     setChevronDownActive(!chevronDownActive);
    // }

    const handleDisconnect = () => {
        dispatch(disconnect())
    }

    const handleDarkMode = () => {
        dispatch(toggleDarkMode())
    }

    useEffect(() => {
        if (user.darkMode) {
            console.log("dark mode", user.darkMode)
            document.documentElement.classList.add("dark");
            return;
        }
        console.log("light mode", user.darkMode)
        document.documentElement.classList.remove("dark");
    }, [user.darkMode])


    // const handleDarkMode = () => {
    //     if (user.darkMode) {
    //         document.documentElement.classList.remove("dark");
    //         return;
    //     }
    //     document.documentElement.classList.toggle("dark");
    // };

    return (
        <header id="Header" className="bg-neutral-950 md:h-32 w-full flex justify-between items-center p-3 border-b border-primary">
            <div className=' animate-fade'>
                <Link className='text-white md:text-lg lg:text-2xl no-underline font-bold' href={user.token ? '/dashboard' : '/'}>Dashboard</Link>
            </div>

            {/* <div className='hidden sm:block animate-fade'>
                <input type="search" className='bg-neutral-800 rounded-lg text-sm p-2' placeholder="Search for transaction, item, etc..." id="" />
            </div> */}


            <div className='flex flex-row animate-fade justify-center items-center '>
                {/* <div className='flex flex-col justify-center items-center'> */}
                <input onClick={handleDarkMode} data-hs-theme-switch="" className="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-gray-700 focus:ring-gray-700 focus:outline-none appearance-none
before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200
after:absolute after:end-1.5 after:top-[calc(50%-0.40625rem)] after:w-[.8125rem] after:h-[.8125rem] after:bg-no-repeat after:bg-[right_center] after:bg-[length:.8125em_.8125em] after:transform after:transition-all after:ease-in-out after:duration-200 after:opacity-70 checked:after:start-1.5 checked:after:end-auto" type="checkbox" id="darkSwitch" checked={user.darkMode ? true : false} />
                {/* <label htmlFor="darkSwitch" className="text-white">Dark mode</label> */}

                {/* </div> */}

                {user.token ? (<div className="mx-4 relative">
                    <button onClick={handleDisconnect} className="text-white hover:text-primary transition-colors underline">Disconnect</button>
                </div>) : (
                    <div className='flex flex-row animate-fade mx-4'>

                        <Link href="/signup" className='bg-white px-5 py-3 rounded text-black m-2'>Singup</Link>
                        <Link href="/signin" className='bg-primary px-5 py-3 rounded text-white m-2'>Signin</Link>
                    </div>
                )}

            </div>

        </header >
    );
}

export default Header;
