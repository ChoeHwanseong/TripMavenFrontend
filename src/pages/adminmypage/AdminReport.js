import React, { useEffect } from 'react';
import styles from '../../styles/adminmypage/AdminReport.module.css';


import { reportfetchAllData } from '../../utils/reportfetchData';
import { useState } from 'react';
import { Box } from '@mui/material';

const AdminReport = () => {

  const [inquiry, setInquiries] = useState([]);
  
  useEffect(() => {
    const getReportData = async () => {
      try{
        const fetchedData = await reportfetchAllData();
        setInquiries(fetchedData);
      } catch (error){
        console.error('에러났당',error);
      }
    }
  
    getReportData();
    }, []);



  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>신고 내역</h1>
          <div className={styles.admin}>
            <div className={styles.adminImage}>
              <img src="../../../images/defaultimage.png"/>
            </div>
            <span>관리자</span>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>작성번호</th>
              <th>신고자</th>
              <th>신고 대상자</th>
              <th>신고 내용</th>
              <th>작성일</th>
              <th>처리상태</th>
            </tr>
          </thead>
          <tbody>
            {inquiry.map((inquiry, index) => (
               <Box
               component="tr"
               key={index}
               >
                <td>{inquiry.member.id}</td>
                <td>{inquiry.member.name}</td>
                <td>{inquiry.productBoard.title}</td>
                <td>{inquiry.attitude && '불친절한 태도, '}
                    {inquiry.information && '부정확한 정보, '}
                    {inquiry.disgust && '혐오발언, '}
                    {inquiry.offensive && '공격적인 언어, '}
                    {inquiry.noShow && '예약 불이행'}
                </td>
                <td>{inquiry.createdAt.split('T')[0]}</td>
                <td>{inquiry.isactive?'처리중':'처리 완료'}</td>
              </Box>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReport;
