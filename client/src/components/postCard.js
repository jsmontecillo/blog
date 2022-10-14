import {useState} from 'react';
import './postCard.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const PostCard = (props) => {
    return (
        <div className="post-card">
            <h1>{props.data.title}</h1>
            <img src={props.data.images} alt="article" />
            <p>{props.data.text}</p>
            <Link to="/" className="link">Read More</Link>
        </div>
    )
}

export default PostCard;