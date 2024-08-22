import React, { useContext } from 'react';
import styles from '../styles/components/Footer.module.css'; // CSS 모듈 파일을 불러옵니다.
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RoleContext } from './context/roleContext';


const Footer = ({ className, ...props }) => {
  const {setSearchKeyword} = useContext(RoleContext);

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
          <a className={styles.footerLink}><button className={styles.navButton} onClick={()=>{ navigate('/termsservice')}}>이용약관</button></a>
          <span className={styles.bar}> | </span>
          <a className={styles.footerLink}><button className={styles.navButton} onClick={()=>{ navigate('/siteinfo')}}>사이트소개</button></a>
          <span className={styles.bar}> | </span>
          <a className={styles.footerLink}><button className={styles.navButton} onClick={()=>{ navigate('/askall')}}>1:1문의</button></a>
          <span className={styles.bar}> | </span>
          <a className={styles.footerLink}><button className={styles.navButton} onClick={()=>{ navigate('/faq')}}>고객센터</button></a>
          <span className={styles.bar}> | </span>
          <a className={styles.footerLink}><button className={styles.navButton} onClick={()=>{ navigate('/')}}>시작화면으로 돌아가기</button></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;