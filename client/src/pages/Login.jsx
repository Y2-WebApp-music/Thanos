import React, { useState } from "react";
import './Login.css'
import { Auth } from "../DB/Auth";
import { auth } from '../DB/firebase-config'
import { setSourceMapRange } from "typescript";
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/chat")
        }catch(err){setSourceMapRange(true)}
    }

    return(
        <>
            <div className="Login-container">
                <div className="Login-text">
                    <p>Thanos</p>
                    <h1>ค้นหาประมวลกฎหมายแพ่งและพาณิชย์</h1>
                </div>
                <div className="login-form-bg">
                    <p>ยินดีต้อนรับ</p>
                    <form action="" className="login-form" onSubmit={handleSubmit}>
                        <input type="email" placeholder="email" name="email"/>
                        <input type="password" placeholder="password" name="password"/>
                        <input type="submit" value="Login" id="LoginSubmit"/>
                    </form>
                    <span>ยังไม่มีบัญชีใช่หรือไม่? <a href="/Register">สร้างบัญชี</a> </span>
                    <hr />
                    <Auth />
                </div>
            </div>
        </>
    )
}

export default Login