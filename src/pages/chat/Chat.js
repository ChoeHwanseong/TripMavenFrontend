import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/chat/Chat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeadset } from '@fortawesome/free-solid-svg-icons'; // 필요한 아이콘 임포트
import axios from 'axios';

// 발급받은 OpenAI API 키를 변수로 저장
const apiKey = 'sk-3Psu9bGHtzwsaoZI15OyUanv23VvEQCa5xqxkSZrOGT3BlbkFJ85cTMIN2rNJkT6L6ysy0QWIGpWGvtUyGTa41GGoPYA';

const Chat = () => {
  const [isVisible, setIsVisible] = useState(false); // 챗봇 팝업의 표시 상태를 관리하는 상태 변수
  const [chatHistory, setChatHistory] = useState([]); //대화기록 저장
  const chatInputRef = useRef(null); // 입력 필드에 대한 참조를 생성

  // 챗봇 팝업의 표시/숨기기 토글 함수
  const toggleChat = (event) => {
    event.preventDefault(); // 기본 동작 방지 (링크 클릭 시 페이지 이동 방지)
    setIsVisible(!isVisible); // 현재 상태를 반전시켜 표시/숨기기 상태를 변경
  };

  // 메시지를 전송하는 함수
  const sendMessage = async () => {
    const chatBody = document.getElementById('chatBody'); // 채팅 메시지를 표시할 요소
    const message = chatInputRef.current.value; // 입력 필드에서 메시지 값을 가져옴

    // 메시지가 비어 있지 않은 경우
    if (message.trim() !== '') {
      const messageElement = document.createElement('div'); // 새 메시지 요소 생성
      messageElement.classList.add(styles.message, styles.sent); // 스타일 적용
      messageElement.innerHTML = `<p>${message}</p>`; // 메시지 내용 설정
      chatBody.appendChild(messageElement); // 메시지 요소를 채팅 본문에 추가
      chatInputRef.current.value = ''; // 입력 필드를 비움
      chatBody.scrollTop = chatBody.scrollHeight; // 스크롤을 맨 아래로 이동

      try {
        const apiResponse = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4',
            messages: [
              { role: 'user', content: message }
            ]
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const botAnswer = apiResponse.data.choices[0].message.content.trim();

        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add(styles.message, styles.received);
        botMessageElement.innerHTML = `<p>${botAnswer}</p>`;
        chatBody.appendChild(botMessageElement);

        await axios.post('/chatbot', {
          inquery: message,
          answer: botAnswer,
        });

      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Enter 키를 누르면 메시지 전송 함수 호출
      if (event.key === 'Enter') {
        sendMessage();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown); // 팝업이 보일 때 키 다운 이벤트 리스너 추가
    } else {
      document.removeEventListener('keydown', handleKeyDown); // 팝업이 숨겨질 때 키 다운 이벤트 리스너 제거
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [isVisible]);

  return (
    <div className={styles.container}>
      <a href="#" onClick={toggleChat}>
        <div className={styles.chatButton}>
          <FontAwesomeIcon icon={faHeadset} className={styles.chatIcon} />
        </div>
      </a>

      {isVisible && (
        <div id="chatPopup" className={`${styles.chatPopup} ${isVisible ? styles.show : styles.hide}`}>
          <div className={styles.chatContainer}>
            <header className={styles.chatHeader}>
              <span className={styles.chatTitle}>1:1 Chatting System</span>
              <button className={styles.chatClose} onClick={toggleChat}>
                <FontAwesomeIcon icon={faTimes} />
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

export default Chat;
