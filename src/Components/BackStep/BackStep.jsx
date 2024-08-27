import React, { useEffect, useState } from 'react'
import classes from './BackStep.module.css'
import { useNavigate } from 'react-router-dom';

export default function BackStep({ replace = false }) {
    const navigate = useNavigate();

    return <>
        <button onClick={() => navigate(-1, { replace })}
            className="py-2 transition-colors duration-300 hover:text-gray-400 flex items-center">
            <i className="fa-solid fa-chevron-left pr-1"></i> Back
        </button>
    </>
}