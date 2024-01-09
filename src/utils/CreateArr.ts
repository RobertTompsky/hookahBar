import { ITable, OrderItem } from "../types/types";

export const TIME: string[] = Array.from({ length: 24 }, (_, index: number) => {
  const hour = index < 10 ? `0${index}` : `${index}`;
  return `${hour}:00`;
});

export const TABLES: ITable[] = Array.from({ length: 9 }, (_, i: number) => ({
  tableNumber: i + 1,
  fullname: "",
  id: "",
  time: "",
  order: [],
  status: "free",
}))

export const ORDERITEMS: OrderItem[] = Array.from({ length: 6 }, (_, i: number) => {
  const num = String(i + 1);
  return {
    name: `Товар ${num}`,
    quantity: 1,
    price: 1000 + (i * 100)
  }
})

export const currentTime = new Date().getHours();
export const filteredTime = TIME.filter(time => {
  const hour = parseInt(time.split(':')[0]);
  return hour > currentTime;
});