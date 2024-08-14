import React, { useEffect, useState } from 'react';
import styles from '../../styles/guidemypage/GuideAskDetailsView.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { csfetchData } from '../../utils/csfetchData';
import { Box } from '@mui/material';

const GuideAskDetailsView = () => {

    const { id } = useParams();
    const [inquiry, setInquiry] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getCSData = async () => {
            try {
                const fetchedData = await csfetchData(id);
                setInquiry(fetchedData);
            } catch (error) {
                console.error('에러났당', error);
            }
        };

        getCSData();
    }, [id]);

    if (!inquiry) {
        return <div>로딩중</div>; {/* 이코드 지우면 inquery.id 가져올때 오류발생할수도있음 */ }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>문의 내역<small className={styles.titleSmall}>상세보기</small></h1>
                <button className={styles.inquiryButton} onClick={() => navigate('/guideAsk')}>문의 하기</button>
            </div>

            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.label}>작성번호</td>
                        <td className={styles.value}>9622</td>
                        <td className={styles.label}>분류</td>
                        <td className={styles.value}>가이드</td>
                    </tr>
                    <tr>
                        <td className={styles.label}>아이디</td>
                        <td className={styles.value}>park</td>
                        <td className={styles.label}>작성일</td>
                        <td className={styles.value}>2024-03-19</td>
                    </tr>
                    <tr>
                        <td className={styles.label}>제목</td>
                        <td className={styles.value} colSpan="3">가이드 등록을 했는데 게시글이 올라가지 않아요</td>
                    </tr>
                    <tr>
                        <td className={styles.fullLabel} colSpan="4">내용</td>
                    </tr>
                    <tr>
                        <td className={styles.fullValue} colSpan="4">가이드 등록을 했는데 게시글이 올라가지 않아요.....내용 주세요</td>
                    </tr>
                    <tr>
                        <td className={styles.fullLabelDark} colSpan="4">답변</td>
                    </tr>
                    <tr>
                        <td className={styles.fullValue} colSpan="4">으이궁 잘 좀 하지</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.actions}>
                <button className={styles.actionButton}>수정 하기</button>
                <button className={styles.actionButton}>삭제 하기</button>
                <button className={styles.actionButton} onClick={() => navigate('/guidemypagemypost')}>목록</button>
            </div>
        </div>

    );
};

export default GuideAskDetailsView;