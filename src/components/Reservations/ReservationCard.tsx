import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { removeReservation } from '../../features/reservationsSlice';
import { IReservation } from '../../types/types';
import EditReservation from './EditReservation';
import CustomButton from '../Custom/CustomButton';
import {assignToTable } from '../../features/tableSlice';

interface ReservationCardProps {
    reservation: IReservation
}

const ReservationCard = ({reservation: { id, fullname, time, tableNumber } }: ReservationCardProps) => {
    const [openDetails, setOpenDetails] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch(removeReservation(id))
    }

    const handleMove = () => {
        handleDelete()
        dispatch(assignToTable({
            id,
            fullname,
            time,
            tableNumber,
        }))
        console.log(assignToTable({
            id,
            fullname,
            time,
            tableNumber,
        }))
    }

    const handleOpen = () => {
        setOpenDetails(true)
    }

    return (
        <div
            className="bg-teal-300 flex flex-col 
            p-2 rounded-md w-full gap-2 shadow-lg">
            {!openDetails ? (
                <>
                    <div className='flex flex-row justify-between 
                    px-2 bg-zinc-50 rounded-md font-bold text-zinc-800'>
                        <h2>ИМЯ: {fullname}</h2>
                        <p>ВРЕМЯ: {time}</p>
                        <p>СТОЛ: {tableNumber}</p>
                    </div>
                    <div className='flex flex-row justify-between gap-4'>
                        <CustomButton
                            title='Изменить'
                            onClick={handleOpen}
                            containerStyles='bg-cyan-200 
                            text-zinc-800 w-1/3'
                        />
                        <CustomButton
                            title='Удалить'
                            onClick={handleDelete}
                            containerStyles='bg-rose-400 
                            text-zinc-50 w-1/3'
                        />
                        <CustomButton
                            title='В зал'
                            onClick={handleMove}
                            containerStyles='bg-green-400 
                            text-zinc-50 w-1/3'
                        />
                    </div>
                </>
            ) : (
                <EditReservation
                    reservation={{ id, fullname, time, tableNumber }}
                    setOpenDetails={setOpenDetails} />
            )}
        </div>
    );
};

export default ReservationCard;