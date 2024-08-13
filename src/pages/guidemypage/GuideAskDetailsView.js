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
        return <div>로딩중</div>;  {/* 이코드 지우면 inquery.id 가져올때 오류발생할수도있음 */}
    }

    return (
        <div className={styles.inquiryDetails}>
            <div className={styles.title}>
                <h1>문의 내역 <small className={styles.titlesmall}>상세보기</small></h1>
            </div>
            <table className={styles.table}>
                <tbody>
                    <Box
                        component="tr"
                        sx={{
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                color: 'black',
                                backgroundColor: '#D0F0FF',
                            },
                        }}
                    >
                        <tr>
                            <td>작성번호</td>
                            <td>{inquiry.id}</td>
                            <td>분류</td>
                            <td>{inquiry.member.role}</td>
                        </tr>
                        <tr>
                            <td>아이디</td>
                            <td>{inquiry.member.name}</td>
                            <td>작성일</td>
                            <td>{inquiry.createdAt.split('T')[0]}</td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td colSpan="3">{inquiry.title}</td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td colSpan="3">{inquiry.content}</td>
                        </tr>
                        <tr>
                            <td>답변</td>
                            <td colSpan="3">{inquiry.comments }</td>
                        </tr>
                    </Box>
                </tbody>
            </table>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>수정 하기</button>
                <button className={styles.button}>삭제 하기</button>
                <button className={styles.button} onClick={() => navigate('/guideaskdetails')}>목록</button>
            </div>
        </div>
    );
};

export default GuideAskDetailsView;