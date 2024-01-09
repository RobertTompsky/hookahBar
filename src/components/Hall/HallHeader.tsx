import CustomButton from '../Custom/CustomButton';
import { ITable } from '../../types/types';
import { useAppDispatch } from '../../app/hooks';
import { clearAllReservations } from '../../features/reservationsSlice';
import { clearAllTables } from '../../features/tableSlice';

interface HallHeaderProps {
    tables: ITable[]
}

const HallHeader = ({ tables }: HallHeaderProps) => {
    const dispatch = useAppDispatch()

    const onWorkTables = tables.filter(table => table.status === 'onWork')

    const total = tables.reduce((acc, table) => {
        return acc + table.order.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
    }, 0);

    const handleClearAll = () => {
        dispatch(clearAllReservations())
        dispatch(clearAllTables())
    }

    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div
                    className='flex flex-row gap-10 bg-info-content 
                w-4/5 px-4 py-2 rounded-xl'>
                    <p
                        className='text-xl font-semibold 
                        text-base-300'>
                            КОЛИЧЕСТВО ПОСЕТИТЕЛЕЙ: {onWorkTables.length}
                    </p>
                    <p
                        className='text-xl font-semibold 
                        text-base-300'>
                            ОБЩАЯ СУММА: {total} ₽.
                    </p>
                </div>
                <CustomButton
                    title='ОЧИСТИТЬ ВСЁ'
                    containerStyles=''
                    onClick={handleClearAll}
                />
            </div>
        </div>
    );
};

export default HallHeader;