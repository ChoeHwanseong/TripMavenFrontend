import React from 'react';
import styles from '../styles/components/Footer.module.css'; // CSS 모듈 파일을 불러옵니다.
import { Navigate, useNavigate } from 'react-router-dom';


const Footer = ({ className, ...props }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.footer} ${className}`}>
      <div className={styles.footerLeft}>
        <div className={styles.tripMaven}>TripMaven</div>
        <div className={styles.happyFindReporter}>
          <span>
            <span className={styles.happyFindReporterSpan}>
              여행 전문가들의 사이트
              <br />
            </span>
            <span className={styles.happyFindReporterSpan2}>Happy find reporter</span>
          </span>
        </div>
      </div>
      <div className={styles.footerRight}>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}><button className={styles.navButton} onClick={()=>navigate('/termsservice')}>이용약관</button></a>
          <span className={styles.bar}> | </span>
          <a href="#" className={styles.footerLink}>사이트소개</a>
          <span className={styles.bar}> | </span>
          <a href="#" className={styles.footerLink}>1:1문의</a>
          <span className={styles.bar}> | </span>
          <a href="#" className={styles.footerLink}>고객센터</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;