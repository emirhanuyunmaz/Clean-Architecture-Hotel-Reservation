'use client'
import { useGetUserProfileDataQuery } from "@/store/user/userApi";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Camera, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    nameSurname:string
    email: string
    phoneNumber:string
    country:string
    password: string
    gender:string
}

export default function EditProfile(){
    const getUserProfile = useGetUserProfileDataQuery("")
    console.log(getUserProfile.data);
    
    const [showPassword,setShowPassword] = useState(false)
    
    const handleClickShowPassword = () => setShowPassword(!showPassword)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({defaultValues:getUserProfile.data})

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        console.log(data);
    }

    useEffect(() => {
        if(getUserProfile.isSuccess){
            setValue("email",getUserProfile.data.email)
            setValue("nameSurname",getUserProfile.data.nameSurname)
            setValue("gender",getUserProfile.data.gender)
            setValue("phoneNumber",getUserProfile.data.phoneNumber)
            setValue("password",getUserProfile.data.password)
        }
    },[getUserProfile.isFetching])



    return (<div className="w-full">

        <div>
            <h2 className="text-2xl font-bold" >Edit Profile</h2>
        </div>
        <div className="flex flex-col md:flex-row  gap-10 mt-10">
            <div className="">
                <div className="flex ">
                    <div className="relative flex group ">
                        <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="User Image" className="w-40 h-40 rounded-full "  />
                        <button className="animate__animated animate__fadeIn w-full h-full hidden absolute group-hover:block "><Camera className="mx-auto text-white"/></button>
                        
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="md:ms-auto md:w-3/4 flex flex-col gap-3" >
                
                <div className="flex flex-col  gap-3 ">
                    <div className="flex-1" >
                        <TextField label="Name" className="w-full" {...register("nameSurname",{required: "Name and Surname is required", min: 2 })}  />
                        {errors.nameSurname && <span className="text-red-600 text-sm ms-3" >{errors.nameSurname.message}</span>}
                    </div>
                    <div className="flex-1" >
                        <TextField label="Email" className="w-full" {...register("email",{required: "Email is required", min: 2 })} />
                        {errors.email && <span className="text-red-600 text-sm ms-3" >{errors.email.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col  gap-3 ">
                    <div className="flex-1" >
                    <FormControl className="w-full" variant="outlined">
                    <InputLabel htmlFor="password" className="w-full">Password</InputLabel>
                    <OutlinedInput
                        className="w-full"
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
                        {...register("password",{ required: "Password is required",min: 6 })}
                    />
                    {errors.password && <span className="text-red-600 text-sm ms-3" >{errors.password.message}</span>}
                    </FormControl>
                        {errors.password && <span className="text-red-600 text-sm ms-3" >{errors.password.message}</span>}
                    </div>
                    <div className="flex-1" >
                        <TextField label="Phone Number" className="w-full" {...register("phoneNumber",{required: "Email is required", min: 2 })}  />
                        {errors.phoneNumber && <span className="text-red-600 text-sm ms-3" >{errors.phoneNumber.message}</span>}  
                    </div>
                </div>
                
                <div className="flex flex-col  gap-3 ">
                    <div className="flex-1" >
                        <TextField label="Country" className="w-full" {...register("country",{required: "Email is required", min: 2 })}  />
                        {errors.country && <span className="text-red-600 text-sm ms-3" >{errors.country.message}</span>}  
                    </div>
                    <div className="flex-1">
                        <TextField label="Gender"className="w-full" {...register("gender",{required: "Email is required", min: 2 })}  />
                        
                        {errors.country && <span className="text-red-600 text-sm ms-3" >{errors.country.message}</span>}
                    </div>
                </div>

                <div className="ms-auto">
                    <Button type="submit" variant="contained" className="gap-3 flex justify-center mt-10" >Update</Button>
                </div>
            </form>
            
                        
        </div>



    </div>)
}