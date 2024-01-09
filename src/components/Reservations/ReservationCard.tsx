import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { removeReservation } from '../../features/reservationsSlice';
import { IReservation } from '../../types/types';
import EditReservation from './EditReservation';
import CustomButton from '../Custom/CustomButton';
import { clearTable, moveToTable } from '../../features/tableSlice';
import EditIcon from '../../assets/edit.svg'
import DeleteIcon from '../../assets/deleteIcon1.svg'
import MoveIcon from '../../assets/moveRight.svg'

interface ReservationCardProps {
    reservation: IReservation
}

const ReservationCard = ({ reservation: { id, fullname, time, tableNumber } }: ReservationCardProps) => {
    const [openDetails, setOpenDetails] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch(removeReservation(id))
        dispatch(clearTable(id))
    }

    const handleMove = () => {
        handleDelete()
        dispatch(moveToTable({
            tableNumber,
            id,
            fullname,
            time
        }))
    }

    const handleOpen = () => {
        setOpenDetails(true)
    }

    return (
        <div
            className="card bg-base-content shadow-md shadow-neutral
            p-4 rounded-2xl w-full gap-2">
            {!openDetails ? (
                <>
                    <div className='flex flex-row justify-between 
                    px-2 bg-secondary-content rounded-md 
                    font-bold text-zinc-800'>
                        <h2>{fullname.toUpperCase()}</h2>
                        <p>{time}</p>
                        <p>№{tableNumber}</p>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <CustomButton
                            icon={<EditIcon width={46} height={46} fill='white' />}
                            onClick={handleOpen}
                            containerStyles='btn-ghost border-2 w-1/4'
                        />
                        <CustomButton
                            icon={<DeleteIcon width={42} height={42} fill='white' />}
                            onClick={handleDelete}
                            containerStyles='btn-ghost border-2 w-1/4'
                        />
                        <CustomButton
                            icon={<MoveIcon width={38} height={38} fill='white' />}
                            onClick={handleMove}
                            containerStyles='btn-ghost border-2 w-1/4'
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