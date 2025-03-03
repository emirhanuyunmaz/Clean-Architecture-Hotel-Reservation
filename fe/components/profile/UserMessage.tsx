import { Button, TextField } from "@mui/material";
import { SendHorizontal } from "lucide-react";


export default function UserMessage(){
    return (<div className="" >

        <div className="flex gap-3 items-center pb-3">
            {/* <img src="https://randomuser.me/api/portraits/men/66.jpg" alt="Admin Image" className="w-16 h-16 rounded-full" /> */}
            <p className="text-2xl font-bold" >Support</p>
        </div>

        <div className="flex flex-col justify-between h-[75vh] border border-secondary rounded-xl p-3">
            <div className="flex flex-col">
                {/* send - message */}
                <div className="bg-primary text-white ms-auto px-5 py-2 rounded-l-xl rounded-tr-xl">
                    <p className="">Message text</p>
                    <p className="text-xs">12:30</p>
                </div>
                
                {/* get - message */}
                <div className="bg-primary text-white me-auto px-5 py-2 rounded-r-xl rounded-tl-xl">
                    <p className="">Message text</p>
                    <p className="text-xs text-end">12:30</p>
                </div>
            </div>

            <div className="w-full flex gap-3">
                <TextField label="Message" className="w-full" />
                <Button variant="contained" ><SendHorizontal /></Button>
            </div>
        </div>

    </div>)
} 