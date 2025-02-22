import HotelMiniImageCard from "@/components/HotelMiniImageCard";
import RoomFacilities from "@/components/RoomFacilities";
import { Button } from "@mui/material";


export default function Page(){
    return(<div className="min-h-[50vh] max-w-7xl mx-auto mt-12 px-32" >
        
        {/* INFO */}
        <div className="relative flex items-center w-full" >
            <div className="flex gap-3">
                <span className="text-secondary" >Home</span>
                <span>/</span>
                <span className="text-primary" >Hotel Detail</span>
            </div>

            <div className="absolute left-0 right-0 flex flex-col items-center " >
                <h3 className="text-primary text-3xl font-bold" >Blue Origin Fams</h3>
                <p className="text-secondary" >Galle , Siri Lanka</p>
            </div>
        </div>

        {/* IMAGES */}
        <div className="mt-10 flex w-full gap-3 " >
            <img src={`/images/hotel_image_2.png`} alt="Hotel Image"  className="w-3/5 h-96 border-2 rounded-xl" />
            <div className="flex flex-col w-2/5 justify-between ">
                <img src={`/images/hotel_image_3.png`} alt="Hotel Image"  className="w-full h-44 border-2 rounded-xl " />
                <img src={`/images/hotel_image_4.png`} alt="Hotel Image"  className="w-full h-44 border-2 rounded-xl " />
            </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 flex gap-10">
            <div className="w-2/3" >
                <h3 className="font-bold text-xl text-primary">About the placa</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates provident commodi totam voluptatem! Unde natus dignissimos ipsum magni excepturi delectus odio eum ullam amet commodi! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci quis, nobis dolore doloremque debitis natus ullam vero, veritatis aliquid cumque sint error tempora neque magni.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas illum dolorum cumque consectetur. Minima necessitatibus accusantium atque sit, numquam enim rem iste dignissimos laborum obcaecati corrupti dolores deleniti quae modi adipisci facilis aliquid consequuntur dolorem quia esse pariatur distinctio at.
                </p>
            </div>

            <div className="w-1/3 border-2 border-gray-200 flex flex-col justify-center px-16 py-10 gap-3 rounded-xl" >
                <h4 className="font-bold text-primary text-2xl ">Start Booking</h4>
                <p><span className="text-green-500 font-bold text-3xl " >$200</span> <span className="text-secondary text-3xl " >per Day</span> </p>
                <Button variant="contained" className="" >Book Now!</Button>
            </div>
        </div>
        <div>
            <RoomFacilities/>
        </div>

        <div className="mt-10">
            <h3 className="text-2xl font-bold text-primary" >Treasure to Choose</h3>
            <div className="flex flex-nowrap gap-3 overflow-y-hidden overflow-x-scroll py-3" >
                <HotelMiniImageCard />
                <HotelMiniImageCard />
                <HotelMiniImageCard />
                <HotelMiniImageCard />
                <HotelMiniImageCard />
                <HotelMiniImageCard />
            </div>
        </div>

    </div>)
}