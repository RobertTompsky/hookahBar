import { useState } from "react";
import { IReservation } from "../../types/types";
import { useAppDispatch } from "../../app/hooks";
import { addReservation } from "../../features/reservationsSlice";
import { v4 as uuidv4 } from 'uuid'
import CustomButton from "../Custom/CustomButton";
import CustomInput from "../Custom/CustomInput";
import { filteredTime } from "../../utils/CreateArr";
import { reserveTable } from "../../features/tableSlice";
import { useFreeTables } from "../../hooks/useFreeTables";
import { useReservation } from "../../hooks/useReservation";
import CustomSelect from "../Custom/CustomSelect";

const NewReservation = () => {
    const dispatch = useAppDispatch()

    const freeTables = useFreeTables()
    const initialReservation: IReservation = {
        fullname: 'Гитлер',
        id: '',
        time: filteredTime[0],
        tableNumber: freeTables.length > 0 ? freeTables[0].tableNumber : 1
    }
    const [reservation, setReservation] = useState(initialReservation)
    useReservation(freeTables, setReservation)

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        const strOrNumValue: string | number = Number(value) || value
        console.log({ ...reservation, [name]: strOrNumValue })
        setReservation({ ...reservation, [name]: strOrNumValue })
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (reservation.fullname.length > 3) {
            const id = uuidv4()
            dispatch(addReservation({ ...reservation, id }))
            dispatch(reserveTable({ tableNumber: reservation.tableNumber, id }))
            setReservation(initialReservation)
        } else {
            alert('Заполните поля')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <CustomInput
                placeholder="Имя..."
                name="fullname"
                onChange={handleChange}
                value={reservation.fullname}
                customStyles="text-zinc-800 w-full" 
            />
            <CustomSelect
                customStyles="select select-sm w-full"
                name="time"
                value={reservation.time}
                onChange={handleChange}
                options={filteredTime.map((time) => (
                    {
                        value: time,
                        title: time
                    }
                ))} 
            />
            <CustomSelect
                customStyles="select select-sm w-full"
                name="tableNumber"
                value={reservation.tableNumber}
                onChange={handleChange}
                options={freeTables.map(({ tableNumber }) => (
                    {
                        value: tableNumber, 
                        title: tableNumber
                    }
                ))} 
            />
            <CustomButton
                title="СОЗДАТЬ БРОНЬ"
                containerStyles="btn-neutral w-full btn-sm"
                textStyles="text-white"
            />
        </form>
    );
};

export default NewReservation;