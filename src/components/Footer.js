import React from 'react';
import '../styles/Footer.css';
import kakaoLogo from '../images/kakao0.png'; // 경로에 맞게 수정해주세요

const Footer = () => {
  return (
    <footer className="footer">
      <button className="footer-logo">TripMaven</button>
      <div className='footer-frame '>
        <div className="footer-description">
          <span className="footer-description-main">
            여행 전문가들의 사이트
            <br />
          </span>
          <span className="footer-description-sub">Happy find reporter</span>
        </div>
        <div>
          <div className="social-icons">
            <div className="social-icon naver">
              <svg
                className="naver-logo"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2807 11.3517L8.57305 6H5.5V16H8.7193V10.6475L12.427 16H15.5V6H12.2807V11.3517Z"
                  fill="white"
                />
              </svg>
            </div>
            <img className="social-icon kakao" src={kakaoLogo} alt="Kakao" />
            <svg
              className="social-icon google"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1938 8.73755V12.4917H15.4109C15.1818 13.6991 14.4944 14.7214 13.4633 15.4087L16.6094 17.8499C18.4424 16.1579 19.4999 13.6727 19.4999 10.7205C19.4999 10.0331 19.4383 9.37211 19.3237 8.73765L10.1938 8.73755Z"
                fill="#4285F4"
              />
              <path
                d="M4.76112 12.3452L4.05156 12.8884L1.53992 14.8448C3.135 18.0085 6.40425 20.194 10.1937 20.194C12.8109 20.194 15.0053 19.3304 16.6092 17.8499L13.4631 15.4088C12.5995 15.9904 11.4979 16.3429 10.1937 16.3429C7.67325 16.3429 5.53184 14.6421 4.76509 12.3508L4.76112 12.3452Z"
                fill="#34A853"
              />
              <path
                d="M1.53982 6.15552C0.878904 7.45973 0.5 8.93147 0.5 10.5001C0.5 12.0687 0.878904 13.5404 1.53982 14.8447C1.53982 14.8534 4.7653 12.3419 4.7653 12.3419C4.57142 11.7602 4.45682 11.1434 4.45682 10.5C4.45682 9.85658 4.57142 9.23974 4.7653 8.6581L1.53982 6.15552Z"
                fill="#FBBC05"
              />
              <path
                d="M10.1938 4.66609C11.6215 4.66609 12.8905 5.15958 13.904 6.11136L16.6799 3.33541C14.9967 1.76679 12.8112 0.806152 10.1938 0.806152C6.40445 0.806152 3.135 2.98287 1.53992 6.15543L4.7653 8.65822C5.53195 6.36691 7.67345 4.66609 10.1938 4.66609Z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <div className="footer-links">
            <div className="footer-link">사이트소개</div>
            <div className="footer-link">이용약관</div>
            <div className="footer-link">1:1문의</div>
            <div className="footer-link">고객센터</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
