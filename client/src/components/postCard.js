import {useState} from 'react';
import './postCard.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const PostCard = (props) => {
    return (
        <div className="post-card">
            <h1>{props.data.title}</h1>
            <p style={{textAlign:"right"}}>Janice Montecillo</p>
            <p>October 12, 2022</p>
            {props.postLength === 1 ? <p>{props.data.text}</p> : (<><p>{props.data.text.split('').splice(0, 250)}...</p> <div className="left-footer">
                    <a onClick={() => props.handleRead(props.data.id)} style={{color: "black"}}>Read More</a>
                </div></>)}
            <div className="footer">
                <div className="right-footer">
                    <span>Like</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard;