import { Alert, Button, Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from "@mui/material";
import { Bath, BedDouble, Camera,  ImageUpIcon, ParkingMeter, Refrigerator, Trash, Tv, Usb, UtensilsCrossed, Wifi } from "lucide-react";
import ShowImage from "../ShowImage";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactImageUploading from "react-images-uploading";
import { useCreateBookMutation, useGetBookQuery } from "@/store/book/bookApi";
import { useRouter } from "next/navigation";

export default function AddBook({bookId,data}:{bookId:string|null,data:BookModel|undefined}){
    // const isUpdate = "true"
    const router = useRouter()

    const [createBook,resCreateBook] = useCreateBookMutation()

    const [isUpdate,setIsUpdate] = useState(bookId ? true : false)
    const [showImage,setShowImage]= useState(false)
    const [snackBarSuccesOpen,setSnackBarSuccesOpen] = useState(false)
    const [snackBarErrorOpen,setSnackBarErrorOpen] = useState(false)
    const [images, setImages] = useState<{data_url:string,file:any}[]>([]);
    const [updateImage,setUpdateImage] = useState([])
    const maxNumber = 5;

    const {
        register,
        handleSubmit,
        watch,
        getValues,
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
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
        
    const onSubmit: SubmitHandler<BookModel> =async (data) => {
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
            console.log("FFFF::",formData.getAll("roomFacilities"));
            await createBook(formData).unwrap().then(() => {
                setSnackBarSuccesOpen(true)
                router.back()
            }).catch(() => {
                setSnackBarErrorOpen(true)
            })

        }

    }
    
    async function bookDataGet(){
        if(data){
            
            setValue("description",data.description)
            setValue("title",data.title)
            setValue("slug",data.slug)
            setValue("totalRoom",data.totalRoom)
            setUpdateImage(data.images!)
            setValue("location",data.location)
            setValue("price",data.price)
            setValue("roomFacilities.bathroom",data.roomFacilities.bathroom)
            setValue("roomFacilities.bedroom",data.roomFacilities.bedroom)
            setValue("roomFacilities.diningRoom",data.roomFacilities.diningRoom)
            setValue("roomFacilities.livingRoom",data.roomFacilities.livingRoom)
            setValue("roomFacilities.refrigerator",data.roomFacilities.refrigerator)
            setValue("roomFacilities.tv",data.roomFacilities.tv)
        }
    }

    useEffect(() => {
        bookDataGet()
    },[bookId,data])

    return (<div>
            {/* ********************************** */}
            { !(isUpdate) && <div className="flex gap-3 mb-10 ">
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

           {isUpdate ?
                <div key={1} className="flex gap-3 mb-5">
                    {
                        updateImage.map((image,index) => {
                            return (<div>
                                <img key={index} src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image}`} className="w-64 h-40 border-2 border-secondary rounded-xl mb-1" alt="book images" />
                                <div className="flex justify-around gap-3">
                                    <Button variant="contained" color="error" ><Trash/></Button>
                                    <Button variant="contained"  ><ImageUpIcon/></Button>
                                </div>
                            </div>)
                        })
                    }
                    
                </div>
            :<></>}

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
                                    required={getValues("roomFacilities.bedroom.active")}
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
                                required={getValues("roomFacilities.livingRoom.active")}
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
                                required={getValues("roomFacilities.bathroom.active")}
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
                                required={getValues("roomFacilities.diningRoom.active")}
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
                                required={getValues("roomFacilities.wifiSpeed.active")}
                                startAdornment={<InputAdornment position="start"><Wifi/></InputAdornment>}
                                label="mbp/s"
                                {...register("roomFacilities.wifiSpeed.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.wifiSpeed.active")}/>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="UnitReady">Unit Ready</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                id="UnitReady"
                                required={getValues("roomFacilities.unityReady.active")}
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
                                required={getValues("roomFacilities.refrigerator.active")}
                                startAdornment={<InputAdornment position="start"><Refrigerator/></InputAdornment>}
                                label="Refrigerator"
                                {...register("roomFacilities.refrigerator.value")}
                                />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Active" {...register("roomFacilities.unityReady.active")}/>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <FormControl className="flex-1">
                            <InputLabel htmlFor="Tv">Tv</InputLabel>
                            <OutlinedInput
                                type="number"
                                defaultValue={0}
                                id="Tv"
                                required={getValues("roomFacilities.tv.active")}
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
            <Button variant="contained" type="submit" >+Add Room</Button>
        </div>

        <ShowImage open={showImage} setOpen={setShowImage} />
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
                ERROR : 5 PICTURES MUST BE ADDED
            </Alert>
        </Snackbar>

    </form>
</div>
    )
}