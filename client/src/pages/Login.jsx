import React, { useState } from "react";
import './Login.css';
import { Auth } from "../DB/Auth";
import { auth } from '../DB/firebase-config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/chat");
        } catch (error) {
            setErr('email or password is wrong please try again');
        }
    }

    return (
        <div className="Login-container">
            <div className="Login-text">
                <p>Thanos</p>
                <h1>ค้นหาประมวลกฎหมายแพ่งและพาณิชย์</h1>
            </div>
            <div className="login-form-bg">
                <p>ยินดีต้อนรับ</p>
                <form action="" className="login-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" name="email" required />
                    <input type="password" placeholder="password" name="password" required />
                    {err && <p className="error-message">{err}</p>}
                    <input type="submit" value="Login" id="LoginSubmit" />
                </form>
                <span>ยังไม่มีบัญชีใช่หรือไม่? <a href="/Register">สร้างบัญชี</a> </span>
                <hr />
                <Auth />
            </div>
        </div>
    );
}

export default Login;
