'use client'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    email: string
    password: string
}
  
export default function Login(){
    const [showPassword,setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


    return (<div className="max-w-7xl mx-auto min-h-[75vh] flex gap-10 mt-10" >
        
        <div className="w-1/2">
            <img src="/images/lunavera_logo.png" alt="hotel image" className="w-full h-full" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=" w-1/2 flex flex-col gap-32" >
            <div>
                <h2 className="text-4xl font-bold text-center" >Login Account</h2>
            </div>
            <div className="flex flex-col gap-3 justify-center" >                    
                <TextField label="Email" variant="outlined"  {...register("email",{required: true, min: 10, max: 50 })}/>
                {errors.email && <span className="text-red-600 text-sm ms-3" >Email required</span>}
                <FormControl  variant="outlined">
                    <InputLabel htmlFor="password" className="flex-1">Password</InputLabel>
                    <OutlinedInput
                        className="flex-1"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            // onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showPassword ? <EyeOff /> : <Eye />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        {...register("password",{  required: true,min: 10, max: 50 })}
                    />
                    {errors.password && <span className="text-red-600 text-sm ms-3" >Password required</span>}

                    </FormControl>
                <Button type="submit" variant="contained" >LOGIN</Button>
                <Link href={`/register`} className="mx-auto text-blue-500 hover:text-blue-700 transition-all" >CREATE ACCOUNT</Link>
            </div>
        
        </form>
        
    </div>)
}