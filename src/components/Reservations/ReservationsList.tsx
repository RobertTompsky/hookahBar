import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import ReservationCard from './ReservationCard';

const ReservationsList: FC = () => {
    const reservations = useAppSelector((state) => state.reservations.list)
    return (
        <nav className="mt-3 overflow-auto flex flex-col gap-4">
            {reservations.map((reservation) => (
                <ReservationCard
                    key={reservation.id}
                    reservation={reservation} />
            ))}
        </nav>
    );
};

export default ReservationsList;