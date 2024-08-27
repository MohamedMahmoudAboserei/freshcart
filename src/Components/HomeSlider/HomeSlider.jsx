import React, { useEffect, useState } from 'react'
import classes from './HomeSlider.module.css'
import Slider from "react-slick";
import Slider1 from '../../assets/img/slider-image-1.jpeg';
import Slider2 from '../../assets/img/slider-image-2.jpeg';
import Slider3 from '../../assets/img/slider-image-3.jpeg';
import Slider4 from '../../assets/img/slider-2.jpeg';
import Slider5 from '../../assets/img/blog-img-1.jpeg';

export default function HomeSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 1000
    };

    return <>
        <header className='pb-5'>
            <div className="container">
                <div className="md:flex max-md:space-y-2 md:space-x-2">
                    <div className=" max-md:w-full w-3/4">
                        <Slider {...settings}>
                            <img src={Slider1} alt="Slider1" className='w-full h-[400px]' />
                            <img src={Slider2} alt="Slider2" className='w-full h-[400px]' />
                            <img src={Slider3} alt="Slider3" className='w-full h-[400px]' />
                        </Slider>
                    </div>
                    <div className=" max-md:w-full max-md:space-y-2 md:w-1/4 md:space-y-2">
                        <img src={Slider4} alt="slider-image-4" className="h-[195px] w-full" />
                        <img src={Slider5} alt="slider-image-5" className="h-[195px] w-full" />
                    </div>
                </div>
            </div>
        </header>
    </>
}