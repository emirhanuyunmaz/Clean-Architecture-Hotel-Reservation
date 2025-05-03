export interface UserBookReservationModel{
    bookID:String,
    userID:String,
    totalPrice:Number,
    isPayment:Boolean,
    startDay:Date,
    endDay:Date
}