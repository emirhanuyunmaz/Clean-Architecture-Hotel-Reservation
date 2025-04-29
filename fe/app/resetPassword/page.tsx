'use client'
import NewPassword from "@/components/NewPassword";
import SendEmail from "@/components/SendEmail";
import Success from "@/components/Success";
import { Button, TextField } from "@mui/material";
import { Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page(){
    const searchParams = useSearchParams()
    console.log(searchParams.get("key"));
    
    const [control,setControl] = useState(0)


    if(control == 0 && searchParams.get("key") == null){
        return (<SendEmail setControl={setControl}/>)
    }else if(control == 1 && searchParams.get("key") == null){
        return(<Success/>)
    }
    else if (control == 2 || searchParams.get("key") != null){
        return (<NewPassword code={searchParams.get("key") ?? ""} />)
    }
}