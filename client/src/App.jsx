import React, {useContext} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatPage from './pages/ChatPage'
import { AuthContext } from './DB/Auth';

function App() {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }else {return children;}
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='Register' element={<Register/>}/>
          <Route path='chat' element={
            <ProtectedRoute>
              <ChatPage/>
            </ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App