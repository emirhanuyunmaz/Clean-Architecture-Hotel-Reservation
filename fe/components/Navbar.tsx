'use client'
import Link from "next/link";
import HotelIcon from "./HotelIcon";
import UserProfileIcon from "./UserProfileIcon";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

export default function Navbar(){
    const [userLogin,setUserLogin] = useState(false)
    const token = getCookie("token")
    
    useEffect(() => {
        if(token != undefined){
            setUserLogin(true)
        }else{
            setUserLogin(false)
        }
    },[])
    
    return(<nav className=" border-b-2" >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 " >
            <div>
                <HotelIcon/>
            </div>

            <div className="flex gap-5 items-center " >
                <Link href={"/"} className="hover:text-primary transition-all" >Home</Link>
                <Link href={"/hotels"} className="hover:text-primary transition-all" >Hotels</Link>
                <Link href={"/rooms"} className="hover:text-primary transition-all" >Rooms</Link>
                <Link href={"/contact"} className="hover:text-primary transition-all" >Contact</Link>
                <Link href={"/about"} className="hover:text-primary transition-all" >About</Link>
                {userLogin && 
                    <UserProfileIcon/>
                }
                {!userLogin &&
                    <Link href={"/login"} className="bg-primary hover:opacity-50 transition-all text-white px-4 py-1 rounded-xl" >Login</Link>
                }
            </div>
        </div>
        
    </nav>)
}