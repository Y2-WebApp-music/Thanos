import { auth, provider } from '../DB/firebase-config'
import { signInWithPopup } from 'firebase/auth'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const Auth =(props)=> {
    const {setIsAuth} = props
    const signInWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true)
            console.log(result)
        } catch(err){
            console.error(err)
        }
    }
    return (
        <button className="GoogleLogin" onClick={signInWithGoogle}> <img src="public/icons/icon-google.svg" alt="" /> Sign in with Google </button>
    )
}