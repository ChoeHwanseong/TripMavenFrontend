import React from 'react';
import styles from '../../styles/guidemypage/GuideAskDetailsView.module.css';

const GuideAskDetailsView = () => {
    return (
        <div className={styles.inquiryDetails}>
            <div className={styles.title}>
                <h1>문의 내역<small className={styles.titlesmall}>상세보기</small></h1>
            </div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td>작성번호</td>
                        <td>9622</td>
                        <td>분류</td>
                        <td>가이드</td>
                    </tr>
                    <tr>
                        <td>아이디</td>
                        <td>park</td>
                        <td>작성일</td>
                        <td>2024-03-19</td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td colSpan="3">가이드 등록을 했는데 게시글이 올라가지 않아요</td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td colSpan="3">가이드 등록을 했는데 게시글이 올라가지 않아요... 내용 주세요</td>
                    </tr>
                    <tr>
                        <td>답변</td>
                        <td colSpan="3">은이중 점검 하지</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>수정 하기</button>
                <button className={styles.button}>삭제 하기</button>
                <button className={styles.button}>목록</button>
            </div>
        </div>
    );
};

export default GuideAskDetailsView;