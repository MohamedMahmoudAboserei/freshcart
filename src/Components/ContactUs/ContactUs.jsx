import React, { useEffect, useState } from 'react'
import classes from './ContactUs.module.css'
import BackStep from '../BackStep/BackStep'

export default function ContactUs() {
    useEffect(() => {
    document.title='ContactUs'
    })

    return <>
        <div className="container">
            <BackStep />
        </div>
    </>
}