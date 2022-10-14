import {useState, useEffect} from 'react';
import PostCard from './postCard';
import './posts.css'
import statue from './statue.png';

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
                <div className="container">
                    <div>
                        <img src={statue} alt="statue of david" height="550px" style={{marginLeft: "-132px"}}/>
                    </div>
                    {posts.map((post) => {
                        return (
                            <PostCard data={post} key={post.id}/>
                        )
                    })}
                </div>
                <div className="intro">
                    <p>The visual world, the world as we see it, is a world populated by colored objects. Typically, we see the world as having a rich tapestry of colors or colored forms—fields, mountains, oceans, skies, hairstyles, clothing, fruit, plants, animals, buildings, and so on. Colors are important in both identifying objects, i.e., in locating them in space, and in re-identifying them. So much of our perception of physical things involves our identifying objects by their appearance, and colors are typically essential to an object’s appearance, that any account of visual perception must contain some account of colors. Since visual perception is one of the most important species of perception and hence of our acquisition of knowledge of the physical world, and of our environment, including our own bodies, a theory of color is doubly important.</p>
                </div>
            </div>
        </div>
    )
}

export default Posts;