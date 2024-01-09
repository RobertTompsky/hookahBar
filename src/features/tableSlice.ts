import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReservation, ITable, OrderItem } from "../types/types";
import { TABLES } from "../utils/CreateArr";


export interface TableState {
    list: ITable[]
}

const initialState: TableState = {
    list: TABLES
};

const customerSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        reserveTable: (state, action: PayloadAction<{ tableNumber: number, id: string }>) => {
            const { id, tableNumber } = action.payload
            const table = state.list.find((table) => table.tableNumber === tableNumber)
            if (table) {
                table.id = id;
                table.status = 'reserved'
            }
        },
        clearTable: (state, action: PayloadAction<string>) => {
            const table = state.list.find((table) => table.id === action.payload)
            if (table) {
                table.id = '';
                table.status = 'free'
                table.time = ''
                table.fullname = ''
                table.order = []
            }
        },
        moveToTable: (state, action: PayloadAction<IReservation>) => {
            const { id, tableNumber, time, fullname } = action.payload
            const table = state.list.find((table) => table.tableNumber === tableNumber)
            console.log(state.list);
            console.log(table)
            if (table) {
                table.status = 'onWork'
                table.id = id
                table.fullname = fullname
                table.time = time
            }
        },
        clearAllTables: (state) => {
            state.list = initialState.list
        },
        addItemToOrder: (state, action: PayloadAction<{tableNumber: number, item: OrderItem}>) => {
            const {tableNumber, item} = action.payload
            const table = state.list.find((table) => table.tableNumber === tableNumber)
            if (table && table.status === 'onWork') {
                const existingItem = table.order.find(i => i.name === item.name)
                if (existingItem) {
                    existingItem.quantity += item.quantity
                } else {
                    table.order.push(item)
                }
            }
        },
        removeItemFromOrder: (state, action: PayloadAction<{tableNumber: number, itemName: string}>) => {
            const {tableNumber, itemName} = action.payload
            const table = state.list.find((table) => table.tableNumber === tableNumber)
            if (table && table.status === 'onWork') {
                const updOrder = table.order.filter(i => i.name !== itemName)
                table.order = updOrder
            }
        }
    }
})


export default customerSlice.reducer
export const { 
    reserveTable, 
    moveToTable, 
    clearTable, 
    addItemToOrder, 
    removeItemFromOrder, 
    clearAllTables } = customerSlice.actions