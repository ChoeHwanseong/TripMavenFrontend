import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/guidemypage/GuideAskDetailsView.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { csAsnwerfetchUpdateData, csfetchData } from '../../utils/csfetchData';
import { Box } from '@mui/material';
import { set } from 'mobx';

const AdminAnswer = () => {

    const { id } = useParams();
    const [inquiry, setInquiry] = useState(null);

    const answerRef = useRef(null);



    const navigate = useNavigate();

    useEffect(() => {
        const getCSData = async () => {
            try {
                const fetchedData = await csfetchData(id);
                setInquiry(fetchedData);
                console.log(fetchedData)
                console.log(fetchedData.comments)

                if (answerRef.current) {
                    answerRef.current.value = fetchedData.comments;
                }

            } catch (error) {
                console.error('에러났당', error);
            }
        };

        getCSData();
    }, [id]);

    if (!inquiry) {
        return <div>로딩중</div>; {/* 이코드 지우면 inquery.id 가져올때 오류발생할수도있음 */ }
    }


    const newAnswer = async () =>{
        setInquiry({...inquiry,comments:answerRef.current.value})
    };


    const handelAnswer = async() => {
        await csAsnwerfetchUpdateData(id, inquiry);
        console.log('수정 완료')
        navigate('/adminask')       
    };


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>문의 내역<small className={styles.titleSmall}>답변등록</small></h1>
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
                        <td colSpan="4">
                            <input type="text" className={styles.fullValue}
                            value={inquiry.comments}
                            onChange={()=>{                              
                                setInquiry({...inquiry,comments:answerRef.current.value});
                                console.log('inquiry',inquiry);
                                console.log('inquiry.comments',inquiry.comments);
                            }}
                            ref={answerRef}/>                                                  
                        </td> 
                    </tr>

                </tbody>
            </table>
            <div className={styles.actions}>
                <button className={styles.actionButton} onClick={handelAnswer}>답변 등록하기</button>
            </div>
        </div>

    );
};

export default AdminAnswer;