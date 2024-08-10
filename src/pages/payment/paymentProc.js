import React from 'react';
import styles from '../../styles/payment/paymentProc.module.css';

const OrderPopup = () => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        <h2 className={styles.title}>주문 상품 확인</h2>
        <div className={styles.orderDetails}>
          <div className={styles.orderText}>
            <p>[제주 여행] 실속 여행 2박 3일</p>
            <p>수량 1 <span className={styles.quantity}>quantity</span></p>
          </div>
          <img src="../images/제주 1.png" alt="제주 1" className={styles.orderImage} />
        </div>
        <div className={styles.paymentDetails}>
          <h3>결제 금액</h3>
          <div className={styles.paymentRow}>
            <span>상품가격</span>
            <span>1,000원</span>
          </div>
          <div className={styles.paymentRow}>
            <span>할인금액</span>
            <span>0원</span>
          </div>
          <div className={styles.paymentRow}>
            <span style={{fontWeight:"bold"}}>총 결제 금액</span>
            <span style={{fontWeight:"bold"}}>1,000원</span>
          </div>
        </div>
        <div className={styles.paymentDetails}>
          <div className={styles.paymentRow}>
            <span>개인 정보 제공 안내 <span style={{color:"#4a90e2"}}>보기</span> </span>
          </div>
          <div className={styles.paymentRow}>
          <span>구매조건 확인 및 결제 대행 서비스 약관 동의 <span style={{color:"#4a90e2"}}>보기</span> </span>
          </div>
          <div className={styles.paymentRow}>
          <span>위 주문 내용을 확인하였으며, 회원 본인은 결제에 동의합니다</span>
          </div>
        </div>
        <button className={styles.paymentButton}>결제창으로 이동</button>
      </div>
    </div>
  );
};

export default OrderPopup;