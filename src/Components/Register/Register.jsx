import React, { useContext, useEffect, useState } from 'react'
import classes from './Register.module.css'
import { UserContext } from '../../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios';
import { FaRegEyeSlash, FaEye  } from "react-icons/fa";

export default function Register() {
    useEffect(() => {
    document.title='Register'
    })
    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const handleShow = () => {
        setShow(!show)
    }

    const {setUserData} = useContext(UserContext)
    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
    };

    async function handleRegister(values) {
        try {
            setLoading(true)
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
            if (data.message === 'success') {
                setUserData(data.token);
                localStorage.setItem('userToken', data.token)
                navigate('/')
            }
        } catch (err) {
            setApiError(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'min length is 3').max(20, 'max length is 20').required('Name is required'),
        email: Yup.string().email('Email invalid').required('Email is required'),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password invalid').required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'password rePassword dont matches').required('RePassword is required'),
        phone: Yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Phone must be Egyptian phone').required('Phone is required')
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleRegister
    });

    return <>
        <div className='container pt-5 pb-10 w-2/3 mx-auto'>
            <h2 className='text-4xl font-bold py-6 text-emerald-500'>Register Now</h2>
            <form onSubmit={formik.handleSubmit} className=''>
                <div className='relative z-0 w-full mb-5 group'>
                    <input type='text' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='name' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your name</label>
                    {formik.errors.name && formik.touched.name &&
                        <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.name}
                        </div>
                    }
                </div>
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
                    <input type='password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='password' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your password</label>
                    <p onClick={handleShow} className='absolute right-4 top-4 hover:text-green-700 text-xl'>
                        {show ? <FaRegEyeSlash /> : <FaEye />}
                    </p>
                    {formik.errors.password && formik.touched.password &&
                        <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.password}
                        </div>
                    }
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <input type={show ? 'text' : 'password'} name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='rePassword' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your rePassword</label>
                    <p onClick={handleShow} className='absolute right-4 top-4 hover:text-green-700 text-xl'>
                        {show ? <FaRegEyeSlash /> : <FaEye />}
                    </p>
                    {formik.errors.rePassword && formik.touched.rePassword &&
                        <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.rePassword}
                        </div>
                    }
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <input type='tel' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-emerald-900 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer' placeholder=' '/>
                    <label htmlFor='phone' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Enter your phone</label>
                    {formik.errors.phone && formik.touched.phone &&
                        <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {formik.errors.phone}
                        </div>
                    }
                </div>
                {apiError &&
                    <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        {apiError}
                    </div>
                }
                <div className="max-md:space-y-8 md:flex justify-between items-center">
                    <p>
                        You have account <Link to='/login' className='text-green-700 font-bold underline'>Login Now</Link>
                    </p>
                    {loading ? <button type='button' className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-4 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"><i className='fas fa-spinner fa-spin-pulse'></i></button>
                        : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="btn text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-4 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
                    }
                </div>
            </form>
        </div>
    </>
}