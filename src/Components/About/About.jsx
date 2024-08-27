import React, { useEffect, useState } from 'react'
import classes from './About.module.css'
import BackStep from '../BackStep/BackStep'

export default function About() {
    useEffect(() => {
    document.title='About'
    })

    return <>
        <div className="container">
            <BackStep />
        </div>
    </>
}