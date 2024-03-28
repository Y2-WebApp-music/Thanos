import React from "react";
import './Login.css'
import { Auth } from "../DB/Auth";

function Login() {
    return(
        <>
            <div className="Login-container">
                <div className="Login-text">
                    <p>1Man and 3Guy</p>
                    <h1>ค้นหาประมวลกฎหมายแพ่งและพาณิชย์</h1>
                </div>
                <div className="login-form-bg">
                    <p>ยินดีต้อนรับ</p>
                    <form action="post" className="login-form">
                        <input type="text" placeholder="email" name="email"/>
                        <input type="password" placeholder="password" name="password"/>
                        <input type="submit" value="Login" id="LoginSubmit"/>
                    </form>
                    <span>ยังไม่มีบัญชีใช่หรือไม่? <a href="/Register">สร้างบัญชี</a> </span>
                    <hr />
                    <Auth/>
                </div>
            </div>
        </>
    )
}

export default Login