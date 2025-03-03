'use client'
import { CircleHelp, HandHelping, LayoutDashboard, MessageCircle, Settings, StickyNote, User } from "lucide-react";
import 'animate.css';
import EditProfile from "@/components/profile/EditProfile";
import { useState } from "react";
import UserBooking from "@/components/profile/UserBooking";
import UserMessage from "@/components/profile/UserMessage";


export default function Page(){
    const [selectMenu,setSelectMenu] = useState(0)

    return (<div className="min-h-[85vh]" >

        <div className="flex h-full gap-10 ">

            <div className=" h-[100vh] mt-5 px-5 border-r-2  border-secondary  flex flex-col  group bg-white z-10 ">
                
                <div className="mb-10">
                    <h2 className="font-bold text-xl animate__animated animate__lightSpeedInLeft flex " >Lunavera <span className="text-primary" >Suites</span></h2>
                    {/* <h2 className="font-bold text-xl flex group-hover:hidden" >L <span className="text-primary" >S</span></h2> */}
                </div>

                <div className=" h-full flex flex-col gap-10">
                    <ul className="flex flex-col gap-3">
                        
                        <li className="flex gap-3 items-center bg-primary px-2 py-2 text-white rounded-xl " >
                            <p className="" ><User /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Profile</p>
                        </li>

                        <li className="flex gap-3 items-center " >
                            <p className="p-1" ><StickyNote /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Booking</p>
                        </li>

                        <li className="flex gap-3 items-center ">
                            <p className="p-1" ><HandHelping /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Refunds</p>
                        </li>
                    </ul>

                    <ul className="flex flex-col gap-3" >
                        <li className="flex gap-3 items-center " >
                            <p className="p-1" ><MessageCircle /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Message</p>
                        </li>

                        <li className="flex gap-3 items-center " >  
                            <p className="p-1" ><CircleHelp /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`}>Help</p>
                        </li>
{/* 
                        <li className="flex gap-3 relative" >
                            <p className="p-1" ><Settings /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft flex`} >Setting</p>
                        </li> */}
                    </ul>
                </div>

                <div>

                </div>


            </div>

            <div className="mt-10 w-3/4" >
                {/* <EditProfile/> */}
                {/* <UserBooking/> */}
                <UserMessage/>
            </div>
        </div>

    </div>)
} 