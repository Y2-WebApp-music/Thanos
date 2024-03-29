import react, {useState, useEffect, useContext} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
import { auth,db } from '/src/DB/firebase-config.js'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatPage from './pages/ChatPage'
import { AuthContext } from './DB/Auth';

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const {currentUser} = useContext(AuthContext)

  console.log(currentUser)

  // if (!isAuth){
  //   return (
  //     <>
  //       {/* <Home/> */}
  //       <Login setIsAuth={setIsAuth}/>
  //       {/* <Register setIsAuth={setIsAuth}/> */}
  //     </>
  //   )
  // } else{
  //   return(
  //     <>
  //       <ChatPage />
  //     </>
  //   )
  // }

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='Register' element={<Register/>}/>
          <Route path='chat' element={<ChatPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
