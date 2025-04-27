'use client'
import { CircleHelp, HandHelping, HomeIcon, LayoutDashboard, MessageCircle, PersonStanding, Settings, StickyNote, User } from "lucide-react";
import 'animate.css';
import { useEffect, useLayoutEffect, useState } from "react";
import EditProfile from "@/components/profile/EditProfile";
import UserBooking from "@/components/profile/UserBooking";
import UserMessage from "@/components/profile/UserMessage";
import UserHelp from "@/components/profile/UserHelp";
import { useRouter, useSearchParams } from "next/navigation";
import AdminDashboard from "@/components/profile/AdminDashboard";
import AdminBook from "@/components/profile/AdminBook";


export default function Page(){
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const [selectMenu,setSelectMenu] = useState(searchParams.get("select") ? searchParams.get("select") : 0)

    function handleSearch(term: any) {
        setSelectMenu(term)
        router.push(`?select=${term}`)
    }

    return (<div className="min-h-[85vh]" >

        <div className="flex h-full gap-10 ">

            <div className=" h-[100vh] mt-5 px-5 border-r-2  border-secondary  flex flex-col  group bg-white z-10 ">
                
                <div className="mb-10">
                    <h2 className="font-bold text-xl animate__animated animate__lightSpeedInLeft flex " >Lunavera <span className="text-primary" >Suites</span></h2>
                    {/* <h2 className="font-bold text-xl flex group-hover:hidden" >L <span className="text-primary" >S</span></h2> */}
                </div>

                <div className=" h-full flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        
                        {/* <button onClick={() => handleSearch(0)} className={`hover:shadow-xl flex gap-3 items-center p-2 rounded-xl  ${selectMenu == 0 && "active_link"} duration-300`} >
                            <p className="" ><User /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Profile</p>
                        </button>

                        <button onClick={() => handleSearch(1)} className={`flex gap-3 items-center p-2 rounded-xl  hover:shadow-xl  ${selectMenu == 1 && "active_link"} duration-300 `} >
                            <p className="p-1" ><StickyNote /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Booking</p>
                        </button> */}

                        <button onClick={() => handleSearch(1)} className={`flex gap-3 items-center p-2 rounded-xl  hover:shadow-xl  ${selectMenu == 1 && "active_link"} duration-300 `}>
                            <p className="p-1" ><PersonStanding /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Users</p>
                        </button>

                        <button onClick={() => handleSearch(2)} className={`flex gap-3 items-center p-2 rounded-xl  hover:shadow-xl  ${selectMenu == 2 && "active_link"} duration-300 `}>
                            <p className="p-1" ><HomeIcon /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Book List</p>
                        </button>
                    </div>

                    <div  className="flex flex-col gap-3" >
                        <button onClick={() => handleSearch(3)} className={`flex gap-3 items-center p-2 rounded-xl  hover:shadow-xl  ${selectMenu == 3 && "active_link"} duration-300 `} >
                            <p className="p-1" ><MessageCircle /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Message</p>
                        </button>

                        <button onClick={() => handleSearch(4)} className={`flex gap-3 items-center p-2 rounded-xl  hover:shadow-xl  ${selectMenu == 4 && "active_link"} duration-300 `} >  
                            <p className="p-1" ><CircleHelp /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Help</p>
                        </button>
                        {/* 
                        <button className="flex gap-3 relative" >
                            <p className="p-1" ><Settings /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`} >Setting</p>
                        </button> */}
                    </div>
                </div>

                <div>

                </div>


            </div>

            <div className="mt-10 w-3/4" >
                {/* {selectMenu == 0 && <EditProfile/>} */}
                {/* {selectMenu == 1 && <UserBooking/>} */}
                {selectMenu == 1 && <AdminDashboard/>}
                {selectMenu == 2 && <AdminBook/>}
                {selectMenu == 3 && <UserMessage/>}
                {selectMenu == 4 && <UserHelp/>}
            </div>
        </div>

    </div>)
} 