'use client'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker  } from "@mui/x-date-pickers";
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function ReservationComponent(){
    return (<div className="mt-32 border-2 bg-gray-100 rounded-xl py-10 px-10" >
        <div className='flex items-center justify-around' >
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker className='bg-white' label="Check Available" />
                </LocalizationProvider>
            </div>
            
            <div>
            <FormControl fullWidth>
                <InputLabel id="peopleNumber">Person</InputLabel>
                    <Select
                        labelId='peopleNumber'
                        id="peopleNumber"
                        className='bg-white w-52'
                        label="Person"
                    >
                        
                        <MenuItem value={1}>Person 1</MenuItem>
                        <MenuItem value={2}>Person 2</MenuItem>
                        <MenuItem value={3}>Person 3</MenuItem>
                        <MenuItem value={4}>Person 4</MenuItem>
                        <MenuItem value={5}>Person 5</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div>
            <FormControl fullWidth>
                <InputLabel id="peopleNumber">Select Location</InputLabel>
                    <Select
                        labelId='peopleNumber'
                        id="peopleNumber"
                        className='bg-white w-52'
                        label="Person"
                    >
                        
                        <MenuItem value={1}>Ankara</MenuItem>
                        <MenuItem value={2}>İstanbul</MenuItem>
                        <MenuItem value={3}>İzmir</MenuItem>
                        <MenuItem value={4}>Antalya</MenuItem>
                        <MenuItem value={5}>Muğla</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div>
                <Button variant='contained' >Search</Button>
            </div>
        
        </div>
        
    </div>)
}