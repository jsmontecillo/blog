import {useState} from 'react';

const EditForm = (props) => {
    const [editedPost, setEditedPost] = useState(props.editedPost);
    return (
        <div>
            <h1>Edit Form for {editedPost.title}</h1>
            <div>
                <form>
                    <label>Title</label>
                    <input type="text" name="title" placeholder={editedPost.title}/><br/>
                    <label>Text</label>
                    <textarea name="text" rows="4" cols="50">{editedPost.text}</textarea><br/>
                    <label>Images</label>
                    <input type="text" name="title" placeholder={editedPost.images}/><br/>
                    <button type="submit" >Publish</button>
                </form>
            </div>
        </div>
    )
}

export default EditForm;