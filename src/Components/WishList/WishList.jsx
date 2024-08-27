import React, { useContext, useEffect, useState } from 'react'
import classes from './WishList.module.css'
import BackStep from '../BackStep/BackStep'
import { WishListContext } from '../../context/WishlistContext.jsx';
import { CartContext } from '../../context/CartContext.jsx';

export default function WishList() {
    useEffect(() => {
        document.title = 'WishList'
    })
    const { getWishList, wishlist, deleteProductToWishList } = useContext(WishListContext);
    const { addToCart } = useContext(CartContext);

    const handleMoveToCart = async (product) => {
        await addToCart(product);
    };

    const handleDeleteProduct = async (productId) => {
        await deleteProductToWishList(productId);
        await getWishList();
    };

    useEffect(() => {
        getWishList();
    }, []);

    return <>
        <div className="container mb-20">
            <BackStep />
            <div className='container pt-5 w-2/3 mx-auto'>
                <div className="md:flex justify-between items-end">
                    <h2 className='text-4xl font-bold py-6 text-emerald-500'>Wishlist</h2>
                    <div className="flex items-center gap-1 justify-end mb-8 text-sm">
                        <span className="text-slate-900">Total Item</span>
                        <span className="text-gray-800 font-medium">{wishlist?.count}</span>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-16 py-3 text-center">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist && wishlist.data.length > 0 ? (
                                wishlist.data.map((product, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <img src={product.imageCover} class="w-20 h-20 object-contain rounded-full mx-auto" alt="Apple Watch" loading="lazy"></img>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            <a href="/productDetail/6428ead5dc1175abc65ca0ad">{product.title}</a>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {product.price} EGP
                                        </td>
                                        <td className="px-6 py-4 grid gap-3">
                                            <button onClick={() => handleDeleteProduct(product._id)} className="font-medium text-red-600 hover:underline disabled:opacity-45 disabled:cursor-no-drop transition-opacity duration-300"><i className="fas fa-trash-alt mr-1"></i> Remove</button>
                                            <button onClick={() => handleMoveToCart(product)} type='submit' className="btn text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-4 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Add To Cart</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <div className="my-4 p-8 text-center">
                                    <h2 className="text-4xl text-black font-semibold">Your wishlist is empty</h2>
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}