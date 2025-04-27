'use client'
import HotelMiniImageCard from "@/components/HotelMiniImageCard";
import { useGetFindLocationBookQuery } from "@/store/book/bookApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";


export default function Page(){
    
    const router = useRouter()
    const [searchText,setSearchText] = useState("")
    
    const getBookLocation = useGetFindLocationBookQuery(searchText) 
    
    function searchFunction(){
        if(searchText !== ""){
            console.log(searchText);
            
            router.push(`?search=${searchText}`)
        }else{
            router.push(`/hotels`)
        }
    }

    useEffect(() => {
        searchFunction()
    },[searchText])

    return (<div className="max-w-7xl mx-auto my-3 ">
        <div className="flex flex-col">
            <div className="flex justify-center mb-3">
                
                <div className="w-full md:w-1/3">
                    <Autocomplete
                        placeholder="Location"
                        className="outline-none border border-secondary px-2 py-2 rounded-md w-full"
                        apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                        onPlaceSelected={(place:any) => setSearchText(place.formatted_address)}
                        value={searchText}
                        onChange={(e) => setSearchText(e.currentTarget.value)}
                    />  
                </div>
                {/* <TextField label="Search " className="md:w-1/3"/> */}
                {/* Google entegre edilecek */}
            </div>
            <div className="flex gap-3 justify-center">
                {getBookLocation.data?.length! > 0 ? getBookLocation.data?.map((book) => <HotelMiniImageCard key={book._id} {...book} /> ): <div className=""><p className="text-center font-bold text-xl">Books Not Found</p></div>}
                

            </div>
        </div>
    </div>)
}