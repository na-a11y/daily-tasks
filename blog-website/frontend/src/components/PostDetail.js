import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/posts/${id}`);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail-container">
      <div className="post-detail">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p className="post-author">By: {post.author}</p>
        <div className="button-group">
          <button>
            <Link to={`/update/${post._id}`}>Edit Post</Link>
          </button>
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
