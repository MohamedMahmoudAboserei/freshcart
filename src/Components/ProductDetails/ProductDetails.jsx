import React, { useContext, useEffect, useState } from 'react'
import classes from './ProductDetails.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import RelatedProducts from '../RelatedProducts/RelatedProducts'
import Slider from 'react-slick'
import BackStep from '../BackStep/BackStep'
import { CartContext } from '../../context/CartContext'
import { WishListContext } from '../../context/WishlistContext'

export default function ProductDetails() {
    useEffect(() => {
        document.title = 'ProductDetails'
    })
    const [productDetails, setProductDetails] = useState({})
    const [error, setError] = useState(null)
    const [isLoader, setIsLoader] = useState(false)
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const { addProductToWishList, wishlist } = useContext(WishListContext);
    const [localWishList, setLocalWishList] = useState([]);

    useEffect(() => {
        if (wishlist && wishlist.data) {
            setLocalWishList(wishlist.data);
        }
    }, [wishlist]);

    const isProductInWishList = (productId) => {
    return localWishList.find(product => product._id === productId);
    };

    const handleAddToWishList = (productId) => {
        if (isProductInWishList(productId)) {
        
        setLocalWishList(prevList => prevList.filter(product => product._id !== productId));
        } else {
        
        addProductToWishList(productId);
        setLocalWishList(prevList => [...prevList, { _id: productId }]); 
        }
    };

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

    async function getProductDetails(id) {
        setIsLoader(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setProductDetails(data.data);
        } catch (error) {
            setError(error.response.data.message)
            setProductDetails([])
            setError(null)
        } finally {
            setIsLoader(false)
        }
    }

    useEffect(() => {
        getProductDetails(id);
    }, [id])

    return <>
        <section className=''>
            <div className="container">
                {
                    isLoader ?
                        <div className='flex justify-center py-16'>
                            <Loader />
                        </div>
                        :
                        error ? (<div className='alert'>{error}</div>) :
                            <>
                                <BackStep replace={false} />
                                <div className='md:flex justify-center items-start mt-1'>
                                    <div className='md:w-1/3 md:pr-4'>
                                        <Slider {...settings}>
                                            {productDetails.images?.map((image, index) => <img key={index} src={image} className="w-full" alt={productDetails.title} />)}
                                        </Slider>
                                    </div>
                                    <div className='md:w-2/3 max-md:mt-6'>
                                        <div className="flex mb-4 space-x-10">
                                            <h4 className=''>
                                                <i className='fas fa-star rating-color text-yellow-400'></i> {productDetails.ratingsAverage}
                                            </h4>
                                            <button onClick={() => handleAddToWishList(productDetails.id)} className="cursor-pointer transition-all duration-300 group-hover:visible text-gray-700 hover:text-red-400">
                                                <i className={`fa-solid fa-heart fa-xl ${isProductInWishList(productDetails.id) ? 'text-red-600' : 'text-black'}`}></i>
                                            </button>
                                            <div className="">
                                                Availability: <span className='text-green-400'>  In Stock </span>
                                            </div>
                                        </div>
                                        <h2 className='text-2xl mb-2'>
                                            <span className='font-bold'>Product Details</span> : <span className='text-[#0aad0a] font-bold'> {productDetails.title} </span>
                                        </h2>
                                        <h4 className="text-main text-sm font-semibold">
                                            {productDetails.category?.name}
                                        </h4>
                                        <p className=" text-gray-500">
                                            {productDetails.description}
                                        </p>
                                        <div className="flex justify-between mt-2 mb-6">
                                            <h4 className=''>
                                                <span className='text-3xl font-bold text-[#0aad0a]'>{productDetails.price}</span> EGP
                                            </h4>
                                        </div>
                                        <button onClick={() => addToCart(productDetails.id)} className='w-full bg-green-600 text-white p-2 rounded-md mb-2'>Add To Cart</button>
                                    </div>
                                </div>
                            </>
                }
            </div>
        </section>
        <section className='Py-5'>
            <RelatedProducts />
        </section>
    </>
}