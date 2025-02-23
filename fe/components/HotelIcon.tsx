import Link from "next/link";


export default function HotelIcon(){
    return(<Link href={`/`}  className="flex items-center gap-3">
        <img src="/images/lunavera_logo.png" className="w-8 h-8 rounded-full" alt="" />
        <p className="font-bold text-xl ">Lunavera</p>
        </Link>)
}