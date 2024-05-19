import React, { useRef } from 'react'

function CreateAccount({ }) {
    const userNameInput = useRef()
    const passwordInput = useRef()

    const onSubmit = e => {
        e.preventDefault()

        const userName = userNameInput.current?.value
        const password = passwordInput.current?.value

    }

    return (
        <form className='auth-form' onSubmit={onSubmit}>
            <h2>Create Account</h2>
            <input type="text" ref={userNameInput} placeholder='Username...' />
            <input type="text" ref={passwordInput} placeholder='Password...' />
            <button>
                Create Account
            </button>
        </form>
    )
}

export default CreateAccount