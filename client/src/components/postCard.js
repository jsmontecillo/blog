import {useState, useEffect} from 'react';
import './postCard.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const PostCard = (props) => {
    return (
        <div className="post-card">
            <h1>{props.data.title}</h1>
            <p style={{textAlign:"right", fontSize: "11px"}}>Janice Montecillo, Published on October 12, 2022</p>
            {props.postLength === 1 ? <p>{props.data.text.replace(/<[^>]+>/g, '')}</p> : (<><p>{props.data.text.replace(/<[^>]+>/g, '').split('').splice(0, 250)}...</p> <div className="left-footer">
                    <a onClick={() => props.handleRead(props.data.id)} style={{color: "black"}}>Read More</a>
                </div></>)}
            <div className="footer">
                <div className="right-footer">
                    <span>Likes {props.data.likes}</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard;