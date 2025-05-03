interface BookPaymentModel{
    PaymentCard:{
        cardHolderName: string,
        cardNumber:string,
        expireMonth: string,
        expireYear: string,
        cvc: string,
        registerCard: any,
        cardAlias:string
    },
    Buyer:{
        name: string,
        surname: string,
        gsmNumber: string,
        email: string,
        identityNumber: string,
        registrationAddress: string,
        ip: string,
        city: string,
        country: string,
        zipCode: string
    }
    Price:{
        totalDay: number, 
        roomPrice: number,
        person:number,
    },
    Reservation:{
        startDay:string,
        endDay:string,
        bookID:string,
    }
}
