import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
    let headers = {
        token: localStorage.getItem('userToken')
    };

    const [wishlist, setWishList] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getWishList() {
        setLoading(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
            setWishList(data);
        } catch (err) {
            toast.error("Failed to fetch wishlist");
        } finally {
            setLoading(false);
        }
    }

    async function addProductToWishList(productId) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers });
            toast.success(data.message);
            getWishList(); 
        } catch (err) {
            toast.error("Failed to add product to wishlist");
        } finally {
            setLoading(false);
        }
    }

    async function deleteProductToWishList(productId) {
        setLoading(true);
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            toast.success("Product removed from wishlist");
            getWishList(); 
        } catch (err) {
            toast.error("Failed to remove product from wishlist");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getWishList();
    }, []);

    return (
        <WishListContext.Provider value={{ addProductToWishList, wishlist, setWishList, getWishList, deleteProductToWishList }}>
            {children}
        </WishListContext.Provider>
    );
}