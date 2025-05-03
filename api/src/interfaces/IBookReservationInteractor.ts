import { UserBookReservationModel } from "../models/UserBookReservationModel"

export interface IBookReservationInteractor{
    addReservation(data:UserBookReservationModel):Promise<UserBookReservationModel | null>
    deleteReservation(id:string):Promise<Boolean | null>
    updateReservation({id,data}:{id:string,data: UserBookReservationModel}):Promise<UserBookReservationModel | null>
    getUserReservationList(userID:string):Promise<UserBookReservationModel[] | null>
    // getReservation(data:UserBookReservationModel):Promise<UserBookReservationModel | null>
    reservationDateControl(bookID:string):Promise<any | null>

}