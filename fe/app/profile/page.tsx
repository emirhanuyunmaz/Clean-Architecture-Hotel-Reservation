import { CircleHelp, HandHelping, LayoutDashboard, MessageCircle, Settings, StickyNote } from "lucide-react";
import 'animate.css';


export default function Page(){
    
    return (<div className="min-h-[85vh]" >

        <div className="flex h-full">

            <div className=" h-full mt-5 px-5 border-r-2  border-secondary  flex flex-col  group ">
                
                <div className="mb-10">
                    <h2 className="font-bold text-xl animate__animated animate__lightSpeedInLeft hidden group-hover:flex " >Lunavera <span className="text-primary" >Suites</span></h2>
                    <h2 className="font-bold text-xl flex group-hover:hidden" >L <span className="text-primary" >S</span></h2>
                </div>

                <div className=" h-full flex flex-col gap-10">
                    <ul className="flex flex-col gap-3">
                        <li className="flex gap-3" >
                            <p ><LayoutDashboard /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft hidden group-hover:flex`}>Dashboard</p>
                        </li>

                        <li className="flex gap-3" >
                            <p><StickyNote /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft hidden group-hover:flex`}>Booking</p>
                        </li>

                        <li className="flex gap-3">
                            <p><HandHelping /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft hidden group-hover:flex`}>Refunds</p>
                        </li>
                    </ul>

                    <ul className="flex flex-col gap-3" >
                        <li className="flex gap-3" >
                            <p><MessageCircle /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft hidden group-hover:flex`}>Message</p>
                        </li>

                        <li className="flex gap-3" >  
                            <p><CircleHelp /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft hidden group-hover:flex`}>Help</p>
                        </li>

                        <li className="flex gap-3 relative" >
                            <p className="" ><Settings /></p>
                            <p className={`animate__animated animate__lightSpeedInLeft hidden group-hover:flex`} >Setting</p>
                        </li>
                    </ul>
                </div>

                <div>

                </div>


            </div>

            <div>

            </div>
        </div>

    </div>)
} 