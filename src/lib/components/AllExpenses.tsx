import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const AllExpenses: React.FC = () => {
    const mediaQueriesStyle = {
        // twoXl: `${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} xl:w-40 xl:h-40 xl:m-8 xl:p-3 rounded-2xl text-white flex flex-col lg:w-28 lg:h-28`,
        
        xlStyle:"xl:row-start-3 xl:row-end-4 xl:col-start-3 xl:col-end-4 m-4 p-3 m-4 p-3",
        lgStyle:"lg:row-start-2 lg:row-end-3 lg:col-start-4 lg:col-end-5 m-4 p-3 flex flex-col",
        mdStyle:"md:row-start-3 md:row-end-4 md:col-start-3 md:col-end-5 m-4 p-3 flex flex-col",
        smStyle:"xl:row-start-2 xl:row-end-4 xl:col-start-4 xl:col-end-5 m-4 p-3 flex flex-col",
    }

    return (
        <div id="AllExpenses" className={`${mediaQueriesStyle.xlStyle} bg-neutral-800 rounded-2xl  text-white flex flex-col`}>
            <div className='flex justify-between'>
                <p className='font-bold'>All Expenses</p>
                <p className='text-neutral-400'><span>Monthly</span> <span><FontAwesomeIcon icon={faChevronDown} /></span></p>
            </div>
            <div className='flex flex-col flex-1 justify-between my-2 '>
                <div className='flex justify-between mt-8'>
                    <div className='relative'>
                        <div style={{
                            background: 'radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, #3F61C2 21%, transparent 0)', // 20% + 1 pour eviter les erreurs d'affichages
                        }} className='absolute w-24 h-24 rounded-full ' ></div>

                        <div style={{
                            background: 'radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, #8CA0D9 16%, transparent 0)',
                            transform: `rotate(${360 * 0.2}deg)`
                        }} className='absolute w-24 h-24 rounded-full ' ></div>

                        <div style={{
                            background: 'radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, #C4CFED 31%, transparent 0)',
                            transform: `rotate(${360 * 0.35}deg)`

                        }} className='absolute w-24 h-24 rounded-full ' ></div>

                        <div style={{
                            background: 'radial-gradient(closest-side, #262626 79%, transparent 80% 100%), conic-gradient(from 0deg, #2C4487 36%, transparent 0)',
                            transform: `rotate(${360 * 0.65}deg)`
                        }} className='absolute w-24 h-24 rounded-full ' ></div>
                    </div>
                    <div className='flex flex-col justify-around'>
                        <p className='flex flex-row'><span className='block size-3 rounded-full bg-primary'></span><span className='text-neutral-400'>Shopping</span></p>
                        <p className='flex flex-row'><span className='block size-3 rounded-full bg-primary'></span><span className='text-neutral-400'>Food</span></p>
                        <p className='flex flex-row'><span className='block size-3 rounded-full bg-primary'></span><span className='text-neutral-400'>Workout</span></p>
                        <p className='flex flex-row'><span className='block size-3 rounded-full bg-primary'></span><span className='text-neutral-400'>Workin</span></p>
                    </div>
                </div>

                <div className='flex flex-row  justify-around'>
                    <div className='flex flex-col'>
                        <p className='text-neutral-400'>Daily</p>
                        <p className='font-bold'>26€</p>
                    </div>
                    <div>
                        <p className='text-neutral-400'>Weekly</p>
                        <p className='font-bold'>42.20€</p>
                    </div>
                    <div>
                        <p className='text-neutral-400'>Monthly</p>
                        <p className='font-bold'>321.12€</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AllExpenses;
