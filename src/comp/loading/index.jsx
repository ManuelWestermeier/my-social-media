import React from 'react'
import "./index.css"
import { useLocation } from 'react-router-dom'

function Loading() {
    const location = useLocation()

    return (
        <div className='loading'>
            <p>
                Loading
            </p>
            <p>{`${location.pathname}${location.search}${location.hash}`}</p>
            <div className="spinner"></div>
        </div>
    )
}

export default Loading