import { UserBookReservation } from "../entities/UserBookReservation";
import { IBookReservationRepository } from "../interfaces/IBookReservationRepository";
import { UserBookReservationModel } from "../models/UserBookReservationModel";

export class bookReservationRepository implements IBookReservationRepository{
    
    async addReservation(data: UserBookReservationModel): Promise<UserBookReservationModel | null> {
        return await UserBookReservation.create(data)
    }
    async deleteReservation(id: string): Promise<Boolean | null> {
        try{
            await UserBookReservation.deleteOne({_id:id})
            return true
        }catch(err){
            throw new Error(err as string)
        }
    }
    async updateReservation({id,data}:{id:string,data: UserBookReservationModel}): Promise<UserBookReservationModel | null> {
        return await UserBookReservation.findByIdAndUpdate({_id:id},data)
    }
    async getUserReservationList(userID: string): Promise<UserBookReservationModel[] | null> {
        return await UserBookReservation.find({userID:userID}).populate("bookID","images location price title")
    }
    reservationDateControl(bookID: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }

}