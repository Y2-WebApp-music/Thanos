import React from "react";
import './Namechat.css'

function Namechat() {
    return(
        <>
            <div className="Namechat-container">
                    <p>แชทสำหรับค้นหาประมวลกฎหมายแพ่งและพาณิชย์</p>
                    <div className="Namechat-right-container">
                        <div className="userProfile">
                            <p>kunguy.159@gmail.com</p>
                            <div className="img-profile">
                                <img src="/public/images/What-meme-12129.jpg" alt="" />
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