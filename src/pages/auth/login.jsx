import React, { useRef } from 'react'

function Login({ }) {
    const userNameInput = useRef()
    const passwordInput = useRef()

    const onSubmit = e => {
        e.preventDefault()

        const userName = userNameInput.current?.value
        const password = passwordInput.current?.value

        
    }

    return (
        <form className='auth-form' onSubmit={onSubmit}>
            <h2>Login</h2>
            <input type="text" ref={userNameInput} placeholder='Username...' />
            <input type="text" ref={passwordInput} placeholder='Password...' />
            <button>
                Login
            </button>
        </form>
    )
}

export default Login