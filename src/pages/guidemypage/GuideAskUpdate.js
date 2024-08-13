// 문의하기.jsx
import React, { useEffect, useState } from 'react';
import styles from '../../styles/guidemypage/GuideAsk.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { csfetchData } from '../../utils/csfetchData';

const GuideAskUpdate = () => {

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

  return <>

    <div className={styles.container}>
      <h2 className={styles.title}>문의 하기(수정)</h2>



      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>제목을 입력하세요</label>
          <input type="text" id="title" className={styles.input} value={inquiry.title}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>내용을 입력하세요</label>
          <textarea id="content" className={styles.textarea}>{inquiry.content}</textarea>
        </div>


        <button className={styles.submitButton} onClick={() => navigate('/guideaskdetails')}>등록 하기</button>
      </div>
    </div>


  </>
};

export default GuideAskUpdate;
