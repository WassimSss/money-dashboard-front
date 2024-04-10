import '../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import landscape from '../images/Landscape-Color.jpg'
import Image from 'next/image'

const Transactions: React.FC = () => {
    return (
        <div id="Transactions" className=" row-start-4 row-end-5 col-start-1 col-end-4 bg-neutral-800 rounded-2xl m-4">
            <div id="Finances" className=" row-start-3 row-end-5 col-start-1 col-end-3 bg-neutral-800 rounded-2xl m-4 text-white p-3 flex flex-col">
                <div className='flex justify-between '>
                    <p className='font-bold'>Transactions</p>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>

                <div className='flex text-neutral-400 mt-5 mx-auto'>
                    <div className='mr-8'>
                        <Image
                            src={landscape}
                            alt="Picture of the author"
                            className='size-10 object-cover rounded-full'
                        />

                    </div>

                    <div className='w-36'>
                        <p>Pierre Thierry</p>
                    </div>

                    <div className='w-36'>
                        <p>Graphiste</p>
                    </div>

                    <div className='w-36'>
                        <p>22/03/2024</p>
                    </div>

                    <div className="w-36">
                        <p>66.03€</p>
                    </div>
                </div>

                <div className='flex text-neutral-400 mt-5 mx-auto'>
                    <div className='mr-8'>
                        <Image
                            src={landscape}
                            alt="Picture of the author"
                            className='size-10 object-cover rounded-full'
                        />

                    </div>

                    <div className='w-36'>
                        <p>Jean Paul</p>
                    </div>

                    <div className='w-36'>
                        <p>Mécano</p>
                    </div>

                    <div className='w-36'>
                        <p>20/03/2024</p>
                    </div>

                    <div className="w-36">
                        <p>66.03€</p>
                    </div>
                </div>

                <div className='flex text-neutral-400 mt-5 mx-auto'>
                    <div className='mr-8'>
                        <Image
                            src={landscape}
                            alt="Picture of the author"
                            className='size-10 object-cover rounded-full'
                        />

                    </div>

                    <div className='w-36'>
                        <p>Manon Dupont</p>
                    </div>

                    <div className='w-36'>
                        <p>Baby Sitting</p>
                    </div>

                    <div className='w-36'>
                        <p>18/03/2024</p>
                    </div>

                    <div className="w-36">
                        <p>30€</p>
                    </div>
                </div>

            </div >
        </div >
    );
}

export default Transactions;
