import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/chat/Chat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeadset } from '@fortawesome/free-solid-svg-icons'; // 필요한 아이콘 임포트
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// 발급받은 OpenAI API 키를 변수로 저장
const apiKey = process.env.REACT_APP_CHATBOT_KEY;

const infoMessage = `You are the TripMaven customer service chatbot. The service we provide involves guide training evaluation and travel product introductions through AI services. Guides can enhance their skills and assess and improve their abilities through AI training. Customers can browse verified guides' travel products and enjoy them by contacting the guides.
When responding, you must be polite and courteous to all users. If there is a question for which you do not have a clear answer, please respond with "Please contact the administrator."
Since you are a Korean bot and most of your users are Korean, please make sure to respond in Korean.
If the user wishes to cancel a payment or reservation, please instruct them to consult with a counselor at 010-1234-1234.
If the user requests additional tour information, please display the link <a href="http://localhost:58337/faq/">here</a>.`;
let messages = [{ 'role': 'system', 'content': infoMessage }];//new Array();
const Chat = () => {
  const [isVisible, setIsVisible] = useState(false); // 챗봇 팝업의 표시 상태를 관리하는 상태 변수
  const [isClosing, setIsClosing] = useState(false);
  const chatInputRef = useRef(null); // 입력 필드에 대한 참조를 생성
  const [loading, setLoading] = useState(false); //로딩 스테이트
  console.log(messages)
  // 챗봇 팝업의 표시/숨기기 토글 함수
  const toggleChat = (event) => {
    event.preventDefault(); // 기본 동작 방지 (링크 클릭 시 페이지 이동 방지)
    if (isVisible) {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 500); // css의 애니메이션 동작시간
    } else {
      setIsVisible(true);
    }
  };

  // 메시지를 전송하는 함수
  const sendMessage = async () => {
    const chatBody = document.getElementById('chatBody'); //채팅 스크롤
    const chattingArea = document.getElementById('chattingArea'); // 채팅 메시지를 표시할 요소
    const message = chatInputRef.current.value; // 입력 필드에서 메시지 값을 가져옴
    messages.push({ role: 'user', content: message });

    // 메시지가 비어 있지 않은 경우
    if (message.trim() !== '') {
      setLoading(true);
      const messageElement = document.createElement('div'); // 새 메시지 요소 생성
      messageElement.classList.add(styles.message, styles.sent); // 스타일 적용
      messageElement.innerHTML = `<p>${message}</p>`; // 메시지 내용 설정
      chattingArea.appendChild(messageElement); // 메시지 요소를 채팅 본문에 추가
      chatInputRef.current.value = ''; // 입력 필드를 비움
      chatBody.scrollTop = chatBody.scrollHeight; // 스크롤을 맨 아래로 이동

      try {
        const apiResponse = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
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
        chattingArea.appendChild(botMessageElement);

        /*
        await axios.post('/chatbot', {
          inquery: message,
          answer: botAnswer,
        });
        */

      }
      catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        }
        else if (error.request) console.error('No response received:', error.request);
        else console.error('Error setting up the request:', error.message);
      }
      setLoading(false);
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

  // 로딩 상태가 변경될 때 스크롤 조정
  useEffect(() => {
    const chatBody = document.getElementById('chatBody');
    if (loading) {
      // 로딩이 시작될 때 스크롤을 맨 아래로 이동
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [loading]);

  return <>
    <div className={styles.container}>
      <a href="#" onClick={toggleChat}>
        <div className={styles.chatButton}>
          <FontAwesomeIcon icon={faHeadset} className={styles.chatIcon} />
        </div>
      </a>

      {(isVisible || isClosing) && (
        <div id="chatPopup" className={`${styles.chatPopup} ${isVisible ? styles.show : ''} ${isClosing ? styles.hide : ''}`}>
          <div className={styles.chatContainer}>

            <header className={styles.chatHeader}>
              <span className={styles.chatTitle}>1:1 Chatting System</span>
              <button className={styles.chatClose} onClick={toggleChat}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </header>

            <div className={styles.chatBody} id="chatBody">
              <div className={styles.chattingArea} id="chattingArea">
                <div className={`${styles.message} ${styles.received}`}>
                  <p>도와드릴게 있을까요?</p>
                </div>
              </div>

              <div className={styles.loadingStyle} id='loading'>
                {loading && (
                  <Box >
                    <CircularProgress />
                  </Box>
                )}
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


  </>
}

export default Chat;
