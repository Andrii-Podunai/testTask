import React from 'react'
import logo from '../image/Logo.svg'
import '../scss/header.scss'

export default function Header() {
    return (
        <div className='header'>
            <div className='header_container'>
                <img src={logo} />
                <div className='header__buttons' >
                    <button className='header__button'>Users</button>
                    <button className='header__button'>Sign up</button>
                </div>
            </div>


        </div>
    )
}
