import React from 'react';
import '../styles/Footer.css';

const Footer = ({ className, ...props }) => {
  return (
    <div className={"footer " + className}>
      <div className="footer-left">
        <div className="trip-maven">TripMaven</div>
        <div className="happy-find-reporter">
          <span>
            <span className="happy-find-reporter-span">
              여행 전문가들의 사이트
              <br />
            </span>
            <span className="happy-find-reporter-span2">Happy find reporter</span>
          </span>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-links">
          <a href="#" className="footer-link">사이트소개</a>
          <a href="#" className="footer-link">이용약관</a>
          <a href="#" className="footer-link">1:1문의</a>
          <a href="#" className="footer-link">고객센터</a>
        </div>
        <div className="footer-icons">
          <img src="/images/naver.png" alt="Naver" className="sns-icon" />
          <img src="/images/removebg-preview-10.png" alt="Kakao" className="sns-icon" />
          <img src="/images/google0.svg" alt="Google" className="sns-icon" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
