import React, { useState } from 'react';
import { IReservation } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateReservation } from '../../features/reservationsSlice';
import CustomInput from '../Custom/CustomInput';
import CustomButton from '../Custom/CustomButton';
import { TIME } from '../../utils/CreateArr';
import CustomSelect from '../Custom/CustomSelect';

interface EditReservationProps {
    reservation: IReservation,
    setOpenDetails: (value: React.SetStateAction<boolean>) => void
}

const EditReservation = ({ reservation: { id, fullname, time, tableNumber }, setOpenDetails }: EditReservationProps) => {
    const [updatedReservation, setUpdatedReservation] = useState<IReservation>({
        id,
        fullname,
        time,
        tableNumber
    })

    const dispatch = useAppDispatch()

    const tables = useAppSelector(state => state.tables.list)

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const { name, value } = e.target
        const strOrNumValue: string | number = isNaN(Number(value))
            ? value
            : Number(value)
        setUpdatedReservation({
            ...updatedReservation, [name]: strOrNumValue
        })
        console.log(updatedReservation)
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const isFilled = updatedReservation.fullname && updatedReservation.time && updatedReservation.tableNumber
        if (isFilled) {
            dispatch(updateReservation({ ...updatedReservation }))
            setOpenDetails(false)
        } else {
            alert("Заполните поля")
        }
        console.log(updatedReservation)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-row w-full gap-2'>
            <CustomInput
                name="fullname"
                onChange={handleChange}
                value={updatedReservation.fullname}
                customStyles="bg-zinc-50 text-zinc-800 w-1/4" />
            <CustomSelect
                name='time'
                value={updatedReservation.time}
                onChange={handleChange}
                options={TIME.map((time) => ({ value: time, title: time }))} />
            <select
                className="p-1 rounded-md"
                name="tableNumber"
                value={updatedReservation.tableNumber}
                onChange={handleChange}>
                {tables.map((table) => (
                    <option key={table.tableNumber}>
                        {table.tableNumber}
                    </option>
                ))}
            </select>
            <CustomButton
                title="ОК"
                containerStyles="bg-cyan-500 w-1/3"
                textStyles="text-white"
            />
        </form>
    );
};

export default EditReservation;