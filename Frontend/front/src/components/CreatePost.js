import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './createPost.css';

const CreatePost =() => {
    const navigate =useNavigate();
    const [newBlog, setNewBlog]= useState({});

    const handleChange =(e) => {
        setNewBlog ({
            ...newBlog,
            [e.target.name]: e.target.value,

        });
    };
    const handleSubmit =async (e) => {
        e.preventDefault();
    

    try{
        await axios.post('http://localhost:3000/api/posts',newBlog);
        navigate('/blog');
    } catch (error){
        console.error('Error creating blog:' ,error);
    }
    };
    return(
        <div className='container mt-5'>
        <h1 className='mb-4'>Create Blog</h1>
        <div className='form-group'>
        <div className="form-control">
        <label>Name</label>
        <input
        type="text"
        name="name"
        onChange={handleChange}
        required
        placeholder="Enter name"
        />
        </div>
        <div className="form-control">
        <label>Slug</label>
        <input
        type="text"
        name="slug"
        onChange={handleChange}
        required
        placeholder="Enter slug"
        />
        </div>

        <div className="form-control">
        <label>Tags</label>
        <input
        type="text"
        name="tags"
        onChange={handleChange}
        required
        placeholder="Enter tags"
        />
        </div>
        <button className="custom-button" type="submit" onClick={handleSubmit}>
            Create Blog
        </button>
        </div>
        </div>
    );
};
 export default CreatePost;