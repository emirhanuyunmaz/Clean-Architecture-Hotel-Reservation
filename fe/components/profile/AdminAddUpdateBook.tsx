import { Alert, Button, Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from "@mui/material";
import { Bath, BedDouble, Camera,  ImageUpIcon, ParkingMeter, Refrigerator, Trash, Tv, Usb, UtensilsCrossed, Wifi } from "lucide-react";
import ShowImage from "../ShowImage";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactImageUploading from "react-images-uploading";
import { useAddBookSingleImageMutation, useCreateBookMutation, useDeleteBookSingleImageMutation, useGetBookQuery, useUpdateBookMutation, useUpdateBookSingleImageMutation } from "@/store/book/bookApi";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminAddUpdateBook(){
    
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const [createBook,resCreateBook] = useCreateBookMutation()
    const [updateBook,resUpdateBook] = useUpdateBookMutation()
    const [updateBookSingleImage,resUpdateSingleImage] = useUpdateBookSingleImageMutation()
    const getBook = useGetBookQuery(searchParams.get("id"))
    const [addBookSingleImage,resAddBookSingleImage] = useAddBookSingleImageMutation()
    const [deleteBookSingleImge,resDeleteSingleImage] = useDeleteBookSingleImageMutation()

    const [showImage,setShowImage]= useState(false)
    const [snackBarSuccesOpen,setSnackBarSuccesOpen] = useState(false)
    const [snackBarErrorOpen,setSnackBarErrorOpen] = useState(false)
    const [images, setImages] = useState<{data_url:string,file:any}[]>([]);
    const [updateImage,setUpdateImage] = useState([])
    const maxNumber = 5;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<BookModel>()

    const snackBarSuccesClose = () => {
        setSnackBarSuccesOpen(false);
      };
      const snackBarErrorClose = () => {
        setSnackBarErrorOpen(false);
      };

    const onChange = (imageList:any, addUpdateIndex:any) => {
        setImages(imageList);
    };

    const addSingleImage = async(event:ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()
        formData.append("id",searchParams.get("id")!)
        formData.append("newImage",event.target.files![0])
        await addBookSingleImage(formData).unwrap()
        .then(async() => {
            await getBook.refetch()
        })
        .catch((err) => {
            console.log("ERR",err);

        })
    }

    const deleteSingleImage = async (imageName:string) => {
        console.log("DEL:",imageName);
        
        await deleteBookSingleImge({imageName:imageName,id:searchParams.get("id")}).unwrap()
        .then(async() => {
            await getBook.refetch()
        })
        .catch((err) => {
            console.log("ERR:",err);
        })
    }

    const updateSingleImage = async ({event,imageName}:{event:ChangeEvent<HTMLInputElement>,imageName:string}) => {
        try{            
            const formData = new FormData()
            formData.append("oldImageName",imageName)
            formData.append("newImage",event.target.files![0])
            formData.append("id",searchParams.get("id")!)
            await updateBookSingleImage(formData).unwrap()
            .then(async(res) => {
                await getBook.refetch()
            })
            .catch((err) => {
                console.log("ERR",err);
            })

        }catch(err){
            console.log("ERR:",err);
        }
    }
        
    const onSubmit: SubmitHandler<BookModel> = async (data) => {
        try{
            // const formData = new FormData()

            if(getBook.data){

                await updateBook({...data,id:searchParams.get("id")}).unwrap().
                then(() => {
                    setSnackBarSuccesOpen(true)

                }).catch((err) => {
                    console.log(err);
                    setSnackBarErrorOpen(true)
                })
            }else{
                console.log("::CREATE::");

                if(images.length < 5){
                    setSnackBarErrorOpen(true)
                }else{
                    const image = images.map(item => item.file )
                    const formData = new FormData()
        
                    Object.entries(data).forEach(([key, value]) => {
                        if (typeof value === "object") return; 
                        formData.append(key, value as string);
                    });

                    image.forEach(image_data => formData.append(`images`,image_data))
                    
                    Object.entries(data.roomFacilities).forEach(([key, value]) => {
                        formData.append(`roomFacilities[${key}][active]`, `${value.active}`);
                        formData.append(`roomFacilities[${key}][value]`, value.value.toString());
                    });

                    await createBook(formData).unwrap().then(() => {
                        setSnackBarSuccesOpen(true)
                        router.back()
                    }).catch(() => {
                        setSnackBarErrorOpen(true)
                    })
        
                }
            }
        }catch(err){
            console.log("ERR:",err);
            
        }

    }
    
    async function bookDataGet(){
        if(getBook.isSuccess){
            setValue("description",getBook.data.description)
            setValue("title",getBook.data.title)
            setValue("slug",getBook.data.slug)
            setValue("totalRoom",getBook.data.totalRoom)
            setUpdateImage(getBook.data.images!)
            setValue("location",getBook.data.location)
            setValue("price",getBook.data.price)
            setValue("roomFacilities.bathroom.active",getBook.data.roomFacilities.bathroom.active)
            setValue("roomFacilities.bathroom.value",getBook.data.roomFacilities.bathroom.value)
            setValue("roomFacilities.bedroom.active",getBook.data.roomFacilities.bedroom.active)
            setValue("roomFacilities.bedroom.value",getBook.data.roomFacilities.bedroom.value)
            setValue("roomFacilities.diningRoom.active",getBook.data.roomFacilities.diningRoom.active)
            setValue("roomFacilities.diningRoom.value",getBook.data.roomFacilities.diningRoom.value)
            setValue("roomFacilities.livingRoom.active",getBook.data.roomFacilities.livingRoom.active)
            setValue("roomFacilities.livingRoom.value",getBook.data.roomFacilities.livingRoom.value)
            setValue("roomFacilities.refrigerator.active",getBook.data.roomFacilities.refrigerator.active)
            setValue("roomFacilities.refrigerator.value",getBook.data.roomFacilities.refrigerator.value)
            setValue("roomFacilities.tv.active",getBook.data.roomFacilities.tv.active)
            setValue("roomFacilities.tv.value",getBook.data.roomFacilities.tv.value)
        }
    }

    useEffect(() => {
        bookDataGet()
    },[getBook.isFetching,getBook.isSuccess,getBook.data?.images])

    return (<div>
            {/* ********************************** */}
            {updateImage.length == 0 && <div className="flex gap-3 mb-10 ">
                <ReactImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                >
                {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                }) => (
                // write your building UI
                <div className="upload__image-wrapper flex gap-10  overflow-y-auto">
                    <div className="flex flex-col">
                        <button
                        className="flex flex-col hover:font-bold justify-center items-center w-40 h-40 border-2 rounded-xl transition-all"
                        onClick={onImageUpload}
                        {...dragProps}
                        >

                            <Camera/>
                            <p>Add Image</p>
                        </button>
                        &nbsp;
                        <Button variant="contained" color="error" className="flex" onClick={onImageRemoveAll}>Delete All Image</Button>
                        </div>
                    {imageList.map((image, index) => (
                    <div key={index} className="image-item ">
                        <img src={image['data_url']} alt="" width="100" className="w-40 h-40 border-2 rounded-xl" />
                        <div className="image-item__btn-wrapper flex justify-around">                    
                            <Button onClick={() => onImageUpdate(index)} variant="contained" color="info"><ImageUpIcon/></Button>
                            <Button onClick={() => onImageRemove(index)} variant="contained" color="error"><Trash/></Button>
                        </div>
                    </div>
                    ))}
                </div>
                )}
                </ReactImageUploading>
            </div>}
            {/* *********************************** */}
            <div className="flex gap-3">
                {
                    updateImage.length != 5 && updateImage.length != 0 &&<> <label htmlFor="addNewImage" className="w-40 h-40 cursor-pointer hover:font-bold border border-secondary flex flex-col rounded-xl justify-center items-center">
                        <Camera/>
                        <p>Add Image</p>
                    </label >
                    <input onChange={(e) => addSingleImage(e)} id="addNewImage" type="file" accept=".png, .jpg, .jpeg"  hidden/>
                    </>
                }

                {updateImage.length > 0 &&
                        <div className="flex gap-3 mb-5">
                            {
                                updateImage.map((image,index) => 
                                    <div key={index}>
                                        <img  src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads${image}`} className="w-64 h-40 border-2 border-secondary rounded-xl mb-1" alt="book images" />
                                        <div className="flex justify-around gap-3">
                                            <Button  onClick={() => deleteSingleImage(image)} variant="contained" color="error" ><Trash/></Button>
                                            <label htmlFor={`uploadImage${index}`} className="bg-primary text-white px-3 py-2 rounded-lg hover:opacity-70 transition-all cursor-pointer" ><ImageUpIcon/></label>
                                     
                                            <input onChange={(e) => updateSingleImage({event:e,imageName:image})} id={`uploadImage${index}`} type="file" accept=".png, .jpg, .jpeg"  hidden />
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                }

            </div>

        <form onSubmit={handleSubmit(onSubmit)}>
        


        <div className="flex flex-col gap-3">

        
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex flex-col flex-1">
                    <TextField slotProps={{ inputLabel: { shrink: true } }} {...register("title",{required: "Title is required", min: 2 })} label="Title" className="flex-1" />
                    {errors.title && <span className="text-red-600 text-sm ms-3" >{errors.title.message}</span>}
                </div>
                <div className="flex flex-col flex-1">
                    <TextField slotProps={{ inputLabel: { shrink: true } }} {...register("slug",{required: "Slug is required", min: 2 })} label="Slug" className="flex-1" />
                    {errors.slug && <span className="text-red-600 text-sm ms-3" >{errors.slug.message}</span>}
                </div>
                <div className="flex flex-col flex-1">
                    <TextField slotProps={{ inputLabel: { shrink: true } }} label="Locaiton" className="flex-1" {...register("location",{required: "Location is required", min: 2 })}/>
                    {errors.location && <span className="text-red-600 text-sm ms-3" >{errors.location.message}</span>}
                </div>
                <div className="flex flex-col flex-1">
                    <TextField slotProps={{ inputLabel: { shrink: true } }} label="Total Room Count" type="number"
                    defaultValue={0} className="flex-1" {...register("totalRoom",{required: "Total Room is required and min value 1", min: 1 })} />
                    {errors.totalRoom && <span className="text-red-600 text-sm ms-3" >{errors.totalRoom.message}</span>}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
                
                <div className="flex md:w-1/2 flex-col gap-3">
                    <FormControl className="flex-1">
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <OutlinedInput
                            type="number"
                            defaultValue={0}
                            {...register("price",{required: "Price is required and min value 1", min: 1 })}
                            id="price"
                            onWheel={(event) => window.scrollBy(0, event.deltaY)}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="price"
                            />
                        {errors.price && <span className="text-red-600 text-sm ms-3" >{errors.price.message}</span>}
                    </FormControl>
                    
                    <div className="flex flex-col flex-1">
                        <TextField
                            slotProps={{ inputLabel: { shrink: true } }}
                            className="flex-1"
                            label="Description"
                            multiline
                            rows={18}
                            {...register("description",{required: "Description is required", min: 1 })}
                            />
                        {errors.description && <span className="text-red-600 text-sm ms-3" >{errors.description.message}</span>}
                    </div>

                </div>


                <div className="flex flex-col md:w-1/2 gap-3 md:border-l-2 ps-3">
                    
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col flex-1">
                            <FormControl className="flex-1">
                                <InputLabel htmlFor="Bedroom">Bedroom</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    defaultValue={0}
                                    
                                    id="Bedroom"
                                    startAdornment={<InputAdornment position="start"><BedDouble/></InputAdornment>}
                                    label="Bedroom"
                                    {...register("roomFacilities.bedroom.value")}
                                    />
                            </FormControl>
                        </div>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.bedroom.active")}/>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="LivingRoom">Living Room</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                
                                id="LivingRoom"
                                startAdornment={<InputAdornment position="start"><ParkingMeter/></InputAdornment>}
                                label="Living Room"
                                {...register("roomFacilities.livingRoom.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.livingRoom.active")} />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="Bathroom">Bathroom</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                id="Bathroom"
                                
                                startAdornment={<InputAdornment position="start"><Bath/></InputAdornment>}
                                label="Bathroom"
                                {...register("roomFacilities.bathroom.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.bathroom.active")}/>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="DiningRoom">Dining Room</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                id="DiningRoom"
                                
                                startAdornment={<InputAdornment position="start"><UtensilsCrossed/></InputAdornment>}
                                label="Dining Room"
                                {...register("roomFacilities.diningRoom.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.diningRoom.active")}/>
                    </div>

                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="wifi">mbp/s</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                id="wifi"
                                
                                startAdornment={<InputAdornment position="start"><Wifi/></InputAdornment>}
                                label="mbp/s"
                                {...register("roomFacilities.wifiSpeed.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />}  label="Active" {...register("roomFacilities.wifiSpeed.active")}/>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="UnitReady">Unit Ready</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                id="UnitReady"
                                
                                startAdornment={<InputAdornment position="start"><Usb/></InputAdornment>}
                                label="Unit Ready"
                                {...register("roomFacilities.unityReady.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.unityReady.active")} />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="Refrigerator">Refrigerator</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                id="Refrigerator"
                                
                                startAdornment={<InputAdornment position="start"><Refrigerator/></InputAdornment>}
                                label="Refrigerator"
                                {...register("roomFacilities.refrigerator.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.refrigerator.active")}/>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="Tv">Tv</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                id="Tv"
                                
                                startAdornment={<InputAdornment position="start"><Tv/></InputAdornment>}
                                label="Tv"
                                {...register("roomFacilities.tv.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.tv.active")}/>
                    </div>

                </div>
            </div>

        </div>
        <div className="w-full flex my-10 justify-end">
            <Button variant="contained" type="submit" >{getBook.data ? "Update" :"+Add Room"}</Button>
        </div>

        <ShowImage open={showImage} setOpen={setShowImage} />
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
                ERROR : 5 PICTURES MUST BE ADDED
            </Alert>
        </Snackbar>

    </form>
</div>
    )
}