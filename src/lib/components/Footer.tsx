import Link from 'next/link';
import '../../app/globals.css';
const Footer: React.FC = () => {


    const year = new Date().getFullYear();
    return (
        <footer className="p-4 bg-neutral-950  border-t border-primary ">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-white sm:text-center">© {year} <Link href="http://localhost:3001/" className="hover:underline">Dashboard™</Link>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
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
