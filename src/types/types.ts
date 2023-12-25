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
    order: string[],
}