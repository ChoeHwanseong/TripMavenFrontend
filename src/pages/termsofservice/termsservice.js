import React from 'react';
import styles from '../../styles/termsofservice/TermsService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>이용약관</h1>
      
      <div className={styles.section}>
        <h2 className={styles.subheading}>제1장 총칙</h2>
        
        <h3 className={styles.subheading}>제1조 (목적)</h3>
        <p className={styles.paragraph}>
          본 약관은 정부24(이하 "당 사이트")가 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 이용자의 당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
        
        <h3 className={styles.subheading}>제2조 (용어의 정의)</h3>
        <p className={styles.paragraph}>
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        </p>
        <ul>
          <li>이용자: 본 약관에 따라 당 사이트가 제공하는 서비스를 이용할 수 있는 자.</li>
          <li>가입: 당 사이트가 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는 행위.</li>
          <li>회원: 당 사이트에 개인정보 등 관련 정보를 제공하여 회원등록을 한 개인(국적국인, 국내거주 외국인 포함) 또는 법인으로서 당 사이트의 정보를 제공받으며, 당 사이트가 제공하는 서비스를 이용할 수 있는 자.</li>
          <li>아이디(ID): 회원의 식별과 서비스 이용을 위하여 회원이 문자와 숫자의 조합으로 설정한 고유의 체계.</li>
          <li>비밀번호: 이용자의 아이디가 일치하는지를 확인하고 통상의 자신의 비밀보호를 위하여 이용자 자신이 설정한 문자와 숫자의 조합.</li>
          <li>탈퇴: 회원이 이용계약을 종료시키는 행위.</li>
          <li>본 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 이용규정에서 정하거나 일반적인 개념에 의합니다.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subheading}>제3조 (약관의 효력과 변경)</h3>
        <p className={styles.paragraph}>
          당 사이트는 약관의 내용을 변경할 수 있으며, 변경된 약관은 개정하여 서비스 페이지에 공지합니다. 개정된 약관은 공지된 시점부터 효력을 발생합니다.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
