import React from "react";
import './Login.css'

function Register() {
    return(
        <>
            <div className="Login-container">
                <div className="Login-text">
                    <p>1Man and 3Guy</p>
                    <h1>ค้นหาประมวลกฎหมายแพ่งและพาณิชย์</h1>
                </div>
                <div className="login-form-bg">
                    <p>เริ่มต้นใช้งาน</p>
                    <form action="post" className="login-form">
                        <input type="text" placeholder="username" name="username"/>
                        <input type="text" placeholder="email" name="email"/>
                        <input type="password" placeholder="password" name="password"/>
                        <input type="password" placeholder="Confirm password" name="con-password"/>
                        <input type="submit" value="ยืนยัน" id="LoginSubmit"/>
                    </form>
                    <hr />
                    <button className="GoogleLogin"> <img src="public/icons/icon-google.svg" alt="" /> Register with Google </button>
                </div>
            </div>
        </>
    )
}

export default Register