import react, {useState, useEffect} from 'react'
import './App.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatPage from './pages/ChatPage'

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))

  if (!isAuth){
    return (
      <>
        {/* <Home/> */}
        <Login/>
        {/* <Register/> */}
      </>
    )
  }

  return(
    <>
      <ChatPage/>
    </>
  )
}

export default App
