import React from 'react';
import './SignUpForm.css';

export default function SignUpForm() {
  return (
    <div className='signup'>
      <form className='signupForm'>
        <h1 className='signupH1'>Create an Account</h1>
        <p className='signupDesc'>Enter your info to create your account</p>
        <div className='flex signupFullName'>
          <div className='signupContainer flex signupFirstName'>
            <label className='signupLabel'>First Name</label>
            <input
              type='text'
              className='signupInput'
              placeholder='Your first name'
            />
          </div>
          <div className='signupContainer flex'>
            <label className='signupLabel'>Last Name</label>
            <input
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
          />
        </div>
        <div className='signupContainer flex'>
          <label className='signupLabel'>Password</label>
          <input
            type='password'
            className='signupInput'
            placeholder='min 8 characters'
          />
        </div>
        <div className='signupContainer flex'>
          <label className='signupLabel'>Confirm Password</label>
          <input
            type='password'
            className='signupInput'
            placeholder='min 8 characters'
          />
        </div>
        <button className='createButton'>Create Account</button>
      </form>
    </div>
  );
}
