import React, { useEffect } from 'react';
import '../styles/login.css'; // 현재 로컬 적용이 아직 되어있지않아 다른 css파일 사용시 잠시 주석처리 할것
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome 아이콘 스타일 불러오기 사용은 README에 간략히 기술


const Login = () => {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 body에 스타일 적용
    document.body.style.height = '100vh'; // 전체 높이 설정
    document.body.style.width = '100%'; // 전체 너비 설정
    document.body.style.background = 'linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%)'; // 그라데이션 배경 설정
    document.body.style.display = 'flex'; // flexbox 사용
    document.body.style.justifyContent = 'center'; // 수평 중앙 정렬
    document.body.style.alignItems = 'center'; // 수직 중앙 정렬
    document.body.style.backgroundImage = `url(/images/travel.jpg)`; // 배경 이미지 설정
    document.body.style.backgroundSize = 'cover'; // 배경 이미지가 전체를 덮도록 설정
    document.body.style.flexDirection = 'column'; // flexbox의 방향을 열로 설정

    // 컴포넌트 언마운트 시 body 스타일 초기화
    return () => {
      document.body.style.height = '';
      document.body.style.width = '';
      document.body.style.background = '';
      document.body.style.display = '';
      document.body.style.justifyContent = '';
      document.body.style.alignItems = '';
      document.body.style.backgroundImage = '';
      document.body.style.flexDirection = '';
    };
  }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트가 처음 마운트될 때만 실행

  return (
    <div className="login-page">
      {/* 로그인, 회원가입, 메인화면 버튼을 위한 체크박스 */}
      <input type="checkbox" id="showMember" />
      <input type="checkbox" id="showSignup" />
      <input type="checkbox" id="showMainMenu" />

      {/* 각 버튼을 위한 레이블 */}
      <label htmlFor="showMember" className="show-btn">로그인</label>
      <label htmlFor="showSignup" className="show-btn">회원가입</label>
      <label htmlFor="showMainMenu" className="show-btn">메인화면</label>

      {/* 로그인 컨테이너 */}
      <div className="container" id="memberContainer">
        {/* 닫기 버튼 */}
        <span className="close-btn" onClick={() => (document.getElementById('showMember').checked = false)}>&times;</span>
        <div className="text">Login</div>
        <form>
          {/* 이메일 입력 필드 */}
          <div className="data">
            <label>이메일 주소</label>
            <input type="text" required />
          </div>
          {/* 비밀번호 입력 필드 */}
          <div className="data">
            <label>비밀번호</label>
            <input type="password" required />
          </div>
          {/* 비밀번호 찾기 링크 */}
          <div className="forgot-pwrd"><a href="#">비밀번호를 잊었나요?</a></div>
          {/* 제출 버튼 */}
          <div className="btn">
            <div className="inner"></div>
            <button type="submit">login</button>
          </div>
          {/* 회원가입 링크 */}
          <div className="signup-link">
            Not a member? <a href="#">Signup now</a>
          </div>
        </form>
      </div>

      {/* 회원가입 컨테이너 */}
      <div className="container" id="signupContainer">
        {/* 닫기 버튼 */}
        <span className="close-btn" onClick={() => (document.getElementById('showSignup').checked = false)}>&times;</span>
        <div className="text">회원가입</div>
        <form>
          {/* 이메일 입력 필드 */}
          <div className="data">
            <label>이메일 주소</label>
            <input type="text" required />
          </div>
          {/* 비밀번호 입력 필드 */}
          <div className="data">
            <label>비밀번호</label>
            <input type="password" required />
          </div>
          {/* 이름 입력 필드 */}
          <div className="data">
            <label>이름</label>
            <input type="text" required />
          </div>
          {/* 생년월일 입력 필드 */}
          <div className="data">
            <label>생년월일</label>
            <input type="date" required />
          </div>
          {/* 제출 버튼 */}
          <div className="btn">
            <div className="inner"></div>
            <button
              type="submit"
              onClick={() => alert('가입 성공!')} // 가입 버튼 클릭 시 알림
            >
              등록
            </button>
          </div>
          {/* 로그인 링크 */}
          <div className="signup-link">
            이미 회원이신가요? <a href="#">바로 로그인</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;