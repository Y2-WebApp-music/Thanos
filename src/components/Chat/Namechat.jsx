import React, { useState, useEffect } from "react";
import './Namechat.css'
import { auth } from '/src/DB/firebase-config.js'
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Namechat() {

    const [username, setUsername] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null);
    const [isPopUpOpen, setPopUpOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isPopUpOpen && !event.target.closest('.userProfile')) {
                setPopUpOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopUpOpen]);

    const togglePopUp = () => {
        setPopUpOpen(!isPopUpOpen);
    };

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
                    <div className="userProfile" onClick={togglePopUp}>
                        <p>{username}</p>
                        <div className="img-profile">
                            <img src={userPhoto} alt="" />
                        </div>
                    </div>
                    <div></div>
                </div>

                {isPopUpOpen &&
                    <div className="popUp-User">
                        <button onClick={()=>signOut(auth)}><FontAwesomeIcon icon={faRightFromBracket} size="xl"/>Logout</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Namechat