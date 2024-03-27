import React from "react";
import './Title.css'

function Title() {
    return(
        <>
            <div className="Title-container">
                <div className="Title-text">
                    <h1>1Man and 3Guy</h1>
                    <p>ค้นหาประมวลกฎหมายแพ่งและพาณิชย์</p>
                </div>
                <form action="" className="formStartButton">
                    <input type="submit" value="เริ่มแชท" className="StartButton"/>
                </form>
            </div>
            <img src="/public/icons/legalScales.png" alt="" className="title-background"/>
        </>
    )
}

export default Title