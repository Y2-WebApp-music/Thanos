import React, {useState, useEffect, useRef} from "react";
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '/src/DB/firebase-config.js'
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate();
    const handleHomepage = () => {navigate("/");};

    const [chatList, setChatList] = useState([
        { chatname: "Start" },
        { chatname: "Second" }
    ])

    console.log(chatList)

    const chatRef = collection(db, "chatroom")

    const handleCreateChat = async () => {
        const newChatRoom = { chatname: "New Chat" };
        setChatList(prevChatList => [...prevChatList, newChatRoom]);

        // await addDoc(chatRef, {
        //     chatname:newChatRoom,
        //     TimeAdd: serverTimestamp()
        // })
    };

    return(
        <>
            <div className="Sidebar-Container">
                <div className="Sidebar-grid">
                    <h3 onClick={handleHomepage}>1man&3guy</h3>
                    <div>
                        <button className="CreateChatBTN" onClick={handleCreateChat}>
                            <FontAwesomeIcon icon={faCirclePlus} size="xl"/>สร้างแชทใหม่
                        </button>
                    </div>
                    <div className="ChatList-scroll">
                        <div className="ChatList">
                            {chatList.map((chatList) => (
                                <ChatButton key={chatList.id} chatname={chatList.chatname} link={chatList.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ChatButton({chatname, link}){
    const [isPopUpOpen, setPopUpOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isPopUpOpen && !event.target.closest('.Chat-Setting')) {
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
    return(
        <>
            <div className="ChatButton-container">
                <a href={""}>{chatname}</a>
                <div className="Chat-Setting" onClick={togglePopUp}><FontAwesomeIcon icon={faEllipsis} size="lg" id="faEllipsis"/></div>
                {isPopUpOpen &&
                    <div className="Sidebar-popup">
                        <button><FontAwesomeIcon icon={faPenToSquare} size="sm" /> เปลี่ยนชื่อ</button>
                        <button><FontAwesomeIcon icon={faTrash} size="sm" /> ลบแชทนี้</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Sidebar