import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Cart from './Components/Cart/Cart.jsx'
import CheckOut from './Components/CheckOut/CheckOut.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Products from './Components/Products/Products.jsx'
import WishList from './Components/WishList/WishList.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx'
import ResetCode from './Components/ResetCode/ResetCode.jsx'
import NewPassword from './Components/NewPassword/NewPassword.jsx'
import UserContextProvider from './context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast'
import CartContextProvider from './context/CartContext.jsx'
import WishListContextProvider from './context/WishlistContext.jsx'

function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/allOrders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: '/brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: '/checkOut', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: '/categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: '/products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: '/product-details/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: '/wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/forgetPassword', element: <ForgetPassword /> },
        { path: '/resetCode', element: <ResetCode /> },
        { path: '/newPassword', element: <NewPassword /> },
        { path: '/*', element: <ProtectedRoute><NotFound /></ProtectedRoute> }
      ]
    }
  ])

  return <>
    <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          <Toaster />
        </WishListContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </>
}
export default App