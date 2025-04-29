import { BadgeCheck } from "lucide-react";

export default function Success(){
    return(<div className="min-h-[80vh] flex flex-col justify-center items-center">
        <div>
            <BadgeCheck size={96} color="green" />
        </div>
        <h1 className="font-bold text-2xl">SUCCESS</h1>
        <p className="underline">Check to your email</p>
    </div>)
}