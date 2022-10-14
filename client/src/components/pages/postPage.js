import {useState, useEffect} from 'react';
import MainPage from './mainPage.js';

const PostPage = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2020/api/posts")
          .then((response) => response.json())
          .then((posts) => {
            console.log(posts);
            setPosts(posts);
            });
    }, [posts]);

    return (
        <MainPage />
    )
}