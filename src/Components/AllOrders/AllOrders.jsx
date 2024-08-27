import React, { useEffect, useState } from 'react'
import classes from './AllOrders.module.css'
import BackStep from '../BackStep/BackStep'
import check from '../../assets/img/Frame 11.png'
import { Link } from 'react-router-dom'

export default function AllOrders() {
    useEffect(() => {
    document.title='AllOrders'
    })

    return <>
        <div className="container mb-36">
            <div className="max-md:ml-4 mb-4">
                <BackStep replace={false} />
            </div>
            <div className="text-center align-middle flex flex-col items-center mt-20 space-y-5">
                <img src={check} alt="check" className='' />
                <h2>Thank you for shopping</h2>
                <p>Your order has been successfully placed and is now being processed.</p>
                <Link to={'/'} className='bg-[#0aad0a] text-white p-4 rounded-xl'>Go To My Home <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
        </div>
    </>
} 