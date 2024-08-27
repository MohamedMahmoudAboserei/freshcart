import React, { useEffect, useState } from 'react'
import classes from './Footer.module.css'

import amazonPay from "../../assets/img/amazon-pay-logo.svg";
import americanExpress from "../../assets/img/american-express.png";
import card from "../../assets/img/card.png";
import paypal from "../../assets/img/paypal.png";
import apple from "../../assets/img/available.png";
import google from "../../assets/img/google-play.svg";

export default function Footer() {

    return <>
        <footer className='bg-slate-200 pt-12 pb-14'>
            <div className="container max-sm:w-4/5">
                <h4 className="text-xl mb-1">Get the Fresh Cart app</h4>
                <p className="text-sm text-gray-500">
                    We will send you a link, open it on your phone to download the app.
                </p>
                <div className="md:flex mt-3 md:ml-3 items-center max-sm:space-y-4 md:space-x-6 mb-6">
                    <input className="p-2 w-10/12 outline-none rounded-lg" type="text" placeholder="Email..." />
                    <button className="max-md:mt-4  bg-gray-700 py-2 px-10 rounded-lg hover:bg-green-600 text-white duration-500">Share App Link</button>
                </div>
                <div className="flex items-center justify-between my-10 border border-gray-300 border-r-0 border-l-0 font-medium flex-wrap xl:flex-nowrap py-4">
                    <div className="flex items-center gap-3 grow xl:justify-start justify-center flex-wrap md:flex-nowrap max-sm:mb-4">
                        Payment Partners
                        <img src={amazonPay} alt="Amazon Pay logo" width={40} />
                        <img src={americanExpress} alt="American Express logo" width={50} />
                        <img src={card} alt="Master Card logo" width={40} />
                        <img src={paypal} alt="Paypal logo" width={50} />
                    </div>
                    <div className="flex items-center gap-x-3 grow xl:justify-end justify-center md:h-20 flex-wrap md:flex-nowrap">
                        <p className="max-sm:w-full max-sm:text-center">
                            Get deliveries with FreshCart
                        </p>
                        <img src={apple} alt="Apple Store logo" className="md:max-w-[150px] max-w-20" />
                        <img src={google} alt="Google Store logo" className="md:max-w-[150px] max-w-20" />
                    </div>
                </div>
            </div>
        </footer>
    </>
}