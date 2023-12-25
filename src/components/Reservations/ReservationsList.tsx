import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import ReservationCard from './ReservationCard';

const ReservationsList: FC = () => {
    const reservations = useAppSelector((state) => state.reservations.list)
    return (
        <div className="overflow-auto flex flex-col gap-2">
            {reservations.map((reservation) => (
                <ReservationCard
                    key={reservation.id}
                    reservation={reservation} />
            ))}
        </div>
    );
};

export default ReservationsList;