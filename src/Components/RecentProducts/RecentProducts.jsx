import React, { useEffect, useState } from 'react'
import classes from './RecentProducts.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Product from '../Product/Product'

export default function RecentProducts() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [isLoader, setIsLoader] = useState(false)
    
    async function getRecentProducts() {
        setIsLoader(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            setProducts(data.data);
        } catch (error) {
            setError(error.response.data.message)
            setProducts([])
            setError(null)
        } finally {
            setIsLoader(false)
        }
    }
    useEffect(() => {
        getRecentProducts();
    }, [])

    return <>
        <section className='mb-5'>
            <div className="container">
                <h2 className='text-2xl font-bold py-6 text-emerald-500'>Recent Products</h2>
                {
                    isLoader ?
                        <div className='flex justify-center py-16'>
                            <Loader />
                        </div>    
                        :
                        error ? (<div className='alert'>{error}</div>) :
                            (
                        <div className="max-sm:w-full  max-md:w-2/3 max-lg:w-1/2 mx-auto flex max-md:flex-col md:flex-wrap">
                    {
                        products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))
                    }
                </div>
                    )
                }
            </div>
        </section>
    </>
}