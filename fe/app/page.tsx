import MostPickedList from "@/components/MostPickedList";
import ReservationComponent from "@/components/ReservationComponent";
import { Button } from "@mui/material";
import { Backpack, Camera, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto mt-20  " >
      <div className="flex h-[55vh] " >

        <div className="w-1/2 flex flex-col mt-10 gap-8 " >
          <h2 className="text-4xl text-wrap font-bold w-2/3 " >Forget Busy Work , Start Next Vacation</h2>
          <p className="w-1/2 text-gray-400 text-xl" >We provide what you need to enjoy your holiday with family. Time to make another memorable moments. </p>
          <div>
            <Button variant="contained" LinkComponent={"a"} href="/hotels" className="me-auto" >Showe More</Button>
          </div>
          <div className="text-gray-500 flex justify-around" >
            <div className="flex flex-col gap-2">
              <Backpack size={40} color="black" />
              <p className="text-sm" ><span className="text-black font-bold text-lg" >2500</span> Users</p>
            </div>

            <div className="flex flex-col gap-2">
              <Camera  size={40} color="black"/>
              <p className="text-sm" ><span className="text-black font-bold text-lg">200</span> treasure</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <MapPin  size={40} color="black"/>
              <p className="text-sm" ><span className="text-black font-bold text-lg">1</span> Cities</p>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="w-full h-full " >
            <img src="/images/hotel_home_image.png" alt="Room" className="w-full h-full rounded-tl-[10rem]" /> 
          </div>
        </div>
      </div>

      <div>
        {/* <ReservationComponent/> */}
      </div>

      <div>
        <MostPickedList/>
      </div>

    </div>  
  );
}
