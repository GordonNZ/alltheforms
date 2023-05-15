import React, { useState } from 'react';
import './SignUpForm.css';
import axios from 'axios';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (lastName === '' || firstName === '') {
      return alert('Please enter your first and last name');
    }
    if (!emailRegex.test(email)) {
      return alert('Please enter a valid email address');
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } else if (!passwordRegex.test(password)) {
      alert(
        'Password must be at least 8 characters long and contain at least one number, one uppercase letter and one lowercase letter'
      );
      return;
    } else {
      console.log('submit successeful');

      axios
        .post('http://localhost:4000/api/signup', {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const signupMessage = (
              <span style={{ color: '#0fdb46' }}>
                User successfully created!
              </span>
            );
            setSignupMessage(signupMessage);
          } else if (!res.status === 200) {
            const signupMessage = (
              <span style={{ color: 'red' }}>Something went wrong!</span>
            );
            setSignupMessage(signupMessage);
          }
        })
        .catch((err) => console.log(err));

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
    }
  };
  return (
    <div className='signup'>
      <form className='signupForm' onSubmit={(e) => handleSubmit(e)}>
        <h1 className='signupH1'>Create an Account</h1>
        <p className='signupDesc'>Enter your info to create your account</p>
        {signupMessage}
        <div className='flex signupFullName'>
          <div className='signupContainer flex signupFirstName'>
            <label className='signupLabel'>First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              className='signupInput'
              placeholder='Your first name'
            />
          </div>
          <div className='signupContainer flex'>
            <label className='signupLabel'>Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              className='signupInput'
              placeholder='Your last name'
            />
          </div>
        </div>
        <div className='signupContainer flex'>
          <label className='signupLabel'>Email</label>
          <input
            type='email'
            className='signupInput'
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='signupContainer flex'>
          <label className='signupLabel'>Password</label>
          <input
            type='password'
            className='signupInput'
            placeholder='min 8 characters'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='signupContainer flex'>
          <label className='signupLabel'>Confirm Password</label>
          <input
            type='password'
            className='signupInput'
            placeholder='min 8 characters'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className='createButton'>Create Account</button>
      </form>
    </div>
  );
}
