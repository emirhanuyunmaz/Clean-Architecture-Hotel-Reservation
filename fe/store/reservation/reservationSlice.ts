import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs ,{ Dayjs } from 'dayjs'
const date = new Date() 
interface ReservationState {
  startDay:String | null,
  endDay:String | null,
  bookID:string | null,
  isPayment:boolean
}

const initialState: ReservationState = {
  bookID:null,
  startDay:dayjs(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`).toISOString(),
  endDay:dayjs(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`).toISOString(),
  isPayment:false,

}

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
      createReservation: (state, action: PayloadAction<ReservationState>) => {
        state.bookID = action.payload.bookID
        state.startDay = action.payload.startDay
        state.endDay = action.payload.endDay
        state.isPayment = action.payload.isPayment
      },
    },
  })
  
export const { createReservation } = reservationSlice.actions
  
export default reservationSlice.reducer