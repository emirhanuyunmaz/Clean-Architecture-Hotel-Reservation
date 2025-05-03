import Iyzipay, { PaymentRequestData } from "iyzipay";
import dotenv from "dotenv"
import { IRoomPricePayment } from "../interfaces/IRoomPricePayment";
import { BookPaymentModel } from "../models/PaymentModel";
dotenv.config(); 


export class RoomPricePayment implements IRoomPricePayment{
    
    async totalPayment(data :BookPaymentModel): Promise<Boolean> {        
        
        var iyzipay = new Iyzipay({
            apiKey: process.env.NEXT_PUBLIC_IYZICO_API_KEY!,
            secretKey: process.env.NEXT_PUBLIC_IYZICO_SECRET_KEY!,
            uri: 'https://sandbox-api.iyzipay.com'
        });

        var request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: '123456789',
            price: data.Price.person * data.Price.roomPrice * data.Price.totalDay ,
            paidPrice: data.Price.person * data.Price.roomPrice * data.Price.totalDay ,
            currency: Iyzipay.CURRENCY.TRY,
            installments: 1,
            basketId: 'B67832',
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            paymentCard: {
                cardHolderName: data.Buyer.name + " " + data.Buyer.surname,
                cardNumber: data.PaymentCard.cardNumber,
                expireMonth: data.PaymentCard.expireMonth,
                expireYear: data.PaymentCard.expireYear,
                cvc: data.PaymentCard.cvc,
                registerCard: undefined,
                cardAlias:"1"
            },
            buyer: {
                id: 'BY789',
                name: data.Buyer.name,
                surname: data.Buyer.surname,
                gsmNumber: data.Buyer.gsmNumber,
                email: data.Buyer.email,
                identityNumber: data.Buyer.identityNumber,
                // lastLoginDate: '2015-10-05 12:43:35',
                // registrationDate: '2013-04-21 15:12:09',
                registrationAddress: data.Buyer.registrationAddress,
                ip: '85.34.78.112',
                city: data.Buyer.city,
                country: data.Buyer.country,
                zipCode: data.Buyer.zipCode
            },
            shippingAddress: {
                contactName:  data.Buyer.name + " " +  data.Buyer.surname,
                city:  data.Buyer.city,
                country:  data.Buyer.country,
                address:  data.Buyer.registrationAddress,
                zipCode:  data.Buyer.zipCode
            },
            billingAddress: {
                contactName:  data.Buyer.name + " " +  data.Buyer.surname,
                city:  data.Buyer.city,
                country:  data.Buyer.country,
                address:  data.Buyer.registrationAddress,
                zipCode:  data.Buyer.zipCode
            },
            basketItems: [
                {
                    id: 'BI101',
                    name: 'Room',
                    category1: 'Holiday',
                    category2: 'Hotel',
                    itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                    price: data.Price.person * data.Price.roomPrice * data.Price.totalDay 
                },
                
            ]
        };

         const result = await new Promise((resolve,reject) => {
            iyzipay.payment.create(request, function (err, result) {
                if (result.status === "success") {                    
                    resolve(true)
                }else{
                    resolve(false)
                }
            });
         })

        return result as Boolean
    }
    
}