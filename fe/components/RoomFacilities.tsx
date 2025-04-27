import { Bath, BedDouble, ParkingMeter, Refrigerator, Tv, Usb, UtensilsCrossed, Wifi } from "lucide-react";


export default function RoomFacilities(data:RoomFacilitiesModel){
    // console.log("DATA:::",data);
    
    return (<div className="flex justify-around mt-10 py-10 border-2 rounded-xl border-gray-300">
        
        {data.bedroom.active && <div className="flex flex-col items-center" >
            <BedDouble />
            <p className="text-secondary" ><span className="text-primary font-bold" >{data.bedroom.value}</span> Bedroom </p>
        </div>}

        {data.livingRoom.active && <div className="flex flex-col items-center" >
            <ParkingMeter />
            <p className="text-secondary" ><span className="text-primary font-bold" >{data.livingRoom.value}</span> Living room </p>
        </div>}

        {data.bathroom.active && <div className="flex flex-col items-center" >
            <Bath />
            <p className="text-secondary" ><span className="text-primary font-bold" >{data.bathroom.value}</span> Bathroom </p>
        </div>}

        {data.diningRoom.active && <div className="flex flex-col items-center" >
            <UtensilsCrossed />
            <p className="text-secondary" ><span className="text-primary font-bold" >{data.diningRoom.value}</span> Dining Room</p>
        </div>}

        {data.wifiSpeed.active && <div className="flex flex-col items-center" >
            <Wifi />
            <p className="text-secondary" ><span className="text-primary font-bold" >{data.wifiSpeed.value}</span> mbp/2 </p>
        </div>}

        {data.unityReady.active && <div className="flex flex-col items-center" >
            <Usb />
            <p className="text-secondary" ><span className="text-primary font-bold" >{data.unityReady.value}</span> Unit Ready </p>
        </div>}

        {data.refrigerator.active && <div className="flex flex-col items-center" >
            <Refrigerator />
            <p className="text-secondary" ><span className="text-primary font-bold" >{data.refrigerator.value}</span> Refrigerator </p>
        </div>}

        {data.tv.active  && <div className="flex flex-col items-center" >
            <Tv />
            <p className="text-secondary" ><span className="text-primary font-bold" >{data.tv.value}</span> Television</p>
        </div>}

    </div>)
} 