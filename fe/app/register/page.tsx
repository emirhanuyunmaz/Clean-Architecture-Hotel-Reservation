'use client'
import { useSignupMutation } from "@/store/auth/authApi";
import { Alert, Button,  FormControl,  IconButton,  InputAdornment,  InputLabel, OutlinedInput, Snackbar, TextField } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    nameSurname:string
    email: string
    phoneNumber:string
    country:string
    password: string
    confirmPassword:string
}


export default function Page(){
    const router = useRouter();
    
    const [sigup,resSignup] = useSignupMutation()

    const [snackBarSuccesOpen,setSnackBarSuccesOpen] = useState(false)
    const [snackBarErrorOpen,setSnackBarErrorOpen] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    
    const snackBarSuccesClose = () => {
        setSnackBarSuccesOpen(false);
    };
    const snackBarErrorClose = () => {
        setSnackBarErrorOpen(false);
    };

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        await sigup(data).unwrap()
        .then((res) => {
            console.log("RESSER::",res);
            setSnackBarSuccesOpen(true)
            router.back()
        }).catch((err) => {
            console.log("EEERRR::",err);
            setErrorMessage(err.data.error)
            setSnackBarErrorOpen(true)
        })
        console.log(data)
    }


    return (<div className="max-w-7xl mx-auto flex min-h-[75vh] mt-10 gap-10" >

        <div className="w-1/2" >
            <img src="/images/lunavera_logo.png" alt="Hotel Image" className="w-full h-full" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 flex flex-col items-center gap-10">
            <h2 className="text-center text-4xl font-bold" >Create Account</h2>
            <div className="flex flex-col w-full gap-5" >
                
                <TextField label="Name Surname"  variant="outlined"  {...register("nameSurname",{required: "Name and Surname is required", min: 2 })}/>
                {errors.nameSurname && <span className="text-red-600 text-sm ms-3" >{errors.nameSurname.message}</span>}

                <TextField label="Email" {...register("email",{required: "Email is required", min: 6 })}/>
                {errors.email && <span className="text-red-600 text-sm ms-3" >{errors.email.message}</span>}

                <TextField label="Phone Number" type="number" {...register("phoneNumber",{required: "Phone Number is required", min: 5 })}/>
                {errors.phoneNumber && <span className="text-red-600 text-sm ms-3" >{errors.phoneNumber.message} </span>}

                <TextField label="Country" {...register("country",{required: "Country is required", min: 2 })} />
                {errors.country && <span className="text-red-600 text-sm ms-3" >{errors.country.message}</span>}

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
                        {...register("password",{ required: "Password is required",min: 6 })}
                    />
                    {errors.password && <span className="text-red-600 text-sm ms-3" >{errors.password.message}</span>}
                    </FormControl>
                    
                    <FormControl  variant="outlined">
                        <InputLabel htmlFor="Confirm Password" className="flex-1">Confirm Password</InputLabel>
                        <OutlinedInput
                            className="flex-1"
                            id="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label={
                                    showConfirmPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowConfirmPassword}
                                // onMouseDown={handleMouseDownPassword}
                                // onMouseUp={handleMouseUpPassword}
                                edge="end"
                                >
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Confirm Password"
                            {...register("confirmPassword",{  required: "Confirm Password is required",min: 6 , 
                                validate: (val: string) => {
                                if (watch('password') != val) {
                                  return "Your passwords do no match ";
                                }
                              }, 
                            })}
                        />
                        {errors.confirmPassword && <span className="text-red-600 text-sm ms-3" >{errors.confirmPassword.message}</span>}

                    </FormControl>
                <Button type="submit" variant="contained" >REGISTER</Button>
                
                <Button onClick={() => router.back()} className="mx-auto text-blue-500 hover:text-blue-700 transition-all" >LOGIN</Button>
            </div>
            </form>
            <div>

            <Snackbar open={snackBarSuccesOpen} autoHideDuration={6000} onClose={snackBarSuccesClose}>
                <Alert
                    onClose={snackBarSuccesClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    SUCCES REGISTER : Please Email Verify
                </Alert>
            </Snackbar>
    
            <Snackbar open={snackBarErrorOpen} autoHideDuration={6000} onClose={snackBarErrorClose}>
                <Alert
                    onClose={snackBarErrorClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    ERROR :  
                     {errorMessage}
                </Alert>
            </Snackbar>
            </div>
    </div>)
}