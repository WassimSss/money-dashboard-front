import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface MiniCardProps {
    icon: IconProp,
    name: string,
    money: number,
    active?: boolean
}

const MiniCard: React.FC<MiniCardProps> = ({ icon, name, money, active }) => {
    return (
        <div className={`${active ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-neutral-800'} w-40 h-40 m-8 p-3 rounded-2xl text-white flex flex-col`}>
            <div className='flex justify-end'>
                <span>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </span>
            </div>
            <div className="flex flex-1 flex-col justify-around">
                <div className='bg-white-opacity rounded-full w-10 h-10 flex justify-center items-center p-2'>
                    <span className='text-center w-full'>
                        <FontAwesomeIcon icon={icon} />
                    </span>
                </div>


                <p>{name}</p>

                <p className='font-bold'>{String(money)}€</p>
            </div>
        </div>
    );
}

export default MiniCard;
