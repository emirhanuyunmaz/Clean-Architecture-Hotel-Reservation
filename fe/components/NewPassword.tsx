import { useResetPasswordMutation } from "@/store/user/userApi";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function NewPassword({code}:{code:string}){
    const router = useRouter()

    const [resetPassword,resResetPassword] = useResetPasswordMutation()
    const [snackBarSuccesOpen,setSnackBarSuccesOpen] = useState(false)
    const [snackBarErrorOpen,setSnackBarErrorOpen] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<resetPasswordModel>()

    const snackBarSuccesClose = () => {
        setSnackBarSuccesOpen(false);
      };
      const snackBarErrorClose = () => {
        setSnackBarErrorOpen(false);
    };

    const onSubmit: SubmitHandler<resetPasswordModel> =async (data) => {
        console.log("DDAATTAA::",data);
        const newData = {
            key:code,
            password:data.password
        }

        await resetPassword(newData).unwrap()
        .then(() => {
            setSnackBarSuccesOpen(true)
            router.push("/login")
        })
        .catch((err) => {
            console.log(err);
            
            setSnackBarErrorOpen(true)
        })
        
    }

    return(<div className="max-w-7xl min-h-[80vh] mx-auto flex justify-center items-center">
        <div className="w-96 h-96 border flex flex-col gap-3 border-secondary rounded-sm p-3">
            <div className="flex items-center justify-center gap-3 ">
                <Lock size={64} />
                <p className="font-bold text-xl">New Password</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <p className="px-1" >Enter a new password below to change your password.</p>
                <TextField label="New Password" {...register("password",{required: "Password is required", min: 6})} />
                {errors.password && <span className="text-red-600 text-sm ms-3" >{errors.password.message}</span>}
                <TextField label="Confirm Password"{...register("passwordConfirm",{  required: "Confirm Password is required",min: 6 , validate: (val: string) => {
                                if (watch('password') != val) {
                                  return "Your passwords do no match ";
                                }
                              }, 
                            })} />
                {errors.passwordConfirm && <span className="text-red-600 text-sm ms-3" >{errors.passwordConfirm.message}</span>}
                <Button variant="contained" type="submit">Change Password</Button>
            </form>

        </div>

        <Snackbar open={snackBarSuccesOpen} autoHideDuration={6000} onClose={snackBarSuccesClose}>
            <Alert
                onClose={snackBarSuccesClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                SUCCES LOGIN
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
    </div>)
}