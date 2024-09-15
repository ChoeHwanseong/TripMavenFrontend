import React from 'react';
import styles from '../../styles/login/FindPassword2.module.css';
import { useNavigate } from 'react-router-dom';

const FindPassword2 = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비밀번호 찾기</h1>

      <div className={styles.section}>
        <label className={styles.radioLabel}>
          <input type="radio" name="method" defaultChecked />
          회원정보에 등록한 휴대전화로 인증
        </label>
        <p className={styles.description}>
          회원정보에 등록한 휴대전화 번호와 휴대전화 번호가 같아야, 인증번호를 받을 수 있습니다.
        </p>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>이름</label>
            <input type="text" className={styles.input} placeholder="이름을 입력하세요" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>휴대전화</label>
            <input type="text" className={styles.input} placeholder="휴대전화번호를 입력하세요" />
          </div>
          <div className={styles.formGroup}>
            <input type="text" className={styles.input} placeholder="인증번호 6자리 숫자 입력" />
          </div>
          <p className={styles.note}>
            인증번호가 오지 않는다면 스팸 문자로 등록되어 있는 것은 아닌지 확인해주세요.
          </p>
        </form>
      </div>

      <div className={styles.section}>
        <label className={styles.radioLabel}>
          <input type="radio" name="method" />
          본인 명의 휴대전화로 인증
        </label>
        <p className={styles.description}>
          등록한 회원정보로 찾기 어려우시면, 본인 명의 비밀번호를 찾아드립니다.
        </p>
      </div>

      <button type="button" className={styles.submitButton} onClick={()=>navigate('/login/findpassword3')}>다음</button>
    </div>
  );
};

export default FindPassword2;
