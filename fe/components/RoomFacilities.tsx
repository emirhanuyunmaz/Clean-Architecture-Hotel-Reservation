import { Bath, BedDouble, ParkingMeter, Refrigerator, Tv, Usb, UtensilsCrossed, Wifi } from "lucide-react";


export default function RoomFacilities(){
    return (<div className="flex justify-around mt-10 py-10 border-2 rounded-xl border-gray-300">
        
        <div className="flex flex-col items-center" >
            <BedDouble />
            <p className="text-secondary " ><span className="text-primary font-bold" >1</span> Bedroom </p>
        </div>

        <div className="flex flex-col items-center" >
            <ParkingMeter />
            <p className="text-secondary" ><span className="text-primary font-bold" >1</span> Living room </p>
        </div>

        <div className="flex flex-col items-center" >
            <Bath />
            <p className="text-secondary" ><span className="text-primary font-bold" >1</span> Bathroom </p>
        </div>

        <div className="flex flex-col items-center" >
            <UtensilsCrossed />
            <p className="text-secondary" ><span className="text-primary font-bold" >1</span> Dining Room</p>
        </div>

        <div className="flex flex-col items-center" >
            <Wifi />
            <p className="text-secondary" ><span className="text-primary font-bold" >10</span> mbp/2 </p>
        </div>

        <div className="flex flex-col items-center" >
            <Usb />
            <p className="text-secondary" ><span className="text-primary font-bold" >1</span> Unit Ready </p>
        </div>

        <div className="flex flex-col items-center" >
            <Refrigerator />
            <p className="text-secondary" ><span className="text-primary font-bold" >1</span> Refrigerator </p>
        </div>

        <div className="flex flex-col items-center" >
            <Tv />
            <p className="text-secondary" ><span className="text-primary font-bold" >1</span> Television</p>
        </div>

    </div>)
} 