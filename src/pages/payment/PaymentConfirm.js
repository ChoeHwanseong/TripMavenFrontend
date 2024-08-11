import React from 'react';
import styles from '../../styles/payment/Payment.module.css';

const PaymentConfirmation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>결제 확인 창</h1>
        
        <div className={styles.inputGroup}>
          <label htmlFor="quantity" className={styles.label}>수량</label>
          <input type="text" id="quantity" value="1" readOnly className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="paymentMethod" className={styles.label}>결제 방법</label>
          <input type="text" id="paymentMethod" value="TossPay" readOnly className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="paymentTime" className={styles.label}>결제 시간</label>
          <input type="text" id="paymentTime" value="2024-08-05 19:17:15" readOnly className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="paymentStatus" className={styles.label}>결제 상태</label>
          <input type="text" id="paymentStatus" value="Pending" readOnly className={styles.input} />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton}>결제 완료</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
