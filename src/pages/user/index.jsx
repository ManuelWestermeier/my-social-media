import React from 'react'
import { useParams } from 'react-router-dom'

function UserPage() {
    const { id } = useParams()

    return (
        <div>UserPage {id}</div>
    )
}

export default UserPage