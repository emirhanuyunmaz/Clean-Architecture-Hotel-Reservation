import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import UserBookCard from "./UserBookCard";
import { Eraser } from "lucide-react";


export default function UserBooking(){
    const [shortBy,setShortBy] = useState("")

    const selectHandleChange = (event: SelectChangeEvent) => setShortBy(event.target.value)

    return (<div className="" >
        <div>
            <p className="font-bold">HELLO USER NAME</p>
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
            <UserBookCard  />
            
        </div>

    </div>)
}