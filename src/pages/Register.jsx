import React, { useState } from "react";
import './Login.css'
import { Auth } from "../DB/Auth";
import { auth } from '../DB/firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function Register() {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, { displayName });
            navigate("/login");
        } catch (error) {
            console.error('Registration error:', error);
            setErr(true);
        }
    };

    return(
        <>
            <div className="Login-container">
                <div className="Login-text">
                    <p>1Man and 3Guy</p>
                    <h1>ค้นหาประมวลกฎหมายแพ่งและพาณิชย์</h1>
                </div>
                <div className="login-form-bg">
                    <p>เริ่มต้นใช้งาน</p>
                    <form action="" className="login-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="username" name="username"/>
                        <input type="text" placeholder="email" name="email"/>
                        <input type="password" placeholder="password" name="password"/>
                        <input type="submit" value="ยืนยัน" id="LoginSubmit"/>
                    </form>
                    {err && <span>Something wrong please try again</span>}
                    <hr />
                    <Auth />
                </div>
            </div>
        </>
    )
}

export default Register