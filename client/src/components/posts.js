import {useState, useEffect} from 'react';
import PostCard from './postCard';
import NewPost from './pages/newPost';
import './posts.css'
import statue from './statue.png';

const Posts = (props) => {
    const [loggedIn, setLoggedIn] = useState(() => {
        const saved = localStorage.getItem('LOGGED_IN');
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      })
    const [posts, setPosts] = useState([]);
    const [favoritePosts, setFavoritePosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2020/api/posts")
          .then((response) => response.json())
          .then((posts) => {
            console.log(posts);
            setPosts(posts);
            });
    }, []);
    
    console.log(posts);

    const handleRead = (id) => {
        console.log(id);
        setPosts(posts.filter((i) => Number(id) === i.id));
    }

    const handleDelete = (updatedPosts) => {
        setPosts(updatedPosts);
    }

    const handleFavorites = (favorites) => {
        setFavoritePosts(favorites);
    }

    return (
        <div className="box">
            <div className="posts">
                {props.newPost ? (<div className="new-post"><NewPost /></div>) : props.favorites ? (
                   <div className="favorites">
                    <h1>Favorites</h1>
                        {favoritePosts.map((post) => {
                            return (
                                <PostCard data={post} postLength={posts.length} key={post.id} handleRead={handleRead} handleDelete={handleDelete} handleFavorites={handleFavorites} />
                            )
                        })}
                   </div> 
                ) : (
                <div className="container">
                    {posts.length === 1 ? null : (<div>
                        <img src={statue} alt="statue of david" height="550px" style={{marginLeft: "-132px"}}/>
                    </div>)
                    }
                    {posts.map((post) => {
                        return (
                            <PostCard data={post} postLength={posts.length} key={post.id} handleRead={handleRead} handleDelete={handleDelete} handleFavorites={handleFavorites} />
                        )
                    })}
                </div>)}
                <div className="intro">
                    <p>The visual world, the world as we see it, is a world populated by colored objects. Typically, we see the world as having a rich tapestry of colors or colored forms—fields, mountains, oceans, skies, hairstyles, clothing, fruit, plants, animals, buildings, and so on. Colors are important in both identifying objects, i.e., in locating them in space, and in re-identifying them. So much of our perception of physical things involves our identifying objects by their appearance, and colors are typically essential to an object’s appearance, that any account of visual perception must contain some account of colors. Since visual perception is one of the most important species of perception and hence of our acquisition of knowledge of the physical world, and of our environment, including our own bodies, a theory of color is doubly important.</p>
                    <a></a>
                </div>
            </div>
        </div>
    )
}

export default Posts;