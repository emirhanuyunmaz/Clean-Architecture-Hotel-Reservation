'use client'
import { TextField } from "@mui/material";
import { useState } from "react";
import ImageUploading from 'react-images-uploading';


export default function Page(){
    const [images, setImages] = useState([]);
    const maxNumber = 69;
  
    const onChange = (imageList:any, addUpdateIndex:any) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };


    return (<div className="mt-10">
        
        <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col gap-3">

                <div className="flex gap-3">
                    <TextField label="Title" className="flex-1" />
                    <TextField label="Location" className="flex-1"/>

                </div>
                <div className="flex gap-3">
                    <TextField label="Price" className="flex-1"/>
                    <TextField label="Description" className="flex-1"/>
                </div>

                <div className="App">
                    <ImageUploading
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
                        <div className="upload__image-wrapper">
                            <button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                            >
                            Click or Drop here
                            </button>
                            &nbsp;
                            <button onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                    </ImageUploading>
                </div>


            </div>
        </div>




    </div>)
}