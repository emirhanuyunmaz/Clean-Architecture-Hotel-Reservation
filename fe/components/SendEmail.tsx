'use client'
import { useSendEmailMutation } from "@/store/user/userApi";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Mail } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SendEmail({setControl}:{setControl:any}){

    const [snackBarSuccesOpen,setSnackBarSuccesOpen] = useState(false)
    const [snackBarErrorOpen,setSnackBarErrorOpen] = useState(false)
    const [sendEmail,resSendEmail] = useSendEmailMutation()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<sendEmailModel>()

    const snackBarSuccesClose = () => {
        setSnackBarSuccesOpen(false);
      };
      const snackBarErrorClose = () => {
        setSnackBarErrorOpen(false);
    };


    const onSubmit: SubmitHandler<sendEmailModel> =async (data) => {
        // console.log("DDAATTAA::",data);
        await sendEmail(data).unwrap()
        .then(() => {
            setSnackBarSuccesOpen(true)
            setControl(1)
        })
        .catch((err) => {            
            setSnackBarErrorOpen(true)
        })
        
    }


    return(<div className="min-h-[80vh] max-w-7xl mx-auto flex justify-center items-center">
        <div className="w-96 h-96 border-secondary border rounded-sm flex flex-col p-3 gap-3">
            <div className="flex items-center justify-center gap-3 ">
                <Mail size={64}/>
                <h3 className="font-bold text-xl">Send Email</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <p className="mx-2">You will receive instructions for resetting your password.</p>
                <TextField label="Your Email" {...register("email",{required: true, min: 6, max: 50 })}/>
                <Button type="submit" variant="contained">Send</Button>
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