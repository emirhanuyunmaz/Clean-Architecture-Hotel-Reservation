import Link from "next/link";


export default function HotelMiniImageCard(book:BookModel){
    return(<Link href={`/detail/${book.slug}`} ><div className={`relative w-64 h-64 border-2 rounded-xl group`} >
        <div className="absolute w-full h-full rounded-xl ">
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads${book.images?.at(0)}`} className="w-full h-full rounded-xl" alt="" />
        </div>
        <div className="flex absolute right-0 ">
            <p className="bg-primary text-white px-3 py-1 rounded-bl-xl rounded-tr-xl" >${book.price} per night</p>
        </div>
        <div className="absolute ms-4 bottom-2  group-hover:bottom-2 bg-black  bg-opacity-60 w-5/6 mx-auto px-3 py-2 rounded-md" >
            <p className="text-white text-xl " >{book.title}</p>
            <p className="text-white" >{book.location}</p>
        </div>
    </div></Link>)
}