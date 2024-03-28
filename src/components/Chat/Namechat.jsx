import React from "react";
import './Namechat.css'
import { auth, db } from '/src/DB/firebase-config.js'

function Namechat() {
    return(
        <>
            <div className="Namechat-container">
                    <p>แชทสำหรับค้นหาประมวลกฎหมายแพ่งและพาณิชย์</p>
                    <div className="Namechat-right-container">
                        <div className="userProfile">
                            <p>{auth.currentUser.displayName}</p>
                            <div className="img-profile">
                                <img src={auth.currentUser.photoURL} alt="" />
                            </div>
                                {/* <p>Test</p> */}
                        </div>
                        <div></div>
                    </div>
            </div>
        </>
    )
}

export default Namechat