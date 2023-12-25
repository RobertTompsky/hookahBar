import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tables } from "../data/data";
import { ITable } from "../types/types";


export interface TableState {
    list: ITable[]
}

const initialState: TableState = {
    list: Tables,
  };

const customerSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        assignToTable: (state, action: PayloadAction<{tableNumber: number; id: string; fullname: string; time: string}>) => {
            const { fullname, id, time, tableNumber } = action.payload
            const table = state.list.find((table) => table.tableNumber === tableNumber)
            console.log(state.list);
            console.log(table)
            if (table) {
                table.fullname = fullname;
                table.id = id;
                table.time = time;
            }
            console.log(state.list);
        },
    }
})

export default customerSlice.reducer
export const { assignToTable } = customerSlice.actions