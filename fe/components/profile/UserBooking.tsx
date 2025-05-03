import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import UserBookCard from "./UserBookCard";
import { Eraser } from "lucide-react";
import { useUserBookListQuery } from "@/store/book/bookApi";
// bookID : {_id: '680e4be08b64b4c55ac3ae8f', images: Array(5), price: '20', title: 'Good Room'}
// endDay:"2025-04-06T21:00:00.000Z"
// isPayment:true
// startDay: "2025-04-05T21:00:00.000Z"
// totalPrice:20

export default function UserBooking(){
    const [shortBy,setShortBy] = useState("")
    const userBookList = useUserBookListQuery("") 
    const selectHandleChange = (event: SelectChangeEvent) => setShortBy(event.target.value)
    
    console.log(userBookList.data);
    
    return (<div className="" >
        <div>
            <p className="font-bold">HELLO</p>
            <p className="text-sm text-secondary" >Have nice day.</p>
        </div>
        <div className="mt-10 w-full flex gap-5 ">
            <TextField label="Search Documnets" className="w-4/5" />
            <FormControl className="w-1/5" >
                <InputLabel id="shortBy" className="bg-white">Sort By</InputLabel>
                <Select
                    className="bg-white"
                    labelId="shortBy"
                    id="shortBy"
                    value={shortBy}
                    label="Age"
                    onChange={selectHandleChange}
                >
                    <MenuItem value={10}>Time</MenuItem>
                    <MenuItem value={20}>Name</MenuItem>
                    <MenuItem value={30}>Day</MenuItem>
                </Select>
            </FormControl>
            {/* <Button variant="outlined" ><Eraser /></Button> */}
        </div>

        <div className="flex mt-10">
            { userBookList.data?  userBookList.data.map((book) => <UserBookCard key={book._id} {...book} />):<p>Reservation is not found</p>}
            
        </div>

    </div>)
}