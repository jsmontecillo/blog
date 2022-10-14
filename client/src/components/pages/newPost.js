import {useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewPost = () => {
    const [posts, setPosts] = useState([]);
    const [values, setValues] = useState({user_id: "", title: "", text: "", images: "", likes: 0});
    const [isSubmitted, setSubmitted] = useState(false);
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = values;
        newPost.text = text;
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


    console.log(values);

    return (
        <>
            {isSubmitted ? <p>Check out your post <a onClick={()=>window.location.reload()}>here</a>.</p> : (
                    <div className="post-form">
                    <h1>New Post</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input type="text" name="user_id" placeholder="User ID" required defaultValue={values.user_id} onChange={handleInput}/>
                    </div><br/>
                    <div className="input-container">
                        <input type="text" name="title" placeholder="Title" required defaultValue={values.title} onChange={handleInput}/>
                    </div><br/>
                    <div className="input-container">
                        <label htmlFor="blog-post">Text</label><br/>
                        <CKEditor
                            editor={ClassicEditor}
                            data={values.text}
                            onChange={(event,editor) => {
                                const data = editor.getData();
                                setText(data);
                            }}
                            placeholder="Text"
                        />
                    </div><br/>
                    <div className="input-container">
                        <input type="text" name="images" placeholder="Image URL" defaultValue={values.images} onChange={handleInput}/>
                    </div><br/>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                    </form>
                </div>
            )}
        </>

    )
}

export default NewPost;