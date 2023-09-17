import { OrderType } from "../Utils/types";

export interface IOrder extends Document {
  orderNumber: number;
  tableNumber: number;
  menu: any;
  quantity: number;
  memo: string;
  forceMenu: string;
  forcePrice: number;
  isFree: boolean;
  status: OrderType;
  orderedServer: string;
  createdAt: string;
}
