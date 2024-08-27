import React, { useEffect, useState } from 'react'
import classes from './NotFound.module.css'
import notFound from '../../assets/img/Oops! 404 Error.png'
import BackStep from '../BackStep/BackStep'
import { Link } from 'react-router-dom'

export default function NotFound() {
    useEffect(() => {
    document.title='NotFound'
    })

    return <>
        <section className="grid h-full Container mb-20">
            <div className="container max-md:ml-4">
                <BackStep replace={true} />
            </div>
            <div className="h-full flex flex-col items-center justify-center">
                <img src={notFound} alt="Page Not Found" />
                <h3 className='text-2xl font-bold mb-4'>
                    404, Page not founds
                </h3>
                <p className='max-md:w-4/5 text-gray-600 text-base text-center'>
                    Something went wrong. It’s look that your requested could not be found. It’s look like the link is broken or the page is removed.
                </p>
                <Link to={'/'} className='bg-[#0aad0a] text-white p-4 rounded-xl'>Go To My Home <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
        </section>
    </>
}