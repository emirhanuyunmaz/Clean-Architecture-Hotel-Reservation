import Link from "next/link";


export default function RoomImageCard(){
    
    return(<Link href={`/`} ><div className={`relative w-64 h-72 border-2 rounded-xl group`} >
        <div className="absolute w-full h-full rounded-xl ">
            <img src="/images/hotel_home_image.png" className="w-full h-full rounded-xl" alt="" />
        </div>
        <div className="flex absolute right-0 ">
            <p className="bg-primary text-white px-3 py-1 rounded-bl-xl rounded-tr-xl" >$50 per night</p>
        </div>
        <div className="absolute ms-4 -bottom-12 group-hover:bottom-2 duration-500" >
            <p className="text-white text-xl " >Blue Origin Farms</p>
            <p className="text-white" >Galle , Sri Lanka</p>
        </div>
    </div></Link>)
} 