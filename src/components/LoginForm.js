import React from 'react';
import './LoginForm.css';

export default function LoginForm() {
  return (
    <div className='login'>
      <form className='loginForm'>
        <h1 className='loginH1'>Sign In</h1>
        <input
          type='text'
          placeholder='Email'
          className='loginEmail loginInput'
        />
        <input
          type='password'
          placeholder='Password'
          className='loginPassword loginInput'
        />
        <div className='loginOptions'>
          <div className='checkContainer'>
            <input type='checkbox' className='checkbox' />
            <p>Remember me</p>
          </div>
          <p>Forgot password?</p>
        </div>
        <button type='submit' className='loginBtn'>
          Sign In
        </button>
        <p>
          Don't have an account?{' '}
          <a href='#' className='loginCreate'>
            Create
          </a>
        </p>
      </form>
    </div>
  );
}
