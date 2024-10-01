export interface IOrder {
    date: Date;
    cpf: string,
    paymentMethod: string;
    itemCount: number;
    totalValue: number;
}
  