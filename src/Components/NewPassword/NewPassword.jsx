import React, { useContext, useEffect, useState } from 'react'
import classes from './NewPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { FaRegEyeSlash, FaEye  } from "react-icons/fa";

export default function NewPassword() {
    useEffect(() => {
    document.title='NewPassword'
    })
    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const { setUserData } = useContext(UserContext)
    
    const handleShow = () => {
        setShow(!show)
    }

    const initialValues = {
        email: '',
        newPassword: ''
    };

    async function handleNewPassword(values) {
        try {
            setLoading(true)
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
            if (data.token) {
                navigate('/login')
            }
            console.log(data);
            
        } catch (err) {
            setApiError(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email invalid').required('Email is required'),
        newPassword: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password invalid').required('Password is required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleNewPassword
    });

    return <>
        <div className='container pt-20 pb-32 w-2/3 mx-auto'>
            <h2 className='text-4xl font-bold py-6 text-emerald-500'>New Password</h2>
            <form onSubmit={formik.handleSubmit} className=''>
                <div className='relative z-0 w-full mb-5 group'>
                    <input type='email' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='email' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your email</label>
                    {formik.errors.email && formik.touched.email &&
                        <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.email}
                        </div>
                    }
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <input type={show ? 'text' : 'password'} name='newPassword' id='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='newPassword' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your New Password</label>
                    <p onClick={handleShow} className='absolute right-4 top-4 hover:text-green-700 text-xl'>
                        {show ? <FaRegEyeSlash /> : <FaEye />}
                    </p>
                    {formik.errors.newPassword && formik.touched.newPassword &&
                        <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.newPassword}
                        </div>
                    }
                </div>
                {apiError &&
                    <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        {apiError}
                    </div>
                }
                <div className="md:flex justify-between items-center">
                    <p className='mb-4'>
                        Don't have account <Link to='/register' className='text-green-700 font-bold underline'>Register Now</Link>
                    </p>
                    <div className="flex items-center space-x-4">
                        {loading ? <button type='button' className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-4 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"><i className='fas fa-spinner fa-spin-pulse'></i></button>
                            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="btn text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-4 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Change Your Password</button>
                        }
                    </div>
                </div>
            </form>
        </div>
    </>
}