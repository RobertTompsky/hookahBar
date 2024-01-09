export interface IReservation {
    id: string,
    fullname: string,
    time: string,
    tableNumber: number
}

export interface ITable {
    id: string,
    fullname: string,
    time: string,
    tableNumber: number,
    order: OrderItem[],
    status: Status
}

export type Status = 'free'| 'reserved' | 'onWork'

export type OrderItem = {
    name: string,
    quantity: number,
    price: number,
}