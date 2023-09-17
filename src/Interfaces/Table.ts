export interface ITable extends Document {
  tableNumber: number;
  orders: any[];
  amountDue: number;
}
