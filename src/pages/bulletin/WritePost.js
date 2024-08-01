// src/bulletin/WritePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      author,
      content,
      date: new Date().toISOString().split('T')[0],
    };

    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
    navigate('/bulletin'); // 게시글 작성 후 목록 페이지로 이동
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className="my-4">게시글 작성</h1>
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
          <button type="submit" className="btn btn-primary mb-4">게시</button>
        </form>
      </div>
      <button
        className="btn btn-warning mt-2"
        onClick={() => navigate('/bulletin')}
      >
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default WritePost;
