// MyPage.jsx
import React from 'react';
import styles from '../../styles/guidemypage/GuideMyPagePost.module.css';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../../components/sideMenu';

const GuideMyPagePost = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.postheader}>
                    <h2 className={styles.subtitle}>게시물 작성</h2>
                    <button className={styles.submitButton}>게시물 등록 하기</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>작성번호</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>평가 여부</th>
                            <th>등록 여부</th>
                            <th>찜</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>9621</td>
                            <td>부산</td>
                            <td>2024-08-01</td>
                            <td>평가 완료</td>
                            <td>등록</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>1212</td>
                            <td>제주도</td>
                            <td>2023-12-31</td>
                            <td>평가 완료</td>
                            <td>등록</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>7681</td>
                            <td>경주</td>
                            <td>2024-03-19</td>
                            <td>평가 대기</td>
                            <td>미등록</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    <button className={styles.pageButton}>〈</button>
                    <span className={styles.pageNumber}>1</span>
                    <button className={styles.pageButton}>〉</button>
                </div>
                
            </div>
        </div>
    );
};

export default GuideMyPagePost;
