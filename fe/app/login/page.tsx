import { Button, TextField } from "@mui/material";
import Link from "next/link";


export default function Login(){
    return (<div className="max-w-7xl mx-auto min-h-[75vh] flex gap-10 mt-10" >
        
        <div className="w-1/2">
            <img src="/images/hotel_login.png" alt="hotel image" className="w-full h-full" />
        </div>
        <form className=" w-1/2 flex flex-col gap-32" >
            <div>
                <h2 className="text-4xl font-bold text-center" >Login Account</h2>
            </div>
            <div className="flex flex-col gap-3 justify-center" >                    
                <TextField label="Email" variant="outlined"/>
                <TextField label="Password" variant="outlined"/>
                <Button variant="contained" >LOGIN</Button>
                <Link href={`/register`} className="mx-auto text-blue-500 hover:text-blue-700 transition-all" >CREATE ACCOUNT</Link>
            </div>
        
        </form>
        
    </div>)
}