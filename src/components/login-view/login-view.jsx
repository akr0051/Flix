import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { BiLockAlt } from 'react-icons/bi';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://flix0051.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            alert('Username or Password Incorrect')
        });
    };

    return (
        <div >
            <form className="login-form">
                <h1 className="title">Great to meet you!</h1>
                <h1 className="subtitle">Log into your account</h1>
                <div className="input-label">
                    <label>Email</label>
                </div>
                <div className="input-control-box">
                    
                        <input className="input-control" type="email" name="email" placeholder="me@google.com" onChange={e =>setUsername(e.target.value) } />
                    
                    <HiOutlineMail className="icon-padding" color="white"/>
                </div>
                <div className="input-label">
                    <label className="password-label">Password</label>
                </div>
                <div className="input-control-box">
                    
                        <input className="input-control" type="password" name="password" placeholder="Enter your password" onChange={e =>setPassword(e.target.value)} />
                
                    <BiLockAlt className="icon-padding" color="white"/>
                </div>
                <div className="button-alignment">
                <button className="standard-btn" type="submit" onClick={handleSubmit}>Login</button>
                
            <Link to={`/register`}>
                <div>
                    <button className="register-btn" type="button" >Register</button>
                </div>
            </Link>
            </div>
            </form>
        </div>    
    );
}

LoginView.propTypes = {
    login: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLogin: PropTypes.func
}