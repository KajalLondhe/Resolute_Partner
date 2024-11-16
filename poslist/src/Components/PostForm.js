
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/PostForm.css';

const PostForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; 
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    if (formData.image) form.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/api/posts', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created:', response.data);
      navigate('/getdata');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="post-form-container">
      <h1 className="form-heading">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="input-wrapper">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="input-wrapper">
          <textarea
            name="description"
            placeholder="Post Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea-field"
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="file-input"
            required
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>

        <button type="submit" className="submit-btn">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
