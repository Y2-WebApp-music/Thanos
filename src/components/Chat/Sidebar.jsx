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

    // const [chatList, setChatList] = useState([])

    const [chatList, setChatList] = useState([
        {chatname:"test1"},
        {chatname:"test1"},
        {chatname:"test1"},
        {chatname:"test1"},
        {chatname:"test1"},
        {chatname:"test1"},
        {chatname:"test2"},

    ])

    const chatRef = collection(db, "chatroom")

    const handleCreateChat = async () => {
        const newChatRoom = "New Chat";

        await addDoc(chatRef, {
            chatname:newChatRoom,
            TimeAdd: serverTimestamp()
        })
    };

    // useEffect(() => {
    //     const queryChat = query(chatRef, orderBy("TimeAdd", "asc"));
    //     const unsubscribe = onSnapshot(queryChat, (snapshot) => {
    //         let chatLists = [];
    //         snapshot.forEach((doc) => {
    //             chatLists.push({ ...doc.data(), id: doc.id });
    //         });
    //         setChatList(chatLists);
    //     });
    //     return () => unsubscribe();
    // }, [chatRef]);

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
                                <ChatButton key={chatList.id} chatname={chatList.chatname} />
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
                <p>{chatname}</p>
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