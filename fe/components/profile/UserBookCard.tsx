import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Pen, Trash } from "lucide-react";
// bookID : {_id: '680e4be08b64b4c55ac3ae8f', images: Array(5), price: '20', title: 'Good Room'}
// endDay:"2025-04-06T21:00:00.000Z"
// isPayment:true
// startDay: "2025-04-05T21:00:00.000Z"
// totalPrice:20


export default function UserBookCard(data:userBookModel){
    const startDay = dayjs(data.startDay as string) 
    const endDay = dayjs(data.endDay as string)
    const totalDay = endDay.diff(startDay,"hours") / 24
    
    return(<div className="flex flex-col items-center w-64 border border-secondary rounded-xl">

        <div className="relative group p-1">
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${data.bookID.images.at(0)}`} alt="Book image" className="w-64 h-64 rounded-xl" />
            <div className="text-white  absolute bottom-2 ml-3">
                <p>{data.bookID.title}</p>
                <p>{data.bookID.location}</p>
            </div>
        </div>
        <div className=" relative mt-3 mb-3 px-2 flex flex-col gap-3">
            <div className="flex gap-3 ">
                <p>{startDay.format("MM/DD/YYYY")}</p>
                <p>-</p>
                <p>{endDay.format("MM/DD/YYYY")}</p>
            </div>

            <div>
                <p>{totalDay} Days</p>
            </div>

            <div>
                <p>{data.bookID.location}</p>
            </div>
            
            <div>
                <p>Total Payment : <span className="font-bold">${data.bookID.price}</span></p>
            </div>
            <div className="absolute flex gap-3 bottom-0 right-3">
                {/* <button className="hover:text-primary transition-all" ><Pen /></button> */}
                <button className="hover:text-primary transition-all" ><Trash /></button>
            </div>
        </div>

    </div>)
}