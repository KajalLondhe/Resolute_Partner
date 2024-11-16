import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/UpdatePostForm.css';

const UpdatePostForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', image: null, imageUrl: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/edit/${id}`);


        setFormData({
          title: response.data.title,
          description: response.data.description,
          imageUrl: response.data.imageUrl || '',
        });
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch post data.');
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    if (formData.image) form.append('image', formData.image);

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setSuccessMessage('Post updated successfully!');
      setTimeout(() => navigate('/getdata', { state: { updated: true } }), 1500);
    } catch (error) {
      setError('Error updating post.');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="update-post-form-container">
      <h1>Update Post</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="update-post-form">
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
          placeholder="Title"
        />
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          placeholder="Description"
        />
        {formData.imageUrl && (
          <div className="image-preview">
            <p>Current Image:</p>
            <img src={`http://localhost:5000${formData.imageUrl}`} alt="Current Post" className="preview-image" />
          </div>
        )}
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit" className="submit-btn">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
