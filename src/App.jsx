import react, {useState, useEffect} from 'react'
import './App.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
import { auth,db } from '/src/DB/firebase-config.js'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatPage from './pages/ChatPage'

function App() {
  console.log('App.Jsx Get Auth? ===> ' ,auth)
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))


  if (!isAuth){
    return (
      <>
        {/* <Home/> */}
        <Login setIsAuth={setIsAuth}/>
        {/* <Register setIsAuth={setIsAuth}/> */}
      </>
    )
  } else{
    return(
      <>
        <ChatPage />
      </>
    )
  }
}

export default App
