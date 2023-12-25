import { useAppSelector } from '../../app/hooks';
import TableCard from './TableCard';

const Hall = () => {
    const tables = useAppSelector(state => state.tables.list)
    return (
        <div className='w-2/3 p-8 flex flex-wrap gap-3'>
            {tables.map((table)=> (
                <TableCard table={table} key={table.tableNumber}/>
            ))}

        </div>
    );
};

export default Hall;