import CustomButton from '../Custom/CustomButton';
import DeleteIcon from '../../assets/deleteIcon1.svg'
import OkIcon from '../../assets/ok.svg'
import { ORDERITEMS } from '../../utils/CreateArr';
import { ITable, OrderItem } from '../../types/types';
import { addItemToOrder, removeItemFromOrder } from '../../features/tableSlice';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import BackIcon from '../../assets/back.svg'
import Minus from '../../assets/minus.svg'
import Plus from '../../assets/plus.svg'

interface OrderInfoProps {
    table: ITable,
    setOpenOrderInfo: (value: React.SetStateAction<boolean>) => void
}

const OrderInfo = ({ table: { tableNumber, order }, setOpenOrderInfo }: OrderInfoProps) => {
    const dispatch = useAppDispatch()
    const [Qty, setQty] = useState<number>(1)
    const [product, setProduct] = useState<OrderItem>({
        name: ORDERITEMS[0].name,
        quantity: Qty,
        price: 1000
    })

    const total = order.map(item => item.quantity * item.price).reduce((acc, value) => acc + value, 0);

    const handleChangeQty = (operation: string) => {
        if (operation === 'decrease' && Qty > 1) {
            setQty((prev: number) => prev - 1)
        } else if (operation === 'increase') {
            setQty((prev: number) => prev + 1)
        }
    }
    
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const { name, value } = e.target
        const strOrNumValue: string | number = Number(value) || value
        console.log({ ...product, [name]: strOrNumValue })
        setProduct({ ...product, [name]: strOrNumValue })
    }

    const handleSubmit = () => {
        const selectedItem = ORDERITEMS.find(item => item.name === product.name)
        if (selectedItem) {
            dispatch(addItemToOrder({
                tableNumber, item: {
                    name: product.name,
                    price: selectedItem.price,
                    quantity: Qty
                }
            }))
        }
    }

    const handleDeleteItem = (itemName: string) => {
        dispatch(removeItemFromOrder({
            tableNumber,
            itemName
        }))
    }


    return (
        <div className='bg-neutral-content flex flex-col h-48 z-10 gap-1 justify-between'>
            <div className='flex flex-row justify-between items-center bg-neutral rounded-md text-xs w-5/6 px-2'>
                <p className={`text-base-100 rounded-md font-semibold w-1/2 `}>Позиция</p>
                <p className='text-base-100 rounded-md w-1/6 text-center'>Q</p>
                <p className={`text-base-100 font-semibold w-2/6 text-center`}>Цена</p>
            </div>
            <nav className='bg-base-100 rounded-md pl-2 flex flex-col overflow-auto h-12 text-xs'>
                {order.map((item) => (
                    <div className='flex flex-row justify-between items-center' key={item.name}>
                        <div className='flex flex-row justify-between w-5/6'>
                            <p className={`rounded-md font-semibold w-1/2`}>{item.name}</p>
                            <p className='rounded-md w-1/6 text-center '>{item.quantity}</p>
                            <p className={`font-semibold w-2/6 text-center`}>{item.quantity * item.price} ₽.</p>
                        </div>
                        <CustomButton
                            onClick={() => handleDeleteItem(item.name)}
                            containerStyles='btn-xs btn-ghost'
                            icon={<DeleteIcon
                                width={16}
                                height={16} />} />
                    </div>
                ))}
            </nav>
            <div className='flex w-full justify-between items-center gap-2'>
                <select
                    className='w-2/3 px-1 text-sm rounded-lg'
                    name='name'
                    value={product.name}
                    onChange={handleChange}>
                    {ORDERITEMS.map((item) => (
                        <option key={item.name}>{item.name}</option>
                    ))}
                </select>
                <div className='flex flex-row items-center w-1/3 justify-between font-bold'>
                    <CustomButton
                        icon={<Minus width={16} height={16} />}
                        containerStyles='btn-xs btn-ghost w-1/3'
                        onClick={() => handleChangeQty('decrease')} />
                    <p className='text-sm w-1/3 text-center'>{Qty}</p>
                    <CustomButton
                        icon={<Plus width={16} height={16} />}
                        containerStyles='btn-xs btn-ghost w-1/3'
                        onClick={() => handleChangeQty('increase')} />
                </div>
            </div>
            <div className='flex w-full justify-between items-center'>
                <CustomButton
                    onClick={handleSubmit}
                    icon={<OkIcon
                        width={20}
                        height={20} />}
                    containerStyles='btn-xs btn-ghost w-1/5 shadow-md' />
                <p className='w-3/5 text-center font-semibold'>Итог: {total} ₽.</p>
                <CustomButton
                    onClick={() => setOpenOrderInfo(false)}
                    icon={<BackIcon
                        width={24}
                        height={24} />}
                    containerStyles='btn-xs btn-ghost w-1/5 shadow-md' />

            </div>
        </div>
    );
};

export default OrderInfo;