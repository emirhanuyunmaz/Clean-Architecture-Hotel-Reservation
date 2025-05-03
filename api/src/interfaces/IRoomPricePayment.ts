import { BookPaymentModel } from "../models/PaymentModel";

export interface IRoomPricePayment{
    // ücret ödeme işlemi kontrolü ve buna göre true / false değer .
    totalPayment(data:BookPaymentModel):Promise<Boolean>
}