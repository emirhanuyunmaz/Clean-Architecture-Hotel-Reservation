import { useSearchParams } from "next/navigation";
import AdminBookList from "./AdminBookList";
import { useEffect, useState } from "react";
import AdminAddUpdataBook from "./AdminAddUpdateBook";


export default function AdminBook(){
    const searchParams = useSearchParams()
    const [addAndUpdate,setAddAndUpdate] = useState(searchParams.get("add") ? true : false)
    console.log(addAndUpdate);
    useEffect(() => {
        setAddAndUpdate(searchParams.get("add") ? true  : false)
    },[searchParams])
    return(<>
        {addAndUpdate ? <AdminAddUpdataBook/> : <AdminBookList/>}
    </>)
}