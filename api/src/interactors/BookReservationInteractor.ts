import { inject, injectable } from "inversify";
import { IBookReservationInteractor } from "../interfaces/IBookReservationInteractor";
import { IBookReservationRepository } from "../interfaces/IBookReservationRepository";
import { UserBookReservationModel } from "../models/UserBookReservationModel";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class BookReservationInteractor implements IBookReservationInteractor{
    
    private repository:IBookReservationRepository
    
    constructor(
        @inject(INTERFACE_TYPE.BookReservationRepository) repository: IBookReservationRepository,
    ) {
        this.repository = repository
    }

    async addReservation(data: UserBookReservationModel): Promise<UserBookReservationModel | null> {
        return await this.repository.addReservation(data) 
    }
    async deleteReservation(id: string): Promise<Boolean | null> {
        return await this.repository.deleteReservation(id)
    }
    async updateReservation({ id, data }: { id: string; data: UserBookReservationModel; }): Promise<UserBookReservationModel | null> {
        return await this.repository.updateReservation({id:id,data:data})
    }
    async getUserReservationList(userID: string): Promise<UserBookReservationModel[] | null> {
        return await this.repository.getUserReservationList(userID) 
    }
    async reservationDateControl(bookID: string): Promise<any | null> {
        return await this.repository.reservationDateControl(bookID)
    }



}