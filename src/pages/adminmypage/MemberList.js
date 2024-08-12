import React, { useEffect, useState } from 'react';
import styles from '../../styles/adminmypage/MemberList.module.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/memberData';




const MemberList = () => {
  const [data, setData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getData();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  }

  const handleClick = () => {
    navigate('/mypageprofile');
  };

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>회원 목록</h1>
          <div className={styles.admin}>
            <div className={styles.adminImage}>
              <img src="../../../images/defaultimage.png"/>
            </div>
            <span>관리자</span>
          </div>
        </div>
        <div>
    </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>회원 번호</th>
              <th>아이디</th>
              <th>분류</th>
              <th>이메일</th>
              <th>번호</th>
              <th>주소</th>
              <th>등록일</th>
              <th>자격증 유/무</th>
            </tr>
          </thead>
         
          <tbody>
            {data.map((user, index) => (
              <Box
                component="tr"
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick()}
                sx={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    color : 'black',
                    backgroundColor: '#D0F0FF',
                  }
                }}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.telNumber}</td>
                  <td>{user.address}</td>
                  <td>{user.createdAt.split('T')[0]}</td> {/* 시간까지나옴 스플릿으로 앞부분만뿌려주기 */}
                  <td>{user.guidelicense?'무':'유'}</td> {/* 자격증 디폴트값 무 false면 유 */} 
                </Box>       
            ))} 
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span className={styles.pageControl}>&lt;</span>
          <span className={styles.pageNumber}>1</span>
          <span className={styles.pageControl}>&gt;</span>
        </div>
      </div>
    </div>
);
};


export default MemberList;
