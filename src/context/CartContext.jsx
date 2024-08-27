import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState(null)
    const headers = {
        token: localStorage.getItem('userToken')
    }
    const endPoint = `https://ecommerce.routemisr.com/api/v1/cart`;

    async function addToCart(productId) {
        try {
            const { data } = await axios.post(endPoint, { productId }, { headers });
            toast.success(data.message, {
                position: "bottom-right",
                theme: "dark",
            });
            return data;
        } catch (error) {
            console.log(data.message);
        }
    }

    async function deleteProductFromCart(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
            setCartItems(data);
            return data;
        } catch (error) {
            console.log(data.message);
        }
    }

    async function getCartItems() {
        try {
            const { data } = await axios.get(endPoint, { headers });
            setCartItems(data);
            return data;
        } catch (error) {
            console.log(data.message);
        }
    }

    async function updateProductCount(productId, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers });
            setCartItems(data)
            return data;
        } catch (error) {
            console.log(data.message);
        }
    }

    async function checkOutSession(shippingAddress) {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems?.data._id}?url=https://freshcart-ruby.vercel.app//`, { shippingAddress }, { headers });
            return data;
        } catch (error) {
            console.log(data.message);
        }
    }

    useEffect(() => {
        getCartItems()
    }, [])

    return <CartContext.Provider value={{ addToCart, getCartItems, cartItems, setCartItems , updateProductCount, deleteProductFromCart, checkOutSession }}>
        {children}
    </CartContext.Provider>
}