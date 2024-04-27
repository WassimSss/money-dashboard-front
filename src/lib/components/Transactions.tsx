import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import landscape from '../../images/Landscape-Color.jpg'
import Image from 'next/image'

const Transactions: React.FC = () => {
    const mediaQueriesStyle = {
        // twoXl: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 rounded-2xl text-white flex flex-col lg:w-28 lg:h-28`,
        xlStyle:"xl:row-start-4 xl:row-end-5 xl:col-start-1 xl:col-end-4 m-4 p-3",
        lgStyle:"lg:row-start-4 lg:row-end-5 lg:col-start-1 lg:col-end-4 m-4 p-3 flex flex-col",
        mdStyle:"md:row-start-3 md:row-end-4 md:col-start-3 md:col-end-5 m-4 p-3 flex flex-col",
        smStyle:"xl:row-start-2 xl:row-end-4 xl:col-start-4 xl:col-end-5 m-4 p-3 flex flex-col",
    }
    
    return (
        <div id="Transactions" className={`${mediaQueriesStyle.xlStyle} ${mediaQueriesStyle.lgStyle} bg-neutral-800 rounded-2xl m-4 text-white p-3 flex flex-col `}>
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
    );
}

export default Transactions;
