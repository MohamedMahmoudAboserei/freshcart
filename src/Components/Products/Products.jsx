import React, { useEffect, useState } from 'react'
import classes from './Products.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Product from '../Product/Product'
import BackStep from '../BackStep/BackStep'

export default function Products() {
    useEffect(() => {
    document.title='Products'
    })

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [isLoader, setIsLoader] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <section className=''>
            <div className="container">
                <BackStep />
                <h2 className='text-4xl font-bold text-emerald-500'>Products</h2>
                <div className="flex justify-center my-4 relative w-11/12 md:w-1/2 mx-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 rounded w-full text-center pl-10 outline-none"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                {
                    isLoader ?
                        <div className='flex justify-center py-16'>
                            <Loader />
                        </div>    
                        :
                        error ? (<div className='alert'>{error}</div>) :
                            (
                        <div className="max-sm:w-full max-md:w-2/3 flex-row md:mx-auto flex max-md:flex-col md:flex-wrap">
                            {filteredProducts.map((product) => (
                                <Product key={product.id} product={product} />
                            ))}
                        </div>
                    )
                }
            </div>
        </section>
    </>
}