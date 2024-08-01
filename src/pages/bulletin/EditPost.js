// src/bulletin/EditPost.js
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const foundPost = storedPosts.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
      setTitle(foundPost.title);
      setAuthor(foundPost.author);
      setContent(foundPost.content);
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPost = {
      id: post.id,
      title,
      author,
      content,
      date: post.date,
    };

    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = storedPosts.map(p => p.id === post.id ? updatedPost : p);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    navigate(`/post/${post.id}`);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className="my-4">게시글 수정</h1>
      </div>
      <div className={styles.column}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">제목</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">작성자</label>
            <input
              type="text"
              className="form-control"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">내용</label>
            <textarea
              className="form-control"
              id="content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <Link to="/bulletin">
          <button className="btn btn-primary mb-4">저장</button>
          </Link>
        </form>
      </div>
      <button
        className="btn btn-secondary mt-2"
        onClick={() => navigate(`/bulletin/post/${post.id}`)}
      >
        게시글 보기
      </button>
    </div>
  );
};

export default EditPost;
