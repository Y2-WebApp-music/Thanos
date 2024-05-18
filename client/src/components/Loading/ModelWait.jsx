import React from 'react'
import './ModelWait.css'

export default function ModelSkeleton(){
    return(
        <div className='ModelChat-Container'>
            <div className="ModelChat-Container-Profile">
                <img src="public/images/ModelPicture.jpg" alt="" />
                <p>Thanos Lawyer</p>
            </div>
            <div className='loadingText'>
                <div className="loadText"></div>
            </div>
        </div>
    )
}