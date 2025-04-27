import { Button } from "@mui/material";


export default function Footer(){
    return(<footer className="  border-t-2 border-gray-300 pt-10 mt-10" >
        <div className="max-w-7xl mx-auto flex justify-around" >
            
            <div className="w-1/2" >
                <h4 className="text-2xl font-bold" >Hotel</h4>
                <p className="text-gray-400 w-64 " >We kaboom your beauty holiday instantly and memorable.</p>
            </div>

            <div className="flex flex-col gap-3" >
                <h5 className="font-bold text-xl " >Become hotel Owner</h5>
                <Button href="/register" variant="contained" >Register Now</Button>
            </div>

        </div>
        <div className="bg-blue-600 mt-5 text-white flex justify-center gap-6">
            <p>Copyright 2025 </p>
            <ul className="list-disc flex gap-6" >
                <li className="list-disc" >
                    <p>All rights reserved</p>
                </li>
                
                <li className="list-disc" >
                    <p>Emirhan Uyunmaz</p>
                </li>
            </ul>
        </div>
    </footer>)
}