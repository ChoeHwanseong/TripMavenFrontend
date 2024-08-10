import React from 'react';
import styles from '../../styles/chat/bigChat.module.css';

function BigChat() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <button className={styles.groupChatButton}>그룹채팅방</button>
      </div>

      <div className={styles.messagesSection}>
        <div className={styles.header}>
          <h2 className={styles.messagesTitle}>Messages</h2>
          <div className={styles.searchNewChat}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="검색어를 입력하세요"
            />
            <button className={styles.newChatButton}>새 채팅 +</button>
          </div>
        </div>

        <div className={styles.chatList}>
          <div className={styles.chatItem}>
            <img
              src="/profile1.png"
              alt="profile"
              className={styles.profileImage}
            />
            <div className={styles.chatInfo}>
              <span className={styles.chatName}>초애환성</span>
              <span className={styles.chatTime}>00:31</span>
            </div>
          </div>

          <div className={styles.chatItem}>
            <img
              src="/profile2.png"
              alt="profile"
              className={styles.profileImage}
            />
            <div className={styles.chatInfo}>
              <span className={styles.chatName}>정주원바보</span>
              <span className={styles.chatTime}>07:20</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chatSection}>
        <div className={styles.chatHeader}>
          <span className={styles.chatName}>초애환성</span>
          <button className={styles.infoButton}>i</button>
        </div>

        <div className={styles.chatMessages}>
          <div className={styles.message}>
            <img
              src="/profile1.png"
              alt="profile"
              className={styles.profileImage}
            />
            <div className={styles.messageBubble}>
              <span>채팅입니다</span>
              <span className={styles.messageTime}>8:00 PM</span>
            </div>
          </div>

          <div className={`${styles.message} ${styles.sent}`}>
            <div className={styles.messageBubble}>
              <span>채팅입니다</span>
              <span className={styles.messageTime}>8:00 PM</span>
            </div>
            <img
              src="/profile2.png"
              alt="profile"
              className={styles.profileImage}
            />
          </div>
        </div>

        <div className={styles.chatInputSection}>
          <input
            type="text"
            className={styles.chatInput}
            placeholder="입력해주세요"
          />
          <button className={styles.sendButton}>▶</button>
          <button className={styles.attachmentButton}>📎</button>
        </div>
      </div>
    </div>
  );
}

export default BigChat;
