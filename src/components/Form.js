import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import '../scss/form.scss'
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addUserReducer } from '../store/userReduser';

export default function Form() {
    const [positions, setPositions] = useState([])
    const [local, setLocal] = useState('')
    const [filee, setFile] = useState()
    const [fileUrl, setfileUrl] = useState('')
    const [dataText, setDataText] = useState('Upload your photo')
    const [errPhoto, setErrPhoto] = useState()

    const dispatch = useDispatch()
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const phoneRegex = /^[\+]{0,1}380([0-9]{9})$/;
    const validationSchema = yup.object().shape({
        name: yup.string()
            .typeError('Only string')
            .min(2, 'Short')
            .max(60, 'Long')
            .required('Required'),
        phone: yup.string()
            .matches(phoneRegex, 'Error')
            .required('Required'),

        email: yup.string()
            .required('Required')
            .matches(emailRegex, 'Error'),
        position: yup.string()
            .required('Required'),
    })
    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(res => res.json())
            .then(
                (result) => {
                    setLocal(result)
                })
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(res => res.json())
            .then(
                (result) => {
                    setPositions(result.positions)
                }
            )
    }, [])


    const registerUser = (user) => {
        if (filee) {
            user.photo = filee
            let formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('phone', user.phone);
            formData.append('position_id', user.position);
            formData.append('photo', filee);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Token': local.token,
                },
                body: formData,
            };
            const positinArr = positions.filter((e) => e.id == user.position)
            user.position = positinArr[0].name
            user.photo = fileUrl
            fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', requestOptions)
                .then(res => res.json())
                .then((data) => {
                    user.id = data.user_id
                    dispatch(addUserReducer(user))
                })
                .catch((e) => console.log(e))
            setDataText(filee.name)

        } else {
            setErrPhoto(<p className='error__input'>{'Required'}</p>)
        }

    }

    return (

        <Formik
            initialValues={{
                name: '',
                email: '',
                phone: '',
                position: '',
                photo: '',
            }}
            validateOnBlur
            onSubmit={(data) => {
                registerUser(data)
            }}
            validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <div className='form' >
                    <input
                        type="text"
                        name="name"
                        placeholder='Your name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className='form_input'>
                    </input>
                    {touched.name && errors.name && <p className='error__input'>{errors.name}</p>}

                    <input
                        type="text"
                        name="email"
                        placeholder='Email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className='form_input'>
                    </input>
                    {touched.email && errors.email && <p className='error__input'>{errors.email}</p>}

                    <input
                        type="text"
                        name="phone"
                        placeholder='Phone'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        className='form_input'>
                    </input>
                    <label className='label__form' htmlFor={`phone`} >+38 (XXX) XXX - XX - XX</label><br />

                    {touched.phone && errors.phone && <p className='error__input'>{errors.phone}</p>}

                    <div>
                        <label className='label__form-select' htmlFor={`position`} >Select your position</label><br />
                        {
                            positions.map(({ id, name }) => (
                                <span className='form__input-radio' key={id}
                                >
                                    <input
                                        type="radio"
                                        name="position"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={id}
                                        className='form__input-radio'>
                                    </input>
                                    <label className='label__form-select' htmlFor={`position`} >{name}</label><br />
                                </span>



                            ))
                        }
                        {touched.position && errors.position && <p className='error__input '>{errors.position}</p>}

                    </div>
                    <div className='upload__file-wrapper' htmlFor={`photo`} data-text={dataText}>
                        <input
                            type="file"
                            id="myFile"
                            className='upload__file'
                            placeholder='Upload your photo'
                            onChange={(event) => {
                                if (event.target.files[0].name.includes(".jpg")) {
                                    setFile(event.target.files[0])
                                    var reader = new FileReader();
                                    reader.onload = (event) => {
                                        setfileUrl(event.target.result)
                                    };
                                    reader.readAsDataURL(event.target.files[0]);
                                    setDataText(event.target.files[0].name)
                                    setErrPhoto('')
                                } else {
                                    setErrPhoto(<p className='error__input'>{'Only ".jpg"'}</p>)

                                }
                            }}
                            onBlur={handleBlur}
                            name="photo">

                        </input>
                        {touched.photo && errPhoto && errPhoto}

                    </div>
                    <button
                        className='header__button button__form'
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!isValid && !dirty}>
                        Sign up
                    </button>
                </div>
            )}
        </Formik>
    )
}



