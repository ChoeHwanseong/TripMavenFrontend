import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/askpage/AskDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { csfetchPostData } from '../../utils/csfetchData';

const AskDetails = () => {
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [inquiry, setInquiry] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const getCSData = async () => {
        try {
            const fetchedData = await fetchedData(id);
            console.log('fetchedData',fetchedData)
            setInquiry(fetchedData);
        } catch (error) {
            console.error('에러났당', error);
        }
    };

    getCSData();
}, []);


  const handelInquiry = async() => {
    try {
        const createData = { title: titleRef.current.value,
                            content: contentRef.current.value,
                            members_id: id};
        await csfetchPostData(createData);
        navigate('/askall');

    } catch (error) {
        console.error('Error updating answer:', error);
    }

  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>문의 하기</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>제목을 입력하세요</label>
          <input type="text" id="title" className={styles.input} ref={titleRef}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>내용을 입력하세요</label>
          <textarea id="content" className={styles.textarea} ref={contentRef}></textarea>
        </div>
        <button className={styles.submitButton} onClick={handelInquiry}>등록 하기</button>
      </div>
    </div>
  );
};

export default AskDetails;
