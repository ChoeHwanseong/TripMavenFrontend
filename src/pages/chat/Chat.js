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
  const sendMessage =  async() => {
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
        // OpenAI API 호출하여 답변 받기
        const apiResponse = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt: message,
                model: 'gpt-3.5-turbo',
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        // OpenAI API에서 받은 답변
        const botAnswer = apiResponse.data.choices[0].text.trim();

        // 받은 답변을 화면에 표시
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add(styles.message, styles.received);
        botMessageElement.innerHTML = `<p>${botAnswer}</p>`;
        chatBody.appendChild(botMessageElement);

        // 질문과 답변을 백엔드에 저장
        await axios.post('/chatbot/post', {
            inquery: message,
            answer: botAnswer,
        });

        // 대화 기록 업데이트
        setChatHistory([...chatHistory, { inquery: message, answer: botAnswer }]);

    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error('Too many requests. Please wait before trying again.');
        } else {
            console.error('Error fetching chatbot response:', error);
        }
    }

      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };
  // 컴포넌트가 마운트되거나 `isVisible` 상태가 변경될 때 키 다운 이벤트 리스너 설정
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
              {chatHistory.map((chat, index) => (
                <div key={index} className={`${styles.message} ${styles.received}`}>
                  <p><strong>Question:</strong> {chat.inquery}</p>
                  <p><strong>Answer:</strong> {chat.answer}</p>
                </div>
              ))}
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
