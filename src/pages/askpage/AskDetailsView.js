import React, { useEffect, useState } from 'react';
import styles from '../../styles/guidemypage/GuideAskDetailsView.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { csDelte, csGet } from '../../utils/csData';

const AskDetailsView = () => {

    const { id } = useParams();
    const [inquiry, setInquiry] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getCSData = async () => {
            try {
                const fetchedData = await csGet(id);
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

    const deleteInquiry = async () => {
        const confirmed = window.confirm("진짜 삭제?");
        if (confirmed) {
            try {
                await csDelte(id);
                navigate('/askall'); 
            } catch (error) {
                console.error('삭제 중 오류 발생:', error);
            }
        }

    };

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
                        <td className={styles.value}>{inquiry.member.role ? '사용자' : '가이드'}</td>
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
                <button className={styles.actionButton} onClick={() => navigate(`/askupdate/${inquiry.id}`)}>수정 하기</button>
                <button className={styles.actionButton} onClick={deleteInquiry}>삭제 하기</button>
                <button className={styles.actionButton} onClick={() => navigate('/askall')}>목록</button>
            </div>
        </div>

    );
};

export default AskDetailsView;