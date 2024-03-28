import React, { useState, useEffect } from "react";
import './Namechat.css'
import { auth } from '/src/DB/firebase-config.js'

function Namechat() {

    const [username, setUsername] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUsername(user.displayName);
                setUserPhoto(user.photoURL);
            } else {
                setUsername(null);
                setUserPhoto(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return(
        <>
            <div className="Namechat-container">
                    <p>แชทสำหรับค้นหาประมวลกฎหมายแพ่งและพาณิชย์</p>
                    <div className="Namechat-right-container">
                        <div className="userProfile">
                            <p>{username}</p>
                            <div className="img-profile">
                                <img src={userPhoto} alt="" />
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