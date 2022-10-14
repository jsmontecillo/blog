import {useState, useEffect} from 'react';
import Header from '../header.js';
import Posts from '../posts.js';
import './mainPage.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const MainPage = (props) => {

    const [selectedLink, setSelectedLink] = useState(false);
    return (
        <>
            <div>
            <div className="nav-body">
                <nav className="nav-bar">
                    <div className="links">
                        <Link to="/" className="link">HOME</Link>
                        <Link to="/about" className="link">ABOUT</Link>
                        <Link to="/archive" className="link">ARCHIVE</Link>
                    </div>
                    <span className="greeting">
                    {props.user ? <span style={{color:"white"}}>Hello, {props.user.first_name}. {props.user.id === 1 ? <><a onClick={() => setSelectedLink(true)}>NEW POST</a> <a>SIGN OUT</a></> : <><a onClick={() => setSelectedLink(true)}>FAVORITED</a><a>SIGN OUT</a></>}</span> : (<Link to="/login" className="link">LOG IN</Link>)}
                    </span>
                </nav>
            </div>
            <Outlet />
            <Posts newPost={selectedLink}/>
            </div>
            <p className="title">Philosophy of Color</p>
        </>
    )
}

export default MainPage;