import React from 'react'
import '../scss/user.scss'
export default function User({ name, email, phone, photo, position }) {
    return (
        <div className='user'>
            <div className='user__card'>
                <img src={photo} className='user__card-img'>

                </img>
                <h5 className='user__card-name' >{name}</h5>
                <div className='user__card-text'>
                    <p className='user__card-position' >{position}</p>
                    <p className='user__card-email'>{email}</p>
                    <p>{phone}</p>
                </div>


            </div>
        </div>
    )
}
