import { useSignupMutation } from "@/store/auth/authApi"
import { useGetSingleUserQuery } from "@/store/user/userApi"
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, TextField } from "@mui/material"
import { Camera, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"


type Inputs = {
    nameSurname:string
    email: string
    phoneNumber:string
    country:string
    password: string
    gender:string
}

export default function AdminAddUpdateUser({setBack}:{setBack:any}){

    const searchParams = useSearchParams()
    console.log("SSAA:",searchParams.get("add"));
    console.log("SSAA:",searchParams.get("id"));

    const [showPassword,setShowPassword] = useState(false)
    const [selectGender,setSelectGender] = useState("")
    const [snackBarSuccesOpen,setSnackBarSuccesOpen] = useState(false)
    const [snackBarErrorOpen,setSnackBarErrorOpen] = useState(false)
    const [userId,setUserId] = useState(searchParams.get("id"))
    const [isAdd,setIsAdd] = useState(searchParams.get("add"))
    

    const [signupUser,resSignupUser] = useSignupMutation()
    const userData = useGetSingleUserQuery(searchParams.get("id") ?? "")
    
    const handleClickShowPassword = () => setShowPassword(!showPassword)


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Inputs>()

    async function singleUserData(){
        try{
            console.log("DATA::",userData.data);
            
            setValue("email",userData.data!.email)
            setValue("country",userData.data!.country)
            setValue("nameSurname",userData.data!.nameSurname)
            setValue("password",userData.data!.password)
            setValue("phoneNumber",userData.data!.phoneNumber)
            setValue("gender",userData.data!.gender)
        }catch(err){
            console.log("ERR:",err);
        }
    }


    const snackBarSuccesClose = () => {
        setSnackBarSuccesOpen(false);
    };
    const snackBarErrorClose = () => {
        setSnackBarErrorOpen(false);
    };


    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        
        const newData = {
            ...data,
            gender:selectGender
        }

        console.log(newData);

        await signupUser(newData).unwrap()
        .then(() => {
            setSnackBarSuccesOpen(true)
            setBack(false)
        }).catch((err) => {
            console.log("ERR:",err);
            setSnackBarErrorOpen(true)
        })

    }


    useEffect(() => {
        if(userId != null && userData.isSuccess){
            singleUserData()
        }
    },[userId,userData.isFetching])

    useEffect(() => {
        
        if(isAdd == "null" ){
            setBack(false)
        }
        if(isAdd=="false" && !userId){
            setBack(false)
        }
        if(isAdd=="true" && userId){
            setBack(false)
        }
    },[isAdd,userId])

    return(<div className="w-full">

    <div className="flex justify-between">
        <h2 className="text-2xl font-bold" >Edit Profile</h2>
        {userId && <Link href={`/user/addBook/${userId!}`} >ADD BOOK</Link>}
    </div>
    <div className="flex flex-col md:flex-row  gap-10 mt-10">
        <div className="">
            <div className="flex ">
                <div className="relative flex group ">
                    <img src={`/images/default_user.png`} alt="User Image" className="w-40 h-40 rounded-full "  />
                    <button className="animate__animated animate__fadeIn w-full h-full hidden absolute group-hover:block "><Camera className="mx-auto text-primary"/></button>
                    
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="md:ms-auto md:w-3/4 flex flex-col gap-3" >
            
            <div className="flex flex-col  gap-3 ">
                
                <div className="flex-1" >
                <FormControl fullWidth>

                    <TextField slotProps={{ inputLabel: { shrink: true } }}  label="Name" className="w-full" {...register("nameSurname",{required: "Name and Surname is required", min: 2 })}  />
                </FormControl>

                    {errors.nameSurname && <span className="text-red-600 text-sm ms-3" >{errors.nameSurname.message}</span>}
                </div>
                <div className="flex-1" >
                <FormControl fullWidth>
                
                    <TextField slotProps={{ inputLabel: { shrink: true } }}  label="Email" className="w-full" {...register("email",{required: "Email is required", min: 2 })} />

                </FormControl>
                
                    {errors.email && <span className="text-red-600 text-sm ms-3" >{errors.email.message}</span>}
                </div>
            </div>

            <div className="flex flex-col  gap-3 ">
                <div className="flex-1" >
                <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="password" className="bg-white" shrink>Password</InputLabel>
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
                </div>
                <div className="flex-1" >
                <FormControl fullWidth>
                    <TextField slotProps={{ inputLabel: { shrink: true } }}  label="Phone Number" className="w-full" {...register("phoneNumber",{required: "Phone Number is required", min: 2 })}  />
                </FormControl>

                    {errors.phoneNumber && <span className="text-red-600 text-sm ms-3" >{errors.phoneNumber.message}</span>}  
                </div>
            </div>
            
            <div className="flex flex-col  gap-3 ">
                <div className="flex-1" >
                <FormControl fullWidth>

                    <TextField slotProps={{ inputLabel: { shrink: true } }}  label="Country" className="w-full" {...register("country",{required: "Country is required" })}  />
                </FormControl>
                    {errors.country && <span className="text-red-600 text-sm ms-3" >{errors.country.message}</span>}

                </div>
                <div className="flex-1">

                    <FormControl fullWidth >
                        <InputLabel id="gender" className="bg-white" shrink>Gender</InputLabel>
                        <Select
                            labelId="gender"
                            // id="gender"
                            label="Gender"
                            value={selectGender}
                            onChange={e => setSelectGender(e.target.value)}
                        >
                            <MenuItem id="female" value="female">Female</MenuItem>
                            <MenuItem id="male" value="male">Male</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.gender && <span className="text-red-600 text-sm ms-3" >{errors.gender.message}</span>}
                </div>
            </div>

            <div className="ms-auto">
                <Button type="submit" variant="contained" className="gap-3 flex justify-center mt-10" >CREATE</Button>
            </div>
        </form>
        
                    
    </div>

    <Snackbar open={snackBarSuccesOpen} autoHideDuration={6000} onClose={snackBarSuccesClose}>
        <Alert
            onClose={snackBarSuccesClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
        >
            SUCCES UPDATE
        </Alert>
    </Snackbar>



    <Snackbar open={snackBarErrorOpen} autoHideDuration={6000} onClose={snackBarErrorClose}>
        <Alert
            onClose={snackBarErrorClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
        >
            ERROR
        </Alert>
    </Snackbar>

    </div > )
}