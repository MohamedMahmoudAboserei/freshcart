import React, { useEffect, useState } from 'react'
import classes from './Error.module.css'

export default function Error() {
    useEffect(() => {
    document.title='Error'
    })

    return <>
        <h1>
            Error
        </h1>
    </>
}