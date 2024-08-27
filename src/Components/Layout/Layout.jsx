import React, { useEffect, useState } from 'react'
import classes from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {

    return <>
        <Navbar />
        <div className="pt-28">
            <Outlet />
        </div>
        <Footer />
    </>
}