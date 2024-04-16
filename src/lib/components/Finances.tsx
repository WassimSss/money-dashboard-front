import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Finances: React.FC = () => {
    return (
        <div id="Finances" className=" row-start-3 row-end-4 col-start-1 col-end-3 bg-neutral-800 rounded-2xl m-4 text-white p-3 flex flex-col">
            <div className='flex justify-between'>
                <p className='font-bold'>Finances</p>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
        </div >
    );
}

export default Finances;
