import React, { useEffect, useState } from 'react';
import styles from '../../styles/guidemypage/GuideAskDetailsView.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { csfetchData } from '../../utils/csfetchData';
import { Box } from '@mui/material';

const AdminAskDetailsView = () => {

    const { id } = useParams();
    const [inquiry, setInquiry] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getCSData = async () => {
            try {
                const fetchedData = await csfetchData(id);
                console.log('fetchedData: ',fetchedData) 
                console.log('fetchedData.comments: ',fetchedData.comments)
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
            </div>

            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.label}>작성번호</td>
                        <td className={styles.value}>{inquiry.id}</td>
                        <td className={styles.label}>분류</td>
                        <td className={styles.value}>{inquiry.member.role ? '고객' : '가이드'}</td>
                    </tr>
                    <tr>
                        <td className={styles.label}>아이디</td>
                        <td className={styles.value}>{inquiry.member.name}</td>
                        <td className={styles.label}>작성일</td>
                        <td className={styles.value}>{inquiry.createdAt.split('T')[0]}</td>
                    </tr>
                    <tr>
                        <td className={styles.label}>제목</td>
                        <td className={styles.value} colSpan="3">{inquiry.title}</td>
                    </tr>
                    <tr>
                        <td className={styles.fullLabel} colSpan="4">내용</td>
                    </tr>
                    <tr>
                        <td className={styles.fullValue} colSpan="4">{inquiry.content}</td>
                    </tr>
                    <tr>
                        <td className={styles.fullLabelDark} colSpan="4">답변</td>
                    </tr>
                    <tr>
                        <td className={styles.fullValue} colSpan="4">{inquiry.comments}</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.actions}>
                <button className={styles.actionButton} onClick={() => navigate(`/adminAnswer/${inquiry.id}`)}>답변 등록 및 수정하기</button>
                <button className={styles.actionButton} onClick={() => navigate('/adminask')}>목록</button>
            </div>
        </div>

    );
};

export default AdminAskDetailsView;