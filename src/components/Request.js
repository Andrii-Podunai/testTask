import React, { useEffect, useState } from 'react'
import '../scss/request.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../asyncActions/fetchUsers';
import Users from './Users';
import Form from './Form';


export default function Request() {
    const [count, setCount] = useState(2)
    const dispatch = useDispatch()
    const selectorData = useSelector(state => state.users.data.next_url)

    useEffect(() => {
        dispatch(fetchUsers(1))
    }, [])

    const showMore = () => {
        setCount(count + 1)
        dispatch(fetchUsers(count))
    }
    return (
        <div className='Request'>
            <h2 className='request__title'>Working with GET request</h2>
            <Users />
            {selectorData != null &&
                <button className='header__button-centre header__button' onClick={() => { showMore() }}>Show more</button>
            }
            <h2 className='form__title'>Working with POST request</h2>
            <Form />

        </div>
    )
}
