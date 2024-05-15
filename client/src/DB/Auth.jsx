import { auth, provider } from './firebase-config'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const AuthContext = createContext()
export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        })

        return () => unsubscribe();
    },[])

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const Auth =()=> {
    const navigate = useNavigate();
    const signInWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            navigate("/chat");
        } catch(err){
            console.error(err)
        }
    }
    return (
        <button className="GoogleLogin" onClick={signInWithGoogle}> <img src="public/icons/icon-google.svg" alt="" /> Sign in with Google </button>
    )
}