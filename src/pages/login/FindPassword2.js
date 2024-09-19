import React, { useState, useEffect } from 'react';
import styles from '../../styles/login/FindPassword2.module.css';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { findMemberbyEmail, sendEmailCode, verifyEmailCode } from '../../utils/memberData'; 

const FindPassword2 = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [codeErrorMessage, setCodeErrorMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMemberValid, setIsMemberValid] = useState(true);
  const [codeInputErrorMessage, setCodeInputErrorMessage] = useState('');
  const [memberId, setMemberId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      setIsEmailValid(true);
    }
  }, [email]);

  const handleSendCode = async () => {
    try {
      const member = await findMemberbyEmail(email);

      if (!member || member.name !== name) {
        setEmailErrorMessage('입력하신 회원정보를 찾을 수 없습니다.');
        setIsMemberValid(false);
        return;
      }

      await sendEmailCode(email);
      setIsCodeSent(true);
      setIsMemberValid(true);
      setMemberId(member.id); 
      setEmailErrorMessage('');
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      setEmailErrorMessage('이메일 전송 중 오류가 발생했습니다.');
      console.error('이메일 전송 중 오류 발생: ', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const isValid = await verifyEmailCode(email, code);
      setIsCodeValid(isValid);
      if (!isValid) {
        setCodeErrorMessage('인증번호가 일치하지 않습니다.');
      } else {
        setCodeErrorMessage('');
        setCodeInputErrorMessage(''); 
      }
    } catch (error) {
      console.error('인증번호 검증 중 오류 발생: ', error);
      setCodeErrorMessage('인증번호 검증 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      handleVerifyCode(); 
    }
  }, [code]);

  const handleNext = async () => {
    if (!code) {
      setCodeInputErrorMessage('인증번호를 입력해주세요.');
    } else {
      setCodeInputErrorMessage(''); 
      await handleVerifyCode();  
      if (isCodeValid) {
        navigate(`/login/findpassword3?email=${email}&id=${memberId}`);
      } else {
        setCodeErrorMessage('인증번호가 올바르지 않습니다.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비밀번호 찾기</h1>

      <div className={styles.section}>
        <label className={styles.radioLabel}>회원정보에 등록한 이메일로 인증</label>
        <p className={styles.description}>
          회원정보에 등록된 이름과 이메일이 같아야, 인증번호를 받을 수 있습니다.
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
                readOnly
              />
              <button
                type="button"
                className={styles.codeButton}
                onClick={handleSendCode}
                disabled={isCodeSent || !isEmailValid} 
              >
                코드 전송
              </button>
            </div>
            {emailErrorMessage && (
              <p className={styles.errorMessage}>{emailErrorMessage}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              className={styles.input}
              placeholder="인증번호 6자리 숫자 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {codeInputErrorMessage && <p className={styles.errorMessage}>{codeInputErrorMessage}</p>}
            {codeErrorMessage && <p className={styles.errorMessage}>{codeErrorMessage}</p>}
            {isCodeValid === true && <p className={styles.successMessage}>인증번호가 일치합니다.</p>}
          </div>
          <p className={styles.note}>
            인증번호가 오지 않는다면 스팸 메일로 등록되어 있는 것은 아닌지 확인해주세요.
          </p>
        </form>
      </div>

      <button 
        type="button" 
        className={styles.submitButton} 
        onClick={handleNext}
        disabled={!isCodeValid} 
      >
        다음
      </button>
    </div>
  );
};

export default FindPassword2;
