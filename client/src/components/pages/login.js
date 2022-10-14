import {useState, useEffect} from 'react';
import MainPage from './mainPage.js';
import './login.css';

const LogIn = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [users, setUsers] = useState({});
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        fetch("http://localhost:2020/api/users")
          .then((response) => response.json())
          .then((users) => {
                setUsers(users);
              });
    }, []);
    
    console.log(users);

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        var { uname, pass } = document.forms[0];

        // Find user login info/fetch database
        const userData = users.find((user) => user.username === uname.value);
      
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
          } else {
            setIsSubmitted(true);
            setLoggedIn(userData);
          }
        } else {
          // Username not found
          setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    return (
        <>
        {isSubmitted ? <h1>Logged In</h1> : 
        <div className="form">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
            <div className="input-container">
                <label>Username </label>
                <input type="text" name="uname" required />
                {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" required />
                {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
            </form>
        </div>
        }
    </>
    )
}

export default LogIn;