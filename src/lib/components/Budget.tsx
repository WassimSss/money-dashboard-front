import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Budget: React.FC = () => {
    return (
        <section id="Budget" className=" row-start-2 row-end-4 col-start-4 col-end-5 bg-neutral-800 rounded-2xl m-4 text-white p-3 flex flex-col">
            <div className='flex justify-between'>
                <p className='font-bold'>Budget</p>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
            <div className='flex flex-col flex-1 justify-between my-2 '>
                <p className='text-3xl font-bold'>250€<span className="text-primary">/mois</span></p>

                <div>
                    <div className='flex justify-between'>
                        <p>Sorties</p>
                        <p className='text-success'>25.74/100€</p>
                    </div>
                    <div className=' flex justify-between'>
                        <p>Fast-food</p>
                        <p className='text-error'>75.50/50€</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Achat</p>
                        <p className='text-success'>27/100€</p>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <p>Total</p>
                    <p className='text-success'>127.04/250€</p>
                </div>
            </div>
            <div></div>
        </section >
    );
}

export default Budget;
