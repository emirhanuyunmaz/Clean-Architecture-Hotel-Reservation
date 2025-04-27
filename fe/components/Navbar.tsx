'use client'
import Link from "next/link";
import HotelIcon from "./HotelIcon";
import UserProfileIcon from "./UserProfileIcon";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Navbar(){
    const [userLogin,setUserLogin] = useState(false)
    const token = getCookie("token")
    const [userIsAdmin,setIsUserAdmin] = useState(false)
    
    
    useEffect(() => {
        if(token != undefined){
            const decode_token:{admin:boolean,id:string,exp:number,iat:number} = jwtDecode(token)
            console.log("ADMin token D:",decode_token!.admin);
            setIsUserAdmin(decode_token!.admin)
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
                <Link href={"/contact"} className="hover:text-primary transition-all" >Contact</Link>
                <Link href={"/about"} className="hover:text-primary transition-all" >About</Link>
                {userLogin && 
                    <UserProfileIcon/>
                }
                {!userLogin &&
                    <Link href={"/login"} className="bg-primary hover:opacity-50 transition-all text-white px-4 py-1 rounded-xl" >Login</Link>
                }
                {
                    userIsAdmin && <Link href={`/admin`} className="font-bold hover:underline" >Admin</Link>
                }
            </div>
        </div>
        
    </nav>)
}