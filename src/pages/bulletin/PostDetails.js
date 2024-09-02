// src/bulletin/PostDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const foundPost = storedPosts.find(p => p.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

  const handleDelete = () => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = storedPosts.filter(post => post.id !== parseInt(id));
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    navigate('/bulletin');
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  //if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className="my-4">게시글 상세</h1>
      </div>
      <div className={styles.column}>
        <h1 className="my-3" style={{ textAlign: 'left' }}>{post&&post.title}</h1>
        <p><strong>작성자:</strong> {post&&post.author}</p>
        <p><strong>작성일:</strong> {post&&post.date}</p>
        <div>{post&&post.content}</div>
      </div>
      
      <button
        className="btn btn-secondary mt-4"
        onClick={() => navigate('/bulletin')}
      >
        목록으로 돌아가기
      </button>
      <button
        className="btn btn-warning mt-2"
        onClick={handleEdit}
      >
        수정
      </button>
      <button
        className="btn btn-danger mt-2"
        onClick={handleDelete}
      >
        삭제
      </button>
    </div>
  );
};

export default PostDetails;
