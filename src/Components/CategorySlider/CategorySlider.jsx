import React, { useEffect, useState } from 'react'
import classes from './CategorySlider.module.css'
import axios from 'axios'
import Slider from 'react-slick'
import Loader from '../Loader/Loader'

export default function CategorySlider() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const [isLoader, setIsLoader] = useState(false)

    async function getRecentCategories() {
        setIsLoader(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCategories(data.data);
        } catch (error) {
            setError(error.response.data.message)
            setCategories([])
            setError(null)
        } finally {
            setIsLoader(false)
        }
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 600,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        getRecentCategories()
    },[])

    return <>
        <section className='py-0'>
            <div className="container">
                <h2 className='text-2xl font-bold py-0 text-emerald-500'>
                    Popular Categories
                </h2>
                {categories.length ?
                    <Slider {...settings}>
                    {categories?.map((category, index) => <div key={index}>
                        <img src={category.image} className="w-full h-[250px] my-4" alt='{productDetails.title}' />
                        <h3 className='text-center mb-4 text-lg'>{category.name}</h3>
                    </div>)}
                </Slider>
                :
                    <div className='flex justify-center py-16'>
                        <Loader />
                    </div> 
                }
            </div>
        </section>
    </>
}