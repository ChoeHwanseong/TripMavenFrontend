import React from 'react';
import styles from '../../styles/guidemypage/PostHeader.module.css';

const PostHeader = () => {
    return (
        <div className={styles.postHeaderContainer}>
            <div className={styles.topBar}>
                <span>번째 게시글</span>
                <a href="#" className={styles.viewAllLink}>목록열기</a>
            </div>
            <div className={styles.titleSection}>
                <div className={styles.category}>지역명</div>
                <h1 className={styles.title}>제목뿌리기</h1>
                <div className={styles.authorInfo}>
                    <img src="/path/to/avatar.png" alt="Author Avatar" className={styles.avatar}/>
                    <span>개굴개굴</span>
                    <span className={styles.time}>6시간 전</span>
                </div>
                <div className={styles.actionButtons}>
                    <button className={styles.copyUrlButton}>#해시태그</button>
                </div>
            </div>
            <div className={styles.divider}></div>
        </div>
    );
};

export default PostHeader;
