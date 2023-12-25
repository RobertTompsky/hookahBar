import { useState } from "react";
import { IReservation } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addReservation } from "../../features/reservationsSlice";
import { v4 as uuidv4 } from 'uuid'
import CustomButton from "../Custom/CustomButton";
import CustomInput from "../Custom/CustomInput";
import { TIME } from "../../utils/CreateArr";

const NewReservation = () => {
    const dispatch = useAppDispatch()
    const tables = useAppSelector(state => state.tables.list)
    const initialReservation: IReservation = {
        fullname: '',
        id: '',
        time: '',
        tableNumber: 0
    }
    const [reservation, setReservation] = useState(initialReservation)
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        const strOrNumValue: string | number = isNaN(Number(value))
            ? value
            : Number(value)
        setReservation({ ...reservation, [name]: strOrNumValue })
        console.log(reservation)
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (reservation.fullname && reservation.time && reservation.tableNumber) {
            dispatch(addReservation({ ...reservation, id: uuidv4() }))
            setReservation(initialReservation)
            console.log(reservation)
        } else {
            alert('Заполните поля')
        }
    }

    // можно будет еще добавить проверку на уже существующего гостя
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <CustomInput
                placeholder="Имя..."
                name="fullname"
                onChange={handleChange}
                value={reservation.fullname}
                customStyles="bg-slate-200 text-zinc-800" />
            <select
                className="p-1 rounded-md"
                name="time"
                value={reservation.time}
                onChange={handleChange}>
                {TIME.map((time, index) => (
                    <option key={index}>
                        {time}
                    </option>
                ))}
            </select>
            <select
                className="p-1 rounded-md"
                name="tableNumber"
                value={reservation.tableNumber}
                onChange={handleChange}>
                {tables.map((table) => (
                    <option key={table.tableNumber}>
                        {table.tableNumber}
                    </option>
                ))}
            </select>
            <CustomButton
                title="СОЗДАТЬ БРОНЬ"
                containerStyles="bg-cyan-500"
                textStyles="text-white"
            />
        </form>
    );
};

export default NewReservation;