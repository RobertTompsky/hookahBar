import { FC } from "react";
import NewReservation from "./NewReservation";
import ReservationsList from "./ReservationsList";



const ReservationsBar: FC = () => {
    return (
        <section
            className="flex flex-col p-8 
            w-1/3 justify-between h-full">
            <div className="flex flex-col h-4/6">
                <h1 className="self-center text-3xl 
                    font-bold text-zinc-800">
                    СПИСОК БРОНИ
                </h1>
                <ReservationsList />
            </div>
            <NewReservation />
        </section>
    );
};

export default ReservationsBar;