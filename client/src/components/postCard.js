import {useState, useEffect} from 'react';
import './postCard.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";

const PostCard = (props) => {
    const [loggedIn, setLoggedIn] = useState(() => {
        const saved = localStorage.getItem('LOGGED_IN');
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      })
    const [posts, setPosts] = useState([]);
    const [nowDeleted, setNowDeleted] = useState(false);

    const onDelete = async (ID) => {
        setNowDeleted(true);
        let response = await fetch(`http://localhost:2020/api/posts/${ID}`, {method: "DELETE"})
        await response.json();
        let deletePosts = [...posts];
        let deleted = deletePosts.filter((p) => p.id !== Number(ID));
        setPosts(deleted);
        props.handleDelete(posts);
    }
    return (
        <>
            {nowDeleted ? (<p>Post Deleted.</p>) : (
            <div className="post-card">
            <h1>{props.data.title}</h1>
            <p style={{textAlign:"right", fontSize: "11px"}}>Janice Montecillo, Published on October 12, 2022</p>
            {props.postLength === 1 ? (<><p>{props.data.text.replace(/<[^>]+>/g, '')}</p></>)
            : (<><p>{props.data.text.replace(/<[^>]+>/g, '').split('').splice(0, 250)}...</p> <div className="left-footer">
                <a onClick={() => props.handleRead(props.data.id)} style={{color: "black"}}>Read More</a>
                </div></>)}
            <div className="footer">
                <div className="left-footer">
                    {loggedIn.id === 1 && props.postLength === 1 ? (<>
                        <a style={{color: "black"}}>EDIT</a>
                        <a style={{color: "black"}} onClick={() => onDelete(props.data.id)}>DELETE</a>
                    </>) : null}
                </div>
                <div className="right-footer">
                    <span>Likes {props.data.likes}</span>
                </div>
            </div>
        </div>
            )}
        
        </>
    )
}

export default PostCard;