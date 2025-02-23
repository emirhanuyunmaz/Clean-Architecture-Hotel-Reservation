import { Button, TextareaAutosize, TextField } from "@mui/material";
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";


export default function Page(){

    return(<div className="flex gap-10 max-w-7xl mx-auto min-h-[70vh] py-20" >

        <div className="w-1/2 flex flex-col justify-center gap-3" >
            <div className="flex gap-3 w-full">
                <TextField label="First Name" className="flex-1" />
                <TextField label="Last Name"  className="flex-1"/>
            </div>

            <div className="flex gap-3 w-full">
                <TextField label="Email"  className="flex-1" />
                <TextField label="Phone Number"   className="flex-1"/>
            </div>
            
            <div className="flex">
                <textarea placeholder="Message" className="outline-none border-secondary border rounded-sm w-full h-64 text-xl px-5 py-3" />
            </div>
            <div className="flex justify-center"> 
                <Button variant="contained"  >Submit</Button>
            </div>
        </div>

        <div className="w-1/2 flex flex-col border-l border-secondary ps-10">
            <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold text-center" >Contact Us</h2>
                <p className="text-secondary text-xl" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, asperiores!</p>
            </div>

            <div className="h-full flex flex-col justify-around ">

                <div className="flex items-center gap-3">
                    <Phone size={32} color="black" />
                    <p className="text-xl text-secondary" >+1234567890</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <Mail size={32} color="black" />
                    <p className="text-xl text-secondary" >info@gmail.com</p>
                </div>

                <div className="flex items-center gap-3">
                    <MapPin size={32} color="black" />
                    <p className="text-xl text-secondary" >Kahramanmaraş , Onikişubat </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <Instagram size={32} color="black" />
                    <Twitter size={32} color="black" />
                    <Youtube size={32} color="black" />
                    <Linkedin size={32} color="black" />
                </div>
            
            </div>

        </div>

        <div>

        </div>

    </div>)
}