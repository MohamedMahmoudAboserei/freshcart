import React, { useEffect, useState } from 'react'
import classes from './Categories.module.css'
import Loader from '../Loader/Loader'
import axios from 'axios'
import BackStep from '../BackStep/BackStep'

export default function Categories() {
    useEffect(() => {
    document.title='Categories'
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const [isLoader, setIsLoader] = useState(false)

    async function getCategories() {
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

    useEffect(() => {
        getCategories()
    },[])

    return <>
        <div className='container mx-auto mb-20'>
            <BackStep />
            <h2 className='text-4xl font-bold text-emerald-500'>Categories</h2>
            {
                isLoader ? <div className='flex justify-center py-16'>
                    <Loader />
                </div>
                    :
                <div className="flex flex-wrap justify-center">
                    {
                        categories.map((category, index) => (
                            <div
                                key={index}
                                className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 mt-2'
                            >
                                <div className='rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-gray-400 transition-shadow duration-300'>
                                    <img
                                        src={category?.image}
                                        className='w-full h-96'
                                        alt={category?.name}
                                    />
                                    <p className='text-center text-main text-2xl mt-2'>{category?.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    </>
}