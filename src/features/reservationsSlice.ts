import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IReservation } from "../types/types";


interface reservesState {
    list: IReservation[]
}

const initialState: reservesState = {
    list: []
}

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<IReservation>) => {
            state.list.push(action.payload)
        },
        removeReservation: (state, action:PayloadAction<string>) => {
            state.list = state.list.filter((r)=> r.id !== action.payload)
        },
        updateReservation: (state, action:PayloadAction<IReservation>) => {
            const {id, fullname, time, tableNumber} = action.payload
            state.list = state.list.map((r) => r.id === id ? {...r, fullname, time, tableNumber} : r)
        },
        clearAllReservations: (state) => {
            state.list = []
        }
    }
})

export default reservationsSlice.reducer
export const {
    addReservation, 
    removeReservation, 
    updateReservation, 
    clearAllReservations} = reservationsSlice.actions