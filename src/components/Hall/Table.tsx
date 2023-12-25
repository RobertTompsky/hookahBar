import React, { useState } from 'react';

const Table = () => {
    const [openOrder, setOpenOrder] = useState<boolean>(false)

    return (
        <div className='bg-cyan-500 rounded-2xl p-4 flex flex-row w-1/3  '>
            <div className='' onClick={() => setOpenOrder((prev) => !prev)}>СТОЛ 1</div>
            {openOrder && <div>
                <p>Матье Балл</p>
                <p>18:00</p>
            </div>}
        </div>
    );
};

export default Table;