import { Button } from "@mui/material";
import { Check } from "lucide-react";


export default function Page(){
    return(<div className="min-h-[75vh] max-w-7xl mx-auto flex flex-col justify-center items-center ">
    
        <div className="absolute " >
            <img src="/images/succes_bg.png" className="w-full h-full"  alt="" />
        </div>
        <div className="bg-white bg-opacity-75 z-10 flex flex-col justify-center items-center px-10 py-10 rounded-xl gap-5" >
            <div className="" >
                <h2 className="text-2xl font-bold" >HOTEL RESERVATION</h2>
            </div>

            <div className="bg-primary rounded-full" >
                <Check size={48} color="white" />
            </div>
            
            <div>
                <h2 className="text-3xl font-bold text-primary" >ACCOUNT CREATED SUCCESSFULL</h2>
            </div>
            
            <div>
                <p className="text-xl font-bold text-primary" >Please Check Your Email</p>
            </div>
            
            <div>
                <Button variant="contained" >BOOK NOW</Button>
            </div>
        </div>

    </div>)
} 