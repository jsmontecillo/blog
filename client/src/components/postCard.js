import {useState} from 'react';
import './postCard.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const PostCard = (props) => {
    return (
        <div className="post-card">
            <h1>{props.data.title}</h1>
            <img src={props.data.images} alt="article" />
            <p>{props.data.text.split('').splice(0, 250)}...</p>
            <Link to="/" className="read">Read More</Link>
        </div>
    )
}

export default PostCard;