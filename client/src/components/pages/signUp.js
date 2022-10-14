import {useState} from 'react';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const SignUp = () => {
    const [users, setUsers] = useState([]);
    const [values, setValues] = useState({username: "", password: "", first_name: "", last_name: "", image: ""});
    const [isSubmitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = values;
        const rawResponse = await fetch('http://localhost:2020/api/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });
        const content = await rawResponse.json();
      
        setUsers([...users, content]);
        setValues({username: "", password: "", first_name: "", last_name: "", image: ""});
        setSubmitted(true);
    }

    const handleInput = (e) => {
        setValues((preValues) => ({
            ...preValues,
            [e.target.name]: e.target.value
        }))
    };

    return (
        <>
        {isSubmitted ? (<><p>Thanks for signing up!</p><Link to="/login" className="read">Log In</Link></>) : (<div className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label>Username </label>
            <input type="text" name="userame" required defaultValue={values.username} onChange={handleInput}/>
        </div>
        <div className="input-container">
            <label>Password </label>
            <input type="password" name="password" required defaultValue={values.password} onChange={handleInput}/>
        </div>
        <div className="input-container">
            <label>First Name </label>
            <input type="text" name="first_name" required defaultValue={values.first_name} onChange={handleInput}/>
        </div>
        <div className="input-container">
            <label>Last Name </label>
            <input type="text" name="last_name" required defaultValue={values.last_name} onChange={handleInput}/>
        </div>
        <div className="input-container">
            <label>Avatar</label>
            <input type="text" name="image" defaultValue={values.image} onChange={handleInput}/>
        </div>
        <div className="button-container">
            <input type="submit" />
        </div>
        </form>
    </div>)}
      </>
    )
}

export default SignUp;