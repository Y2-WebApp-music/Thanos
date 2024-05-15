import React, {useState, useEffect, useRef} from "react";
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '/src/DB/firebase-config.js'
import {addDoc, collection, doc, updateDoc, deleteDoc, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Sidebar({ onChatButtonClick ,chatSelect }) {
    const navigate = useNavigate();
    const handleHomepage = () => {navigate("/");};
    const [selectedChat, setSelectedChat] = useState(null);
    const [userId, setUserID] = useState(null)
    const [chatList, setChatList] = useState([])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserID(user.uid);
            } else {
                setUserID(null);
            }
        });
        return () => unsubscribe();
    }, [userId]);
    useEffect(() => {
        if (userId != null){
            LoadChat( userId ,setChatList )
        }
    }, [userId]);

    const handleCreateChat = async () => {
        let result
        try {
            let newRoom
            let chatRoomC = {
                name: "newChatRoom",
                uid: userId,
                TimeCreated: new Date()
            }
            const response = await fetch(`http://localhost:3100/addChatRoom?uid=${userId}&document=${chatRoomC}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chatRoomC)
            })
            console.log('test During Function ')
            result = await response.json()
            let messageDefault = { messages:null}
            const message = await fetch(`http://localhost:3100/newMessageRoom?chatId=${result.insertedId}&document=${messageDefault}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageDefault)
            }).then(
                console.log('result ',result),
                setSelectedChat(result.insertedId),
                LoadChat(userId ,setChatList)
            )
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        setSelectedChat(chatSelect);
    }, [chatSelect]);

    const handleChatButtonClick = (chatId, userId) => {
        setSelectedChat(chatId);
        onChatButtonClick(chatId, userId);
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
                                <ChatButton key={chatList._id} chatname={chatList.name} link={chatList._id} userId={chatList.uid} onChatButtonClick={handleChatButtonClick} isSelected={selectedChat === chatList._id} setChatList={setChatList}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ChatButton({chatname, onChatButtonClick, link, userId, isSelected, setChatList}){
    const [isChatSettingPopup, setChatSettingPopup] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [newChatName, setNewChatName] = useState(chatname);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleOutsideSetting = (event) => {
            if (isChatSettingPopup && !event.target.closest('.Sidebar-popup')) {
                setChatSettingPopup(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideSetting);
        return () => {
            document.removeEventListener('mousedown', handleOutsideSetting);
        };
    }, [isChatSettingPopup]);

    const toggleChatSetting = () => {
        setChatSettingPopup(!isChatSettingPopup);
    }
    const handleClick = () => {
        onChatButtonClick(link, userId);
    }
    useEffect(() => {
        if (editingName) {
            inputRef.current.select();
        }
    }, [editingName]);
    const handleNameChange = (event) => {
        setNewChatName(event.target.value);
    }
    const handleEditName = () => {
        setChatSettingPopup(false);
        setEditingName(true);
    }
    const handleKey = e=>{
        e.code === "Enter" && handleSaveName()
    }
    const handleSaveName = async () => {
        setEditingName(false);
        if(newChatName === "" || newChatName === chatname){
            setNewChatName(chatname)
        }else{
            try {
                await fetch(`http://localhost:3100/updateChatName?uid=${userId}&chatId=${link}&update=${newChatName}`, {
                    method: 'POST'
                })
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };
    const handleDeleteChat = async()=>{
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        try {
            console.log(">> deleteChat <<");

            await fetch(`http://localhost:3100/deleteChat?uid=${userId}&chatId=${link}`, {
                method: 'POST'
            })
            .then(
                await fetch(`http://localhost:3100/deleteMessageRoom?chatId=${link}`, {
                    method: 'POST'
                }),
                setChatSettingPopup(false),
                await delay(1000),
                LoadChat(userId, setChatList)
            )
        } catch (error) {
            console.error("Error send post:", error);
            throw error;
        }
    }

    return(
        <>
            <div className={`ChatButton-container ${isSelected ? 'selected' : ''}`} >
                {editingName ? (
                    <input type="text" value={newChatName} onChange={handleNameChange} onKeyDown={handleKey} ref={inputRef}/>
                ) : (
                    <>
                        <p onClick={(e) => {handleClick();}}>{chatname}</p>
                        <div className="Chat-Setting" onClick={toggleChatSetting}><FontAwesomeIcon icon={faEllipsis} size="lg" id="faEllipsis"/></div>
                        {isChatSettingPopup &&
                            <div className="Sidebar-popup">
                                <button onClick={handleEditName}><FontAwesomeIcon icon={faPenToSquare} size="sm" /> เปลี่ยนชื่อ</button>
                                <button onClick={handleDeleteChat}><FontAwesomeIcon icon={faTrash} size="sm" /> ลบแชทนี้</button>
                            </div>
                        }
                    </>
                )}
            </div>
        </>
    )
}












function LoadChat( userId,setChatList  ){
    let retryCount = 0;
    const maxRetries = 3;
    const fetchChats = async () => {
        try {
            const response = await fetch(`http://localhost:3100/chatroom?uid=${userId}`);
            const Chats = await response.json();
            console.log('GET Chats ',Chats)
            if (Object.keys(Chats).length === 0 && Chats.constructor === Object) {
                console.log("Chats is empty. Retrying...");
                retryCount++;
                if (retryCount <= maxRetries) {
                    setTimeout(fetchChats, 1000);
                } else {
                    console.log("Max retries exceeded. Unable to fetch chat.");
                }
            } else {
                setChatList(Chats);
            }
        } catch (error) {
            console.error('Error fetching chat:', error);
            setTimeout(fetchChats, 1000);
        }
    };
    fetchChats();
}

export default Sidebar