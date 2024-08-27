import React, { useContext, useEffect, useState } from 'react'
import classes from './CheckOut.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import BackStep from '../BackStep/BackStep';

export default function CheckOut() {
    useEffect(() => {
    document.title='CheckOut'
    })

    const { checkOutSession } = useContext(CartContext);
    const [loading, setLoading] = useState(false)
    const initialValues = {
        details: '',
        phone: '',
        city: ''
    };

    async function handleCheckOut(values) {
        const res = await checkOutSession(values);
        console.log(res);
        if (res.status == 'success') {
            window.location.href = res.session.url
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleCheckOut
    });


    return <>
        <div className='container pt-5 mb-20 w-2/3 mx-auto'>
            <BackStep replace={false} />
            <h2 className='text-4xl font-bold py-6 text-emerald-500'>Check Out</h2>
            <form onSubmit={formik.handleSubmit} className=''>
                <div className='relative z-0 w-full mb-5 group'>
                    <input type='text' name='details' id='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='details' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your details</label>
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <input type='text' name='city' id='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='city' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your city</label>
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <input type='tel' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='phone' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your phone</label>
                </div>
                {loading ? <button type='button' className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"><i className='fas fa-spinner fa-spin-pulse'></i></button>
                    : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="btn text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
                }
            </form>
        </div>
    </>
}