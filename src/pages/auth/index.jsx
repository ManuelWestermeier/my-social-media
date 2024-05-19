import React, { useState } from 'react'
import "./index.css"
import Login from './login'
import CreateAccount from './create-account'

function AuthPage({ isAuth, setAuth }) {
    const [isLoginPage, setIsLoginPage] = useState(true)
    var [isAuth, setIsAuth] = useState(isAuth)

    if (!isAuth) {
        return <div className='p10'>
            <p>You are alread authenticated</p>
            <button onClick={e => setIsAuth(true)}>
                Confirm
            </button>
        </div>
    }

    return <div className='p10' >
        <div className="slide-change">
            <button className={isLoginPage && 'active'} onClick={e => setIsLoginPage(true)}>
                Login
            </button>
            <button className={!isLoginPage && 'active'} onClick={e => setIsLoginPage(false)}>
                Create Account
            </button>
        </div>
        {isLoginPage ?
            <Login /> :
            <CreateAccount />}
    </div>
}

export default AuthPage