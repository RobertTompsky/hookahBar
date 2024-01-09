import { useEffect } from "react";
import { IReservation, ITable } from "../types/types";

export const useReservation = (freeTables: ITable[], setReservation: (value: React.SetStateAction<IReservation>) => void) => {
    useEffect(() => {
        setReservation(prevReservation => ({
            ...prevReservation,
            tableNumber: freeTables.length > 0 ? freeTables[0].tableNumber : 1,
        }));
    }, [freeTables]);
}
