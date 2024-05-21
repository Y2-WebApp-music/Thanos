import React, {useState, useEffect, useRef} from "react";
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '/src/DB/firebase-config.js'
import { useNavigate } from 'react-router-dom'
import SidebarSkeleton from "../Loading/LoadSidebar";

function Sidebar( {chatId, LoadChat, onChatButtonClick ,chatSelect, chatList, setChatList }) {
    const navigate = useNavigate();
    const handleHomepage = () => {navigate("/");};
    const [selectedChat, setSelectedChat] = useState(null);
    useEffect(() => {
        setSelectedChat(chatSelect);
    }, [chatSelect]);
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
    }, [userId]);
    useEffect(() => {
        if (userId != null){
            LoadChat( userId ,setChatList )
        }
    }, [userId]);

    const handleCreateChat = async () => {
        let result
        try {
            let chatRoom = {
                name: "newChatRoom",
                uid: userId,
                TimeCreated: new Date(),
                messages:null
            }
            const response = await fetch(`http://localhost:3100/addChatRoom?uid=${userId}&document=${chatRoom}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chatRoom)
            })
            await new Promise(resolve => setTimeout(resolve, 1000))
            .then(
                result = await response.json(),
                console.log('result ',result),
                setSelectedChat(result.insertedId),
                onChatButtonClick(result.insertedId, userId),
                LoadChat(userId ,setChatList)
            )
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleChatButtonClick = (chatId, userId) => {
        setSelectedChat(chatId);
        onChatButtonClick(chatId, userId);
    };

    return(
        <>
            <div className="Sidebar-Container">
                <div className="Sidebar-grid">
                    <h3 onClick={handleHomepage}>Thanos</h3>
                    <div>
                        <button className="CreateChatBTN" onClick={handleCreateChat}>
                            <FontAwesomeIcon icon={faCirclePlus} size="xl"/>สร้างแชทใหม่
                        </button>
                    </div>
                    <div className="ChatList-scroll">
                        {/* <SidebarSkeleton/> */}
                        {chatList.length === 0 ? <SidebarSkeleton/>
                        :
                            <div className="ChatList">
                                {chatList.map((item) => (
                                    <ChatButton key={item._id} chatname={item.name} link={item._id} userId={item.uid} chatList={chatList} onChatButtonClick={handleChatButtonClick} isSelected={selectedChat === item._id} setChatList={setChatList} LoadChat={LoadChat} chatId={chatId}/>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

function ChatButton({chatname, onChatButtonClick, link, userId, chatList, isSelected, setChatList, chatId, LoadChat}){
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
                .then(
                    await new Promise(resolve => setTimeout(resolve, 1000)),
                    LoadChat(userId ,setChatList)
                )
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };
    const handleDeleteChat = async()=>{
        try {
            console.log(">> deleteChat <<");
            let deleteArray = chatList.filter(item => item._id !== `${link}`);
            setChatList(deleteArray)
            await fetch(`http://localhost:3100/deleteChat?uid=${userId}&chatId=${link}`, {
                method: 'POST'
            })
            .then(
                setChatSettingPopup(false),
                (chatId === link) ? onChatButtonClick(null, null) : null,
                await new Promise(resolve => setTimeout(resolve, 1200)),
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
                        <p onClick={(e) => {handleClick();}}>{newChatName}</p>
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