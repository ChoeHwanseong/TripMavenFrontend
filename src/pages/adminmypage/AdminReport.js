import React from 'react';
import styles from '../../styles/adminmypage/AdminReport.module.css';

const AdminReport = () => {
  const reports = [
    {
      reportId: 9621,
      reporter: 'kim',
      reported: 'park',
      content: '공격적인 언어 사용',
      date: '2024-08-01',
      status: '처리중',
    },
    {
      reportId: 1212,
      reporter: 'lee',
      reported: 'choi',
      content: '불친절한 태도',
      date: '2023-12-31',
      status: '처리 완료',
    },
  ];

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2>신고 내역</h2>
          <div className={styles.admin}>
            <div className={styles.adminIcon}>
              <span>👤</span>
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
            {reports.map((report) => (
              <tr key={report.reportId}>
                <td>{report.reportId}</td>
                <td>{report.reporter}</td>
                <td>{report.reported}</td>
                <td>{report.content}</td>
                <td>{report.date}</td>
                <td>{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReport;
