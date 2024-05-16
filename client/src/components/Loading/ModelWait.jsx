import React from 'react'
import './ModelWait.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default function ModelSkeleton(){
    return(
        <div className='ModelChat-Container'>
            <div className="ModelChat-Container-Profile">
                <img src="public/images/ModelPicture.jpg" alt="" />
                <p>Thanos Lawyer</p>
            </div>
            <div className='loadingText'>
                <FontAwesomeIcon icon={faCircle} size="sm" id="faCircle1"/>
                <FontAwesomeIcon icon={faCircle} size="sm" id="faCircle2"/>
                <FontAwesomeIcon icon={faCircle} size="sm" id="faCircle3"/>
            </div>
        </div>
    )
}