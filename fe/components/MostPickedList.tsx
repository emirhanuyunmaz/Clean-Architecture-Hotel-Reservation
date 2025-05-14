'use client'
import { useGetFindLocationBookQuery } from "@/store/book/bookApi";
import RoomImageCard from "./RoomImageCard";
import HotelMiniImageCard from "./HotelMiniImageCard";

export default function MostPickedList(){
    const getBookLocation = useGetFindLocationBookQuery("")
    
    return (<div className="mt-10 mb-4" >
        <div className="mb-4" >
            <h2 className="text-2xl text-primary ms-4" >Most Picked</h2>
        </div>
        <div className="flex">
            {getBookLocation.data?.length! > 0 ? getBookLocation.data?.map((book) => <HotelMiniImageCard key={book._id} {...book} /> ): <div className=""><p className="text-center font-bold text-xl">Books Not Found</p></div>}
        </div>
    </div>)
}