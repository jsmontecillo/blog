import {useState, useEffect} from 'react';
import Header from '../header.js';
import Posts from '../posts.js';
import './mainPage.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const MainPage = (props) => {

    const [selectedLink, setSelectedLink] = useState(false);
    const [loggedIn, setLoggedIn] = useState(() => {
        const saved = localStorage.getItem('LOGGED_IN');
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      });
    console.log(loggedIn);
    const [selectedFavorites, setSelectedFavorites] = useState(false);

    useEffect(() => {
      localStorage.setItem('LOGGED_IN', JSON.stringify(loggedIn));
    }, [loggedIn]);
    return (
        <>
            <div>
            <div className="nav-body">
                <nav className="nav-bar">
                    <div className="links">
                        <a onClick={() => window.location.reload()}>HOME</a>
                        <a onClick={() => window.location.reload()}>ABOUT</a>
                        <a onClick={() => window.location.reload()}>ARCHIVE</a>
                    </div>
                    <span className="greeting">
                    {loggedIn ? <span style={{color:"white"}}>Hello, {loggedIn.first_name}. {loggedIn.id === 1 ? <><a onClick={() => setSelectedLink(true)}>NEW POST</a> <a onClick={() => setLoggedIn(null)}>SIGN OUT</a></> : <><a onClick={() => setSelectedFavorites(true)}>FAVORITED</a><a onClick={() => setLoggedIn(null)}>SIGN OUT</a></>}</span> : (<Link to="/login" className="link">LOG IN</Link>)}
                    </span>
                </nav>
            </div>
            <Outlet />
            <Posts newPost={selectedLink} favorites={selectedFavorites}/>
            </div>
            <p className="title">Philosophy of Color</p>
        </>
    )
}

export default MainPage;