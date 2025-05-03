"use client"
import { useBookPaymentPriceMutation, useGetBookQuery } from "@/store/book/bookApi";
import { RootState } from "@/store/store";
import { Alert, Button, Snackbar,  TextField } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { redirect } from 'next/navigation'


export default function Page(){
    const selector = useSelector((state:RootState) => state!.reservation )
    
    const [paymentPriceBook,resPaymentPriceBoook] = useBookPaymentPriceMutation()
    const getBook = useGetBookQuery(selector.bookID)

    const [snackBarSuccesOpen,setSnackBarSuccesOpen] = useState(false)
    const [snackBarErrorOpen,setSnackBarErrorOpen] = useState(false)
    const startDay = dayjs(selector.startDay as string) 
    const endDay = dayjs(selector.endDay as string)
    const totalDay = endDay.diff(startDay,"hours") / 24
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<BookPaymentModel>()
    

    const snackBarSuccesClose = () => {
        setSnackBarSuccesOpen(false);
    };
    const snackBarErrorClose = () => {
        setSnackBarErrorOpen(false);
    };
    
    const onSubmit: SubmitHandler<BookPaymentModel> =async (data) => {
        console.log("DDAATTAA::",data);

        const newData:BookPaymentModel = {
            ...data,
            Price:{
                person:1,
                roomPrice:Number(getBook.data!.price),
                totalDay:totalDay
            },
            Reservation:{
                startDay:selector.startDay as string,
                endDay:selector.endDay as string,
                bookID:selector.bookID as string
            }
        }
        await paymentPriceBook(newData).unwrap()
        .then(() => {
            setSnackBarSuccesOpen(true)
        })
        .catch((err) => {
            console.log("ERR:",err);
            
            setSnackBarErrorOpen(true)

        })

    }
    if (selector.bookID == null){
        redirect("/hotels")
    }

    return (<div className="md:max-w-7xl mx-auto mt-10">
        

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-5 p-3">            
            <div className="flex flex-col gap-3 w-full md:w-3/4">
                <div>
                    <h1 className="font-bold text-3xl" >Let's Make Payment</h1>
                    <p className="text-lg md:w-3/4">
                        To start your subjection , input your card details to make payment.
                        You will'be redirect to your banks authorization page .
                    </p>
                </div>

                <div className="flex flex-col md:flex-row  gap-3">
                    
                    {/* User */}
                    <div className="flex flex-col gap-3 w-full md:w-1/2">
                        <h2 className="font-bold" >USER</h2>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex flex-col">
                                <TextField label="Name" {...register("Buyer.name",{required: "Name is required" })}  />
                                {errors.Buyer?.name && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.name.message}</span>}
                            </div>
                            <div className="flex flex-col">
                                <TextField label="Surname" {...register("Buyer.surname",{required: "Surname is required" })} />
                                {errors.Buyer?.surname && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.surname.message}</span>}
                            
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <TextField type="tel" label="Phone Number" {...register("Buyer.gsmNumber",{required: "Phone Number is required" })}/>
                            {errors.Buyer?.gsmNumber && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.gsmNumber.message}</span>}
                        </div>
                        <div className="flex flex-col">
                            <TextField label="Email" {...register("Buyer.email",{required: "Email is required" })}/>
                            {errors.Buyer?.email && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.email.message}</span>}
                        </div>
                        <div className="flex flex-col">
                            <TextField type="number" label="Identity Number" {...register("Buyer.identityNumber",{required: "Identity Number is required" })}/>
                            {errors.Buyer?.identityNumber && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.identityNumber.message}</span>}
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex flex-col">
                                <TextField label="Country"{...register("Buyer.country",{required: "Country is required" })} />
                                {errors.Buyer?.country && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.country.message}</span>}
                            </div>
                            <div className="flex flex-col">
                                <TextField label="City" {...register("Buyer.city",{required: "City is required" })}/>
                                {errors.Buyer?.city && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.city.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <TextField type="number" label="Zip Code" {...register("Buyer.zipCode",{required: "Zip Code is required" })}/>
                            {errors.Buyer?.zipCode && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.zipCode.message}</span>}
                        </div>
                        <div className="flex flex-col">
                            <textarea  {...register("Buyer.registrationAddress",{required: "Address is required" })} placeholder="Address" className="outline-none border border-secondary rounded-md p-3 h-32 focus:border-blue-600 focus:border-2" />
                            {errors.Buyer?.registrationAddress && <span className="text-red-600 text-sm ms-3" >{errors.Buyer?.registrationAddress.message}</span>}

                        </div>
                    </div>
                    {/* User - END */}

                    {/* CARD */}
                    <div className="flex flex-col gap-3 w-full md:w-1/2">
                        <h2 className="font-bold" >CARD </h2>
                        <div className="flex flex-col">
                            <TextField type="number" label="Card Number"  {...register("PaymentCard.cardNumber",{required: "Card Number is required" })}/>
                            {errors.PaymentCard?.cardNumber && <span className="text-red-600 text-sm ms-3" >{errors.PaymentCard?.cardNumber.message}</span>}

                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex flex-col">
                                <TextField type="number" label="Expire Mounth" {...register("PaymentCard.expireMonth",{required: "Expire Mounth is required" })} />
                                {errors.PaymentCard?.expireMonth && <span className="text-red-600 text-sm ms-3" >{errors.PaymentCard?.expireMonth.message}</span>}

                            </div>
                            <div className="flex flex-col">
                                <TextField type="number" label="Expire Year" {...register("PaymentCard.expireYear",{required: "Expire Year is required" })}/>
                                {errors.PaymentCard?.expireYear && <span className="text-red-600 text-sm ms-3" >{errors.PaymentCard?.expireYear.message}</span>}

                            </div>
                        </div>
                        <div className="flex flex-col" >

                            <TextField type="number" label="CVC" {...register("PaymentCard.cvc",{required: "CVC is required" })} />
                            {errors.PaymentCard?.cvc && <span className="text-red-600 text-sm ms-3" >{errors.PaymentCard?.cvc.message}</span>}

                        </div>
                    </div>
                    {/* CARD-END */}

                </div>


            </div>

            <div className=" w-full md:w-1/4 flex flex-col justify-between gap-3 bg-gray-400 bg-opacity-25 p-3 md:p-5 rounded-xl" >
                <div>
                    <h2 className="font-bold text-gray-600">You are paying ;</h2>
                    <p className="text-5xl font-bold text-center ">${Number(getBook.data?.price) * totalDay * 1}</p>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-5">
                            <p className="font-bold">{getBook.data?.title}</p>
                            <p className="">{getBook.data?.location}</p>
                            <p className="">2 Person</p>
                        </div>
                    </div>
                </div>

                <div className="flex  ">
                    <Button type="submit" variant="contained" className="w-full bottom-0 m-3">Payment</Button>
                </div>
            </div>

        </form>
        <Snackbar open={snackBarSuccesOpen} autoHideDuration={6000} onClose={snackBarSuccesClose}>
            <Alert
                onClose={snackBarSuccesClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                SUCCES
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