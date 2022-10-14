import {useState} from 'react';

const NewPost = () => {
    const [posts, setPosts] = useState([]);
    const [values, setValues] = useState({user_id: "", title: "", text: "", images: "", likes: 0});
    const [isSubmitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = values;
        const rawResponse = await fetch('http://localhost:2020/api/posts', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPost)
        });
        const content = await rawResponse.json();
      
        setPosts([...posts, content]);
        setValues({user_id: "", title: "", text: "", images: "", likes: 0});
        setSubmitted(true);
    }

    const handleInput = (e) => {
        setValues((preValues) => ({
            ...preValues,
            [e.target.name]: e.target.value
        }))
    };

    return (
        <div className="form">
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label>Username </label>
            <input type="text" name="userame" required defaultValue={values.username} onChange={handleInput}/>
        </div>
        <div className="input-container">
            <label>Password </label>
            <input type="password" name="password" required defaultValue={values.password} onChange={handleInput}/>
        </div>
        <div className="input-container">
            <label>First Name </label>
            <input type="text" name="first_name" required defaultValue={values.first_name} onChange={handleInput}/>
        </div>
        <div className="input-container">
            <label>Last Name </label>
            <input type="text" name="last_name" required defaultValue={values.last_name} onChange={handleInput}/>
        </div>
        <div className="input-container">
            <label>Avatar</label>
            <input type="text" name="image" defaultValue={values.image} onChange={handleInput}/>
        </div>
        <div className="button-container">
            <input type="submit" />
        </div>
        </form>
    </div>
    )
}

export default NewPost;