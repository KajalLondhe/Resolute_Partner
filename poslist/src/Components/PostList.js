
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id)); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); 
  };

  return (
    <div className='main'>
    <div className="post-list-container">
      <h1>Posts</h1>
      <button className="create-btn" onClick={() => navigate('/')}>Create New Post</button>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.imageUrl && <img src={`http://localhost:5000${post.imageUrl}`} alt={post.title} />}
            <div className="post-actions">
              <button className="edit-btn" onClick={() => handleEdit(post._id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default PostList;
