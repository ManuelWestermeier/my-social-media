import React from 'react'
import NavigationBar from './comp/navigation-bar'
import MainContent from './comp/main-content'
import useAuth from './hooks/use-auth'

function App() {
  const [auth, setAuth] = useAuth()

  return (
    <>
      <MainContent auth={auth} setAuth={setAuth} />
      <NavigationBar />
    </>
  )
}

export default App