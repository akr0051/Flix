import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { HiOutlineMail } from 'react-icons/hi';
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
    axios.post('https://flix0051.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      // Birthday: birthday
    })
      .then((response) => {
        const { data } = response;
        window.open('/', '_self');
      })
      .catch((e) => {
        alert('Error registering.');
      });
  };

  return (
    <div className="background-view">

      <div className="header">Flix</div>

      <form className="main-form">

        <div className="main-title" id="reg-title">Great to meet you!</div>
        <div className="main-subtitle">Create an account</div>

        <div className="input-label" id="reg-form-label">
          <label>Username</label>
        </div>

        <div className="input-control-box">
          <input className="input-control" placeholder="me" type="text" onChange={(e) => setUsername(e.target.value)} />
          <BsPerson color="white" />
        </div>

        <div className="input-label" id="reg-form-label">
          <label>Email</label>
        </div>

        <div className="input-control-box">
          <input className="input-control" placeholder="me@google.com" type="text" onChange={(e) => setEmail(e.target.value)} />
          <HiOutlineMail color="white" />
        </div>

        <div className="input-label" id="reg-form-label">
          <label>Password</label>
        </div>

        <div className="input-control-box">
          <input className="input-control" placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <BiLockAlt color="white" />
        </div>

        <div className="blank-label" />

        <div className="input-control-box">
          <input className="input-control" placeholder="Enter your password again" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        {/* <div controlId="formBirthday">
                <div>Birthday</div>
                <div placeholder="Enter your birthday" type="text" onChange={e =>setBirthday(e.target.value)} />
            </div> */}

        <button className="standard-btn" type="submit" onClick={handleSubmit}>
          Register
        </button>

      </form>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func,
};
