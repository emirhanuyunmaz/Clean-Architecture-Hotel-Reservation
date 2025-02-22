'use client'
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";


export default function Page(){
    const router = useRouter();


    return (<div className="max-w-7xl mx-auto flex min-h-[75vh] mt-10 gap-10" >

        <div className="w-1/2" >
            <img src="/images/hotel_login.png" alt="Hotel Image" className="w-full h-full" />
        </div>

        <form className="w-1/2 flex flex-col items-center gap-10">
            <h2 className="text-center text-4xl font-bold" >Create Account</h2>
            <div className="flex flex-col w-full gap-5" >
                <TextField label="Name Surname"  variant="outlined"  />
                <TextField label="Email" />
                <TextField label="Phone Number" />
                <TextField label="Country" />
                <TextField label="Password" />
                <Button variant="contained" >REGISTER</Button>
                <Button onClick={() => router.back()} className="mx-auto text-blue-500 hover:text-blue-700 transition-all" >LOGIN</Button>
            </div>
        </form>

    </div>)
}