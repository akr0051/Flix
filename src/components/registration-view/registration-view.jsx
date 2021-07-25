import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { HiOutlineMail } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import axios from 'axios';

export function RegistrationView() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://flix0051.herokuapp.com/users',{
        Username: username,
        Password: password,
        Email: email,
        // Birthday: birthday
    })
    .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
    })
    .catch(e => {
        alert('Error registering')
    });

    }

    return (
        <form className="reg-block">
            <div className="title">Great to meet you!</div>
            <div className="subtitle">Create an account</div>
            <div controlId="formUsername">
                <div>Username</div>
                <div placeholder="me@google.com" type="text" onChange={e =>setUsername(e.target.value)} /><BsPerson color="white" class="d-inline-block btn float-right"/>
            </div>
            <div controlId="formEmail">
                <div>Email</div>
                <div placeholder="me@google.com" type="text" onChange={e =>setEmail(e.target.value)} /><HiOutlineMail color="white"/>
            </div>
            <div controlId="formPassword">
                <div>Password</div>
                <div placeholder="Enter your password" type="text" onChange={e =>setPassword(e.target.value)} /><BiLockAlt color="white"/>
            </div>
            <div controlId="formPassword">
                <div placeholder="Enter your password again" type="text" onChange={e =>setPassword(e.target.value)} />
            </div>
            {/* <div controlId="formBirthday">
                <div>Birthday</div>
                <div placeholder="Enter your birthday" type="text" onChange={e =>setBirthday(e.target.value)} />
            </div> */}
            <button className="register-btn" variant="primary" type="submit" onClick={handleSubmit} >
                Register
            </button>
        </form>
    )
    
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired
    }),
    onRegister: PropTypes.func
}