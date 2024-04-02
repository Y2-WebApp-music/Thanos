import React, {useState, useEffect, useRef} from "react";
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '/src/DB/firebase-config.js'
import {addDoc, collection, doc, updateDoc, deleteDoc, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Sidebar({ onChatButtonClick }) {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState(null);
    const handleHomepage = () => {navigate("/");};
    const chatRef = collection(db, "chatroom")
    const [userId, setUserID] = useState(null)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserID(user.uid);
            } else {
                setUserID(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const [chatList, setChatList] = useState([])
    // const [chatList, setChatList] = useState([
    //     {id:123 , chatname:"newchat1", UserId:"nq34itboBIRN($PWTI"},
    //     {id:456 , chatname:"newchat2", UserId:"DJKFBN124LKAW1231"},
    // ])

    const handleCreateChat = async () => {
        const newChatRoom = "New Chat";

        try {
            await addDoc(chatRef, {
                chatname: newChatRoom,
                TimeAdd: serverTimestamp(),
                userId: userId
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        // console.log("useEffect query DB ==> chatroom")
        const queryChat = query(chatRef, where("userId", "==", userId),orderBy("TimeAdd", "asc"));
        const unsubscribe = onSnapshot(queryChat, (snapshot) => {
            let chatLists = [];
            snapshot.forEach((doc) => {
                chatLists.push({ ...doc.data(), id: doc.id });
            });
            setChatList(chatLists);
        });
        return () => unsubscribe();
    }, [chatList]);

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
                                <ChatButton key={chatList.id} chatname={chatList.chatname} link={chatList.id} userId={chatList.userId} onChatButtonClick={handleChatButtonClick} isSelected={selectedChat === chatList.id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ChatButton({chatname, onChatButtonClick, link, userId, isSelected}){
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
        if(newChatName ==="" || newChatName === chatname){
            setNewChatName(chatname)
        }else{
            let chatIDRef = doc(db, "chatroom", link);
            try {
                await updateDoc(chatIDRef, {
                    chatname: newChatName
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };
    const handleDeleteChat = async()=>{
        try {
            await deleteDoc(doc(db, "chatroom", link));
        } catch (error) {
            console.error("Error adding document: ", error);
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

export default Sidebar