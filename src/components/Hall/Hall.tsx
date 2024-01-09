import { useAppSelector } from '../../app/hooks';
import HallHeader from './HallHeader';
import TableCard from './TableCard';

const Hall = () => {
    const tables = useAppSelector(state => state.tables.list)

    return (
        <section className='w-2/3 h-full p-8 flex flex-col gap-4'>
            <HallHeader tables={tables}/>
            <div className='grid grid-cols-3 gap-6 h-5/6'>
                {tables.map((table) => (
                    <TableCard table={table} key={table.tableNumber} />
                ))}
            </div>
        </section>

    );
};

export default Hall;