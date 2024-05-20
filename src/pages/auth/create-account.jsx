import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

async function createUser({ userName, password }) {
    try {
        const url = new URL(apiUrl + "/create-user")
        url.searchParams.set("user", userName)
        url.searchParams.set("password", password)

        const res = await fetch(url)
        if (!res.ok) {
            return [false, "No Internet"]
        }

        const jsonRes = await res.json()
        log(jsonRes) 

        return [true, { user: userName, password: password }]
    } catch (error) {
        return [false, error]
    }
}

function CreateAccount({ setAuth }) {
    const [error, setError] = useState()

    const navigate = useNavigate()

    const userNameInput = useRef()
    const passwordInput = useRef()

    const onSubmit = async e => {
        e.preventDefault()

        const userName = userNameInput.current?.value
        const password = passwordInput.current?.value

        const result = await createUser({ userName, password })

        if (result[0]) {
            setError("User Created")

            setAuth(result[1])

            setTimeout(() => {
                navigate("/profile")
            }, 1000)
        } else {
            setError(result[1])
        }
    }

    return (
        <form className='auth-form' onSubmit={onSubmit}>
            <h2>Create Account</h2>
            <input type="text" ref={userNameInput} placeholder='Username...' />
            <input type="text" ref={passwordInput} placeholder='Password...' />
            <p style={{ color: "red" }}>{error}</p>
            <button>
                Create Account
            </button>
        </form>
    )
}

export default CreateAccount