import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://flix0051.herokuapp.com/users',{
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    })
    .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
    })
    .catch(e => {
        console.log('error registering the user')
    });

        console.log (username, password, email, birthday)
    }

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e =>setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" onChange={e =>setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" onChange={e =>setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="text" onChange={e =>setBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit} >
                Register
            </Button>
            <Link to={'/'}>
                <Button variant="primary">Back to Login</Button>
            </Link>
        </Form>
    )
    
    /* return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                Birthday:
                <input type="text" value={birthDate} onChange={e => setBirthDate(e.target.value)}/>
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>

    ) */
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