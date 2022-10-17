import {useState, useEffect} from 'react';
import './postCard.css';
import { BrowserRouter, Route, Link, Outlet } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import EditForm from './editForm';

const PostCard = (props) => {
    const [loggedIn, setLoggedIn] = useState(() => {
        const saved = localStorage.getItem('LOGGED_IN');
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      })
    const [posts, setPosts] = useState([]);
    const [nowDeleted, setNowDeleted] = useState(false);
    const [liked, setLiked] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [editedPost, setEditedPost] = useState(null);
    

    const onDelete = async (ID) => {
        setNowDeleted(true);
        let response = await fetch(`http://localhost:2020/api/posts/${ID}`, {method: "DELETE"})
        await response.json();
        let deletePosts = [...posts];
        let deleted = deletePosts.filter((p) => p.id !== Number(ID));
        setPosts(deleted);
        props.handleDelete(posts);
    }

    const handleLiked = (likedPost) => {
        setLiked(!liked);
        favorites.push(likedPost);
        props.handleFavorites(favorites);
    }

    const onEdit = () => {
        setEditedPost(props.data);
    }
    return (
        <>
            {nowDeleted ? (<p>Post Deleted.</p>) : editedPost ? (<div style={{float: "left"}}>
                <EditForm editedPost={editedPost}/>
            </div>) 
            : (
            <div className="post-card">
            <h1>{props.data.title}</h1>
            <p style={{textAlign:"right", fontSize: "11px"}}>Janice Montecillo, Published on October 14, 2022</p>
            <img src={props.data.images} alt={props.data.title} width="400px" style={{borderRadius: "40px"}}/>
            {props.postLength === 1 ? (<><p>{props.data.text.replace(/<[^>]+>/g, '')}</p></>)
            : (<><p>{props.data.text.replace(/<[^>]+>/g, '').split('').splice(0, 250)}...</p> <div className="left-footer">
                <a onClick={() => props.handleRead(props.data.id)} style={{color: "black"}}>Read More</a>
                </div></>)}
            <div className="footer">
                <div className="left-footer">
                    {loggedIn.id === 1 && props.postLength === 1 ? (<>
                        <a style={{color: "black"}} onClick={onEdit}>EDIT</a>
                        <a style={{color: "black"}} onClick={() => onDelete(props.data.id)}>DELETE</a>
                    </>) : null}
                </div>
                <div className="right-footer">
                    <span><i className={liked ? "fa fa-heart" : "fa fa-heart-o"} onClick={() => handleLiked(props.data)}></i> Like</span>
                </div>
            </div>
        </div>
            )}
        
        </>
    )
}

export default PostCard;