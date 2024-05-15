import React, {useState, useEffect, useContext} from 'react'
import './Title.css'
import { AuthContext } from '/src/DB/Auth.jsx';
import { useNavigate } from 'react-router-dom'

function Title() {
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleStartChat = () => {
        console.log("Hello in navigate function")
        if (!currentUser) {
            console.log("!currentUser")
            navigate("/login");
        } else {
            console.log("currentUser")
            navigate("/chat");
        }
    };

    return(
        <>
            <div className="Title-container">
                <div className="Title-text">
                    <h1>Thanos</h1>
                    <p>ค้นหาประมวลกฎหมายแพ่งและพาณิชย์</p>
                </div>
                <div className="formStartButton">
                    <button className="StartButton" onClick={handleStartChat}>เริ่มแชท</button>
                </div>
            </div>
            <img src="/public/icons/legalScales.png" alt="" className="title-background"/>
        </>
    )
}

export default Title