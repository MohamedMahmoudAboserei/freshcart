import React, { useContext, useEffect, useState } from 'react'
import classes from './Product.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { toast } from 'react-toastify';
import { WishListContext } from '../../context/WishlistContext';

export default function Product({ product }) {
    const { addToCart } = useContext(CartContext)
    const { addProductToWishList, wishlist } = useContext(WishListContext);
    const [localWishList, setLocalWishList] = useState([]);

    useEffect(() => {
        if (wishlist && wishlist.data) {
            setLocalWishList(wishlist.data);
        }
    }, [wishlist]);

    const isProductInWishList = (productId) => {
    return localWishList.find(product => product._id === productId);
    };

    const handleAddToWishList = (productId) => {
        if (isProductInWishList(productId)) {
        
        setLocalWishList(prevList => prevList.filter(product => product._id !== productId));
        } else {
        
        addProductToWishList(productId);
        setLocalWishList(prevList => [...prevList, { _id: productId }]); 
        }
    };

    return <>
        <div className="lg:w-1/6 p-2 mb-4 group transition-all duration-300 hover:shadow-lg relative hover:rounded-2xl border-2 border-transparent hover:border-green-600">
            <Link to={`/product-details/${product.id}/${product.category.name}`}>
                <div className="relative transition-all duration-300 transform group-hover:border-green-600 ">
                    <img src={product.imageCover} className="w-full rounded-2xl" alt={product.title} />
                    <h3 className="text-green-600 text-sm">
                        {product.category.name}
                    </h3>
                    <h2 className="font-semibold">
                        {product.title.split(' ').slice(0, 2).join(' ')}
                    </h2>
                    <div className="flex justify-between my-2">
                        <h4>
                            {product.price} EGP
                        </h4>
                        <h4>
                            <i className="fas fa-star text-yellow-500"></i> {product.ratingsAverage}
                        </h4>
                    </div>
                </div>
            </Link>
            <button
                onClick={() => addToCart(product.id)}
                className="btn w-full bg-green-600 text-white p-2 rounded-xl mb-2 transform transition-all duration-500 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0"
            >
                Add To Cart
            </button>
            <button onClick={() => handleAddToWishList(product.id)} className="absolute right-10 top-10 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:visible text-gray-700 hover:text-red-400">
                <i className={`fa-solid fa-heart fa-xl ${isProductInWishList(product.id) ? 'text-red-600' : 'text-black'}`}></i>
            </button>
        </div>
    </>
}