import React, { useRef, useState } from 'react';
import './LoginForm.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
//https://stock.adobe.com/nz/247517678?as_channel=adobe_com&as_campclass=brand&as_campaign=srp-raill&as_source=behance_net&as_camptype=acquisition&as_audience=users&as_content=thumbnail-click&promoid=J7XBWPPS&mv=other&asset_id=247284802
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = () => {
    if (email === '' || password === '') {
      const loginMessage = (
        <p className='loginNotice'>Email or password is empty</p>
      );
      setLoginMessage(loginMessage);
      return;
    } else {
      setLoginMessage('');
    }

    const login = async () => {
      try {
        const response = await axios
          .post('http://localhost:4000/api/login', {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log('Response', res);
            if (res.status === 200) {
              const loginMessage = (
                <p className='loginNotice' style={{ color: '#0fdb46' }}>
                  Login successeful!
                </p>
              );
              setLoginMessage(loginMessage);
              setEmail('');
              setPassword('');
            }
          });
      } catch (error) {
        console.log('Error', error.response);
        if (error.response.status === 404) {
          const loginMessage = <p className='loginNotice'>User is not found</p>;
          setLoginMessage(loginMessage);
        } else if (error.response.status === 401) {
          const loginMessage = <p className='loginNotice'>Invalid Password</p>;
          setLoginMessage(loginMessage);
        }
      }
    };
    login();

    // console.log(email);
    // console.log(password);
    // setEmail('');
    // setPassword('');
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const showPassword = (
    <AiOutlineEye className='eyeIcon' onClick={togglePassword} />
  );
  const hidePassword = (
    <AiOutlineEyeInvisible className='eyeIcon' onClick={togglePassword} />
  );
  return (
    <div className='login'>
      <form
        className='loginForm'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className='loginH1'>Sign In</h1>
        {/* <p ref={notice} className='loginNotice'></p> */}
        {loginMessage}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          placeholder='Email'
          className='loginEmail loginInput'
        />
        <div className='inputContainer'>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordShown ? 'text' : 'password'}
            placeholder='Password'
            className='loginPassword loginInput'
          />
          {passwordShown ? hidePassword : showPassword}
        </div>
        <div className='loginOptions'>
          <div className='checkContainer'>
            <input type='checkbox' className='checkbox' />
            <p>Remember me</p>
          </div>
          <p>Forgot password?</p>
        </div>
        <button type='submit' className='loginBtn' onClick={handleSubmit}>
          Sign In
        </button>
        <p>
          Don't have an account?
          <a href='#' className='loginCreate'>
            Create
          </a>
        </p>
      </form>
    </div>
  );
}
