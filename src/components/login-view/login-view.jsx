import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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
            console.log('no such user')
        });
    };

    return (
        
        <Form className="logon-block">
            <div className="header">
                <h1 className="title">Great to meet you!</h1>
                <h5 className="subtitle">Log into your account</h5>
            </div>
            
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" value={username} onChange={e =>setUsername(e.target.value) } />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={e =>setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Logon</Button>
            <Link to={`/register`}>
                <Button className="register-btn" variant="primary" type="link" >Register</Button>
            </Link>
        </Form>
    );
}

LoginView.propTypes = {
    login: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLogin: PropTypes.func
}