import { ITable } from '../../types/types';
import CustomButton from '../Custom/CustomButton';
import DeleteIcon from '../../assets/deleteIcon1.svg'
import { useAppDispatch } from '../../app/hooks';
import { clearTable } from '../../features/tableSlice';
import { statusColors } from '../../utils/statusColors';
import OrderInfo from './OrderInfo';
import { useState } from 'react';

interface TableCardProps {
    table: ITable,
}

const TableCard = ({ table }: TableCardProps) => {
    const [openOrderInfo, setOpenOrderInfo] = useState(false)
    const dispatch = useAppDispatch()
    const isOnWork: boolean = table.status === 'onWork'
    const statusColor: string = statusColors[table.status]

    const handleDelete = () => {
        dispatch(clearTable(table.id))
    }

    const total = table.order.map(item => item.quantity * item.price).reduce((acc, value) => acc + value, 0);
    
    return (
        <div className='bg-neutral-content card p-6 flex flex-col h-44 shadow-inner gap-4 justify-between'>
            {!openOrderInfo ? (
                <>
                    <div className='flex flex-row justify-between items-center z-0'>
                        <div className={`${statusColor} px-1 py-1 text-base-100 
                    rounded-md font-bold w-1/6 text-center text-xl`}>
                            {table.tableNumber}
                        </div>
                        <div className='text-2xl text-neutral bg-base-100 px-4 
                    rounded-md shadow-md'>
                            {table.fullname.toUpperCase()}
                        </div>
                    </div>
                    {isOnWork &&
                        <div className='flex flex-col'>
                            <div className='flex flex-row items-center mb-0.5'>
                                <div className='text-2xl text-neutral self-center w-1/2 text-center'>
                                    {table.time}
                                </div>
                                <div className='text-2xl text-neutral font-bold w-1/2 text-end'>
                                    {total} ₽.
                                </div>
                            </div>
                            <div className='flex flex-row w-full justify-between'>
                                <CustomButton
                                    onClick={() => setOpenOrderInfo(true)}
                                    title='ЗАКАЗ'
                                    containerStyles='btn-neutral w-1/2 shadow-md'
                                    textStyles='text-lg' />
                                <CustomButton
                                    icon={<DeleteIcon
                                        width={30}
                                        height={30} />}
                                    containerStyles='btn-active w-1/3 shadow-md '
                                    onClick={handleDelete} />
                            </div>
                        </div>
                    }
                </>
            ) : (
                <OrderInfo table={table} setOpenOrderInfo={setOpenOrderInfo}/>
            )}


        </div>
    );
};

export default TableCard;