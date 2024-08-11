import React from 'react';
import styles from '../../styles/payment/Payment.module.css';

const PaymentForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.paymentForm}>
        <h1 className={styles.title}>결제</h1>
        
        <div className={styles.paymentMethods}>
          <h2>결제 수단</h2>
          <div className={styles.methodIcons}>
            <img src="/visa.png" alt="VISA" />
            <img src="/paypal.png" alt="PayPal" />
            <img src="/toss.png" alt="toss" />
            <img src="/계좌이체.png" alt="계좌이체" />
          </div>
        </div>

        <div className={styles.cardInfo}>
            <h2>카드 정보</h2>
            
            <div className={styles.inputGroup}>
                <label htmlFor="cardHolderName" className={styles.inputLabel}>카드 소유주</label>
                <input 
                type="text" 
                id="cardHolderName"
                placeholder="Card Holder Name" 
                className={styles.inputField}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="cardNumber" className={styles.inputLabel}>카드 번호</label>
                <input 
                type="text" 
                id="cardNumber"
                placeholder="xxxx-xxxx-xxxx-xxxx" 
                className={styles.inputField}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="expiryDate" className={styles.inputLabel}>만료일</label>
                <input 
                type="text" 
                id="expiryDate"
                placeholder="MM/YY" 
                className={styles.inputField}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="cvc" className={styles.inputLabel}>CVC</label>
                <input 
                type="text" 
                id="cvc"
                placeholder="cvc" 
                className={styles.inputField}
                />
            </div>
        </div>

        <label className={styles.checkboxLabel}>
          <input type="checkbox" />
          <span style={{fontSize:12}}>이후 결제를 위해 카드정보를 저장합니다</span>
        </label>

        <div className={styles.buttonContainer}>
            <button className={styles.payButton}>결제하기</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
