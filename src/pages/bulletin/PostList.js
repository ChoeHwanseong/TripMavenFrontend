import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';  // Header 컴포넌트 경로
import Footer from '../components/Footer';  // Footer 컴포넌트 경로
import styles from './index.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const deletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div>
      <Header />  {/* Header 컴포넌트 추가 */}
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className="my-4">질문 게시판</h1>
        </div>
        <div className={styles.column}>
          <table className="table table-borderless">
            <thead className="table-light">
              <tr className="table-active">
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td><Link to={`/bulletin/post/${post.id}`}>{post.title}</Link></td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePost(post.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/bulletin/write">
            <button className="btn btn-primary">게시글 작성</button>
          </Link>
        </div>
      </div>
      <Footer />  {/* Footer 컴포넌트 추가 */}
    </div>
  );
};

export default PostList;
