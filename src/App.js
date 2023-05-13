import './App.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { useGoogleLogin, googleLogout, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log(`Login Fails: `, error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };

  return (
    <div className='App'>
      <LoginForm />
      <SignUpForm />
      {profile ? (
        <div>
          <img src={profile.picture} alt='person' />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <button onClick={login}>Log In</button>
      )}
    </div>
  );
}

export default App;
