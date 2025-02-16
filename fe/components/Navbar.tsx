import Link from "next/link";

export default function Navbar(){
    return(<nav className=" border-b-2" >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 " >
            <div>
                <Link href={"/"} className="text-xl font-bold">Hotel </Link>
            </div>

            <div className="flex gap-5 items-center " >
                <Link href={"/"} className="hover:text-primary transition-all" >Home</Link>
                <Link href={"/"} className="hover:text-primary transition-all" >Hotels</Link>
                <Link href={"/"} className="hover:text-primary transition-all" >Rooms</Link>
                <Link href={"/"} className="hover:text-primary transition-all" >Contact</Link>
                <Link href={"/"} className="bg-primary hover:opacity-50 transition-all text-white px-4 py-1 rounded-xl" >Login</Link>
            </div>
        </div>
        
    </nav>)
}