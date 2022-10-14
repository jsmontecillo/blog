import {useState, useEffect} from 'react';
import Header from '../header.js';
import Posts from '../posts.js';
import './mainPage.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const MainPage = () => {

    return (
        <>
            <nav className="nav-bar">
                <Link to="/" className="link">HOME</Link>
                <Link to="/about" className="link">ABOUT</Link>
                <Link to="/archive" className="link">ARCHIVE</Link>
                <span>
                <Link to="/login" className="link">LOG IN</Link>
                </span>
            </nav>
            <Header />
            <Outlet />
            <div>
                Hello!
            </div>
            <Posts/>
        </>
    )
}

export default MainPage;