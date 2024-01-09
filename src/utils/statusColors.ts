import { Status } from "../types/types";

export type StatusColorType = {
    [key in Status]: string
}

export const statusColors: StatusColorType = {
    free: 'bg-success',
    reserved: 'bg-warning',
    onWork: 'bg-error'
}