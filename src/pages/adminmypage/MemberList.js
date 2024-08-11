import React from 'react';
import styles from '../../styles/adminmypage/MemberList.module.css';

const MemberList = () => {
  const members = [
    {
      memberId: 1234,
      username: 'kim',
      role: '가이드',
      email: 'dlwns0784@gmail.com',
      phone: '010-1234-5678',
      address: '강서구 마곡동 XX아파트 101-605호',
      registrationDate: '2024-08-01',
      certificate: 'O',
    },
    {
      memberId: 4321,
      username: 'lee',
      role: '일반 고객',
      email: 'tldms0924@naver.com',
      phone: '010-1234-5678',
      address: '강서구 마곡동 XX아파트 101-605호',
      registrationDate: '2023-12-31',
      certificate: 'X',
    },
    {
      memberId: 5678,
      username: 'park',
      role: '가이드',
      email: 'choe9090@gmail.com',
      phone: '010-8765-4321',
      address: '화성시 안녕동 OO아파트 102-302호',
      registrationDate: '2024-03-19',
      certificate: 'X',
    },
  ];

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
            {members.map((member) => (
              <tr key={member.memberId}>
                <td>{member.memberId}</td>
                <td>{member.username}</td>
                <td>{member.role}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{member.address}</td>
                <td>{member.registrationDate}</td>
                <td>{member.certificate}</td>
              </tr>
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
