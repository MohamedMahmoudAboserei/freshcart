import React, { useEffect, useState } from 'react'
import classes from './Home.module.css'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import RecentProducts from '../RecentProducts/RecentProducts'

export default function Home() {
    useEffect(() => {
    document.title='Home'
    })

    return <>
        <HomeSlider />
        <div className="w-3/5 mx-auto border-t my-5"></div>
        <CategorySlider />
        <div className="w-3/5 mx-auto border-t my-5"></div>
        <RecentProducts />
    </>
}