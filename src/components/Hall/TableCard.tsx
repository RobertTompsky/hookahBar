import CustomInput from '../Custom/CustomInput';
import CustomButton from '../Custom/CustomButton';
import { ITable } from '../../features/tableSlice';
import { useAppDispatch } from '../../app/hooks';
import { useState } from 'react';

interface TableCardProps {
    table: ITable
}

const CustomerCard = ({table}: TableCardProps) => {
    const dispatch = useAppDispatch()
    const [tableOrder, setTableOrder] = useState('')

    return (
        <div className='p-6 bg-amber-700 w-1/3'>
            <p>{table.fullname}</p>
            <div>
                <div>{table.tableNumber}</div>
                <div>{table.time}</div>
            </div>
        </div>
    );
};

export default CustomerCard;