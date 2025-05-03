import { model, Schema } from "mongoose"
import { UserBookReservationModel } from "../models/UserBookReservationModel"

const schema = new Schema<UserBookReservationModel>({
    bookID:{ type: Schema.Types.ObjectId, ref: 'Book'},
    userID:{ type: Schema.Types.ObjectId, ref: 'User'},
    startDay : Date,
    endDay:Date,
    totalPrice:Number,
    isPayment:Boolean,
}) 


export const UserBookReservation = model<UserBookReservationModel>("UserBookReservation",schema) 