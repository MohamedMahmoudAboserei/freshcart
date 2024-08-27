import React, { useEffect, useState } from 'react'
import classes from './RelatedProducts.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Product from '../Product/Product'
import Loader from '../Loader/Loader'
import Slider from 'react-slick'
import SliderProduct from '../SliderProduct/SliderProduct'

export default function RelatedProducts() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [isLoader, setIsLoader] = useState(false)
    const {category} = useParams();

    async function getRelatedProducts() {
        setIsLoader(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            const res = data.data.filter(product => product.category.name == category)
            setProducts(res);
        } catch (error) {
            setError(error.response.data.message)
            setProducts([])
            setError(null)
        } finally {
            setIsLoader(false)
        }
    }

    const Related = {
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
        getRelatedProducts();
    }, [])

    return <>
        <section className='py-20'>
            <div className="container">
                <h2 className='text-4xl font-bold py-6 text-emerald-500'>Related Products</h2>
                {isLoader ? (
                    <div className='flex justify-center py-16'>
                        <Loader />
                    </div>
                ) : error ? (
                    <div className='alert'>{error}</div>
                ) : (
                    <Slider {...Related}>
                        {products.map((product) => (
                            <SliderProduct key={product.id} product={product}  />
                        ))}
                    </Slider>
                )}
            </div>
        </section>
    </>
}