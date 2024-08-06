import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/Chat.module.css';
import faviImg from '../../images/favicon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // 필요한 아이콘 임포트

const ChatPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const chatInputRef = useRef(null);

  const toggleChat = (event) => {
    event.preventDefault();
    setIsVisible(!isVisible);
  };

  const sendMessage = () => {
    const chatBody = document.getElementById('chatBody');
    const message = chatInputRef.current.value;

    if (message.trim() !== '') {
      const messageElement = document.createElement('div');
      messageElement.classList.add(styles.message, styles.sent);
      messageElement.innerHTML = `<p>${message}</p>`;
      chatBody.appendChild(messageElement);
      chatInputRef.current.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  return (
    <div className={styles.container}>
      <a href="#" onClick={toggleChat}>
        <img className={styles.chatButton} src={faviImg} alt="Chat" />
      </a>

      {isVisible && (
        <div id="chatPopup" className={`${styles.chatPopup} ${isVisible ? styles.show : styles.hide}`}>
          <div className={styles.chatContainer}>
            <header className={styles.chatHeader}>
              <span className={styles.chatTitle}>1:1 Chatting System</span>
              <button className={styles.chatClose} onClick={toggleChat}>
                <FontAwesomeIcon icon={faTimes} /> {/* FontAwesomeIcon을 사용 */}
              </button>
            </header>
            <div className={styles.chatBody} id="chatBody">
              <div className={`${styles.message} ${styles.received}`}>
                <p>도와드릴게 있을까요?</p>
              </div>
            </div>
            <footer className={styles.chatFooter}>
              <input type="text" placeholder="메세지를 입력하세요" ref={chatInputRef} className={styles.chatInput} />
              <button type="button" onClick={sendMessage} className={styles.sendButton}>전송</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
