'use client'
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageList({images}:{images:[]}) {
    const  [sliderRef,setSliderRef] = useState<Slider | null>(null);
    const next = () => {
      sliderRef!.slickNext();
    };
    const previous = () => {
      sliderRef!.slickPrev();
    };
  
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  return (<div className="relative w-full h-full slider-container">

    <Slider 
        ref={slider => {
           setSliderRef(slider);
        }} {...settings}
    >
        
    {
        images.map((image,index) => <div key={index} className="relative" >
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads${image}`} alt="" className="w-full h-96" />
        </div>)
    }
    </Slider>
    <div className=" flex justify-between">
        <button className="absolute left-0 top-1/2" onClick={previous}>
            <ChevronLeft />
        </button>
        <button className="absolute right-0 top-1/2" onClick={next}>
            <ChevronRight  />
        </button>
      </div>
  </div>
  );
}