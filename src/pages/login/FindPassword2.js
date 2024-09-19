import React, { useState } from 'react';
import styles from '../../styles/login/FindPassword2.module.css';
import { useNavigate } from 'react-router-dom';
import { findMemberbyEmail, sendEmailCode, verifyEmailCode } from '../../utils/memberData'; // 필요한 함수들 import

const FindPassword2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(''); // 인증번호 입력을 위한 상태
  const [errorMessage, setErrorMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false); // 인증번호 검증 상태
  
  const navigate = useNavigate();

  // 이메일 전송 로직
  const handleSendCode = async () => {
    try {
      const member = await findMemberbyEmail(email); // 이메일로 회원 정보 확인

      // DB에서 해당 이메일을 가진 멤버가 없거나, 이름이 일치하지 않는 경우 처리
      if (!member || member.name !== name) {
        setErrorMessage('이름과 이메일이 일치하지 않습니다.');
        return;
      }

      // 이름과 이메일이 일치하면 코드 전송
      await sendEmailCode(email);
      setIsCodeSent(true);
      setErrorMessage('');
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      console.error('이메일 전송 중 오류 발생: ', error);
      setErrorMessage('이메일 전송 중 오류가 발생했습니다.');
    }
  };

  // 인증번호 검증 로직
  const handleVerifyCode = async () => {
    try {
      const isValid = await verifyEmailCode(email, code);
      if (isValid) {
        setIsCodeValid(true);
        setErrorMessage('');
        alert('인증번호가 일치합니다!');
      } else {
        setIsCodeValid(false);
        setErrorMessage('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('인증번호 검증 중 오류 발생: ', error);
      setErrorMessage('인증번호 검증 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비밀번호 찾기</h1>

      <div className={styles.section}>
        <label className={styles.radioLabel}>회원정보에 등록한 이메일로 인증</label>
        <p className={styles.description}>
          회원정보에 등록한 이메일과 입력하신 이메일이 같아야, 인증번호를 받을 수 있습니다.
        </p>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>이름</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="이름을 입력하세요" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>이메일</label>
            <div className={styles.inputWithButton}>
              <input 
                type="text" 
                className={styles.inputEmail} 
                placeholder="이메일을 입력하세요" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <button 
                type="button" 
                className={styles.codeButton} 
                onClick={handleSendCode}
                disabled={isCodeSent} // 코드 전송 후 버튼 비활성화
              >
                코드 전송
              </button>
            </div>
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <div className={styles.formGroup}>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="인증번호 6자리 숫자 입력" 
              value={code}
              onChange={(e) => setCode(e.target.value)} 
            />
            <button 
              type="button" 
              className={styles.verifyButton} 
              onClick={handleVerifyCode}
              disabled={isCodeValid} // 인증이 완료되면 버튼 비활성화
            >
              인증번호 확인
            </button>
          </div>
          <p className={styles.note}>
            인증번호가 오지 않는다면 스팸 메일로 등록되어 있는 것은 아닌지 확인해주세요.
          </p>
        </form>
      </div>

      <button 
        type="button" 
        className={styles.submitButton} 
        onClick={() => navigate('/login/findpassword3')}
        disabled={!isCodeValid} // 인증번호가 일치해야만 버튼 활성화
      >
        다음
      </button>
    </div>
  );
};

export default FindPassword2;
