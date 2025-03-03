import { Button } from "@mui/material";
import { Pen, Trash } from "lucide-react";


export default function UserBookCard(){
    
    
    return(<div className="flex flex-col items-center w-64 border border-secondary rounded-xl">

        <div className="relative group p-1">
            <img src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI" alt="Book image" className="w-64 h-64 rounded-xl" />
            <div className="text-white  absolute bottom-2 ml-3">
                <p>Blue Origin Fams</p>
                <p>Galle , Sri Lanka</p>
            </div>
        </div>
        <div className=" relative mt-3 mb-3 px-2 flex flex-col gap-3">
            <div className="flex gap-3 ">
                <p>20 Jan</p>
                <p>-</p>
                <p>22 Jan</p>
            </div>

            <div>
                <p>02 Days</p>
            </div>

            <div>
                <p>Galle to Colombo Read 245 , Main Steet , Galle</p>
            </div>
            <div>
                <p>Initial Payment : <span className="font-bold">$200</span></p>
            </div>
            <div>
                <p>Total Payment : <span className="font-bold">$400</span></p>
            </div>
            <div className="absolute flex gap-3 bottom-0 right-3">
                <button className="hover:text-primary transition-all" ><Pen /></button>
                <button className="hover:text-primary transition-all" ><Trash /></button>
            </div>
        </div>

    </div>)
}