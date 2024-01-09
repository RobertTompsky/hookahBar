import React, { useState } from 'react';
import { IReservation } from "../../types/types";
import { useAppDispatch } from '../../app/hooks';
import { updateReservation } from '../../features/reservationsSlice';
import CustomInput from '../Custom/CustomInput';
import CustomButton from '../Custom/CustomButton';
import { filteredTime } from '../../utils/CreateArr';
import CustomSelect from '../Custom/CustomSelect';
import { useFreeTables } from '../../hooks/useFreeTables';
import { useReservation } from '../../hooks/useReservation';
import OkIcon from '../../assets/ok.svg'
import { clearTable, reserveTable } from '../../features/tableSlice';
import { handleChange } from '../../utils/handleChangeUtil';

interface EditReservationProps {
    reservation: IReservation,
    setOpenDetails: (value: React.SetStateAction<boolean>) => void
}

const EditReservation = ({ reservation: { id, fullname, time, tableNumber }, setOpenDetails }: EditReservationProps) => {
    const [updatedReservation, setUpdatedReservation] = useState<IReservation>({
        id,
        fullname,
        time,
        tableNumber,
    })

    const dispatch = useAppDispatch()

    const freeTables = useFreeTables()
    useReservation(freeTables, setUpdatedReservation)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        handleChange(e, updatedReservation, setUpdatedReservation);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (updatedReservation.fullname.length > 3) {
            dispatch(updateReservation({ ...updatedReservation }))
            dispatch(clearTable(updatedReservation.id))
            dispatch(reserveTable({
                tableNumber: updatedReservation.tableNumber,
                id
            }))
            setOpenDetails(false)
        }
    }

    const freeTablesAndCur = freeTables.map(({ tableNumber }) => ({ value: tableNumber, title: tableNumber })).concat({ value: tableNumber, title: tableNumber })
    
    return (
        <form onSubmit={handleSubmit} className='flex flex-row w-full gap-2'>
            <CustomInput
                name="fullname"
                onChange={handleInput}
                value={updatedReservation.fullname}
                customStyles="bg-zinc-50 text-zinc-800 w-1/3"
            />
            <CustomSelect
            customStyles='bg-zinc-50 text-zinc-800 w-1/4'
                name='time'
                value={updatedReservation.time}
                onChange={handleInput}
                options={filteredTime.map((time) => ({ value: time, title: time }))}
            />
            <CustomSelect
                customStyles='w-1/4'
                name='tableNumber'
                value={updatedReservation.tableNumber}
                onChange={handleInput}
                options={freeTablesAndCur.sort((a, b) => a.value - b.value)}
            />
            <CustomButton
                icon={<OkIcon width={30} height={30} fill='white' />}
                containerStyles="btn-ghost btn-sm border-2 w-1/8 shadow-lg"
                textStyles="text-white"
            />
        </form>
    );
};

export default EditReservation;