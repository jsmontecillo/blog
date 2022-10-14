import {useState, useEffect} from 'react';
import PostCard from './postCard';
import './posts.css'

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2020/api/posts")
          .then((response) => response.json())
          .then((posts) => {
            console.log(posts);
            setPosts(posts);
            });
    }, [posts]);
    
    console.log(posts);

    return (
        <div className="box">
        <div className="posts">
            {posts.map((post) => {
                return (
                    <PostCard data={post} key={post.id}/>
                )
            })}
        </div>
        </div>
    )
}

export default Posts;