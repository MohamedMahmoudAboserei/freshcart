import React, { useContext, useEffect, useState } from 'react'
import classes from './Cart.module.css'
import { CartContext } from '../../context/CartContext';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import BackStep from '../BackStep/BackStep';
import { toast } from 'react-toastify';

export default function Cart() {
    useEffect(() => {
        document.title = 'Cart'
    })

    const { getCartItems, updateProductCount, deleteProductFromCart, setCartItems, cartItems } = useContext(CartContext);
    const [cart, setCart] = useState(null)

    async function getCart() {
        const res = await getCartItems();
        setCart(res.data)
    }

    async function deleteProduct(productId) {
        const res = await deleteProductFromCart(productId);
        setCart(res.data)
    }

    async function updateCart(productId, count) {
        if (count >= 1) {
            const res = await updateProductCount(productId, count);
            setCart(res.data)
        } else {
            deleteProduct(productId)
        }
    }

    useEffect(() => {
        getCart()
    }, [])


    return <>
        <div className="container mb-20">
            <BackStep replace={false} />
            <div className="md:flex items-center justify-between">
                <h2 className='text-4xl font-bold pb-6 text-emerald-500'>Cart</h2>
                <div className="flex justify-around px-8 py-2">
                    <div className="">
                        <span>Total Item :</span>
                        <span className="text-green-500 pl-5 font-bold">{cartItems?.numOfCartItems}</span>
                    </div>
                    <div className="w-10 border-l border-gray-800 mx-14"></div>
                    <div className="">
                        <span>Total Cart Price :</span>
                        <span className="text-green-500 font-bold pl-5">{cart?.totalCartPrice}EGP</span>
                    </div>
                </div>
            </div>
            {cart ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
                
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.products.map((product) => <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {product.product.title}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <button onClick={() => updateCart(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <div>
                                        <span> {product.count} </span>
                                    </div>
                                    <button onClick={() => updateCart(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {product.price}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => deleteProduct(product.product.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <Link to={'/checkout'} className="block my-8 w-full">
                    <button type='submit' className="bg-[#0aad0a] text-white rounded-md px-4 py-2 w-full">Check Out</button>
                </Link>
            </div>
                :
                <div className='flex justify-center py-16'>
                    <Loader />
                </div>
            }
        </div>
    </>
}