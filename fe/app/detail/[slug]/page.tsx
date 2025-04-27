import React from "react";
import HotelMiniImageCard from "@/components/HotelMiniImageCard";
import RoomFacilities from "@/components/RoomFacilities";
import { Button} from "@mui/material";
import ImageList from "@/components/ImageList";


export default async function Page({params}:any){
    const {slug} = await params;
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/book/singleBook/${slug}`)    
    const res:BookModel = await data.json()
    console.log(res.roomFacilities);
    
    
    if (!(data.ok)) return <p>ERROR</p>
    
    return(<div className="min-h-[50vh] max-w-7xl mx-auto mt-12 px-32" >

        {/* INFO */}
        <div className="relative flex items-center w-full" >
            <div className="flex gap-3">
                <span className="text-secondary" >Home</span>
                <span>/</span>
                <span className="text-primary" >Hotel Detail</span>
            </div>

            <div className="absolute left-0 right-0 flex flex-col items-center " >
                <h3 className="text-primary text-3xl font-bold" >{res.title}</h3>
                <p className="text-secondary" >{res.location}</p>
            </div>
        </div>
        {/* INFO--END */}


        {/* IMAGES */}
        <div className="mt-10 flex max-w-7xl h-96 gap-3 " >
            <ImageList images={res.images!} />
            
        </div>
        {/* IMAGES--END */}

        {/* DESCRIPTION */}
        <div className="mt-10 flex gap-10">
            <div className="w-2/3" >
                <h3 className="font-bold text-xl text-primary">About the placa</h3>
                <p>{res.description}</p>
        </div>
        {/* DESCRIPTION--END */}

            <div className="w-1/3 border-2 border-gray-200 flex flex-col justify-center px-16 py-10 gap-3 rounded-xl" >
                <h4 className="font-bold text-primary text-2xl ">Start Booking</h4>
                <p><span className="text-green-500 font-bold text-3xl " >${res.price}</span> <span className="text-secondary text-3xl " >per Day</span> </p>
                <Button variant="contained" className="" >Book Now!</Button>
            </div>
        </div>
        
        <div>
            <RoomFacilities {...res.roomFacilities}/>
        </div>
        
        {/* HOTEL CHOOSE */}
        <div className="mt-10">
            <h3 className="text-2xl font-bold text-primary" >Treasure to Choose</h3>
            <div className="flex flex-nowrap gap-3 overflow-y-hidden overflow-x-scroll py-3" >
                {/* <HotelMiniImageCard />
                <HotelMiniImageCard />
                <HotelMiniImageCard />
                <HotelMiniImageCard />
                <HotelMiniImageCard />
                <HotelMiniImageCard /> */}
            </div>
        </div>
        {/* HOTEL CHOOSE -- END */}
        
    </div>)
}