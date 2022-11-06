import React from 'react'
import { useSelector } from 'react-redux';
import User from './User';

export default function Users() {
    const selector = useSelector(state => state.users.users)

    return (
        <div className='users'>
            {selector &&
                selector.map(({ id, name, email, phone, photo, position, position_id }) => (
                    <User key={id} id={id} name={name} email={email} phone={phone} photo={photo} position={position} position_id={position_id} />
                ))
            }
        </div>
    )
}
