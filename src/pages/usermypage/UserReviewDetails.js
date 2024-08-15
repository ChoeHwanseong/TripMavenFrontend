import React from 'react';
import styles from '../../styles/usermypage/UserReviewDetails.module.css';
import { useNavigate } from 'react-router-dom';

const ReviewDetails = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>리뷰 작성</h1>
            <hr className={styles.separator} />

            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="productName" className={styles.label}>
                        상품명
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        className={styles.input}
                        placeholder="상품명을 입력하세요"
                        defaultValue="강원도 갈래?~~~~"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="rating" className={styles.label}>
                        별점
                    </label>
                    <div className={styles.starRating}>
                        {/*★ ★ ★ ★ ★ */}
                        {/* 
                            <img src='../../../images/emptyStar.png'/>
                            <img src='../../../images/emptyStar.png'/>
                            <img src='../../../images/emptyStar.png'/>
                            <img src='../../../images/emptyStar.png'/>
                            <img src='../../../images/emptyStar.png'/>
                        */}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="content" className={styles.label}>
                        내용을 입력하세요
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className={styles.textarea}
                        placeholder="내용을 입력하세요"
                    ></textarea>
                </div>

                <button type="submit" className={styles.submitButton} onClick={()=>navigate('/userreview')}>
                    등록 하기
                </button>
            </form>
        </div>
    );
};

export default ReviewDetails;
