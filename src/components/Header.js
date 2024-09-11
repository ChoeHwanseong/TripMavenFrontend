import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { menuData } from '../config/MyPageEndPoint';
import { TemplateContext } from '../context/TemplateContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GuideRegistration from '../pages/registerguidepage/RegisterGuide';
import { ButtonGroup, Button, IconButton, Badge, Typography } from '@mui/material';
import { logout } from '../utils/memberData';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import styled from '@emotion/styled';
import { chattingListMyData } from "../utils/chatData";
import mqtt from 'mqtt';
import { getNotifications, postNotification, readNotification } from '../utils/NotificationData';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    width: 1200,
    height: '85vh',
    bgcolor: 'background.paper',
    border: '1px solid primary',
    borderRadius: '16px',
    boxShadow: 24,
    overflow: 'hidden',
};

const NotificationPopup = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const convertNotificationType={
    'chat':'채팅',
    'review':'리뷰'
}


//알림 컴포넌트
//헤더 컴포넌트에서 받아올 알림 상태
const NotificationComponent = ({notifications, setNotifications}) => {
    const navigate = useNavigate();
    //알림 펼치기 여부 상태
    const [showNotifications, setShowNotifications] = useState(false);

    /*
    const [notifications, setNotifications] = useState([
        { id: 1, title: "새로운 알림", message: "내 게시물에 답변이 달렸습니다" },
        { id: 2, title: "새로운 메시지", message: "관리자로부터 새로운 메세지가 도착했습니다" },
        { id: 3, title: "승인 알림", message: "가이드 등록이 승인되었습니다" }
    ]);
    */

    //알림 펼치기
    const handleClick = () => {
        setShowNotifications(!showNotifications);
    };

    //알림 내용 눌렀을때
    const handleNotificationClick = (noti) => {
        //누른 알림 상태리스트에서 삭제
        setNotifications(prevNotifications => 
            prevNotifications.filter(notification => notification.id !== noti.id)
        );
        //알림테이블에서 읽음처리로 수정하기
        readNotification(noti.content[0]);
        setShowNotifications(false);
        navigate(noti.link);
    };

    const getNotiCount = () => {
        let count = 0;
        notifications.forEach(noti=>{
            if(noti.type=="chat") count = count + noti.content.length;
            else count = count + 1;
        });
        return count;
    };

    //알림 개수
    const notificationCount = getNotiCount();

    //알림 모션
    const ringAnimation = notificationCount > 0 ? `
        @keyframes ring {
            0% { transform: rotate(0); }
            5% { transform: rotate(5deg); }
            10% { transform: rotate(-5deg); }
            15% { transform: rotate(5deg); }
            20% { transform: rotate(-5deg); }
            25% { transform: rotate(0); }
            100% { transform: rotate(0); }
        }
    ` : '';

    return (
        <div style={{ position: 'relative' }}>
            <IconButton 
                onClick={handleClick} 
                style={{ 
                    transition: 'transform 0.3s ease',
                    animation: notificationCount > 0 ? 'ring 2s infinite' : 'none',
                }}
            >
                <Badge badgeContent={notificationCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <style>
                {ringAnimation}
            </style>
            {showNotifications && (
                <NotificationPopup style={{width:"200px"}}>
                    {notificationCount > 0 ? (
                        notifications.map((notification) => {
                            console.log(new Date(notification.createAt));
                            return (
                            <NotificationItem 
                                key={notification.id} 
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <NotificationTitle style={{ display: 'inline' }}>{convertNotificationType[notification.type] }</NotificationTitle>
                                <Typography variant="caption" style={{ display: 'inline', color: 'gray' }}>{` ${new Date().toLocaleDateString() == new Date(notification.createAt+'Z').toLocaleDateString()?'':new Date(notification.createAt+'Z').toLocaleDateString().slice(6,-1)} ${new Date(notification.createAt+'Z').toLocaleTimeString().slice(0,-3)}`}</Typography>
                                <Box sx={{display:'flex', justifyContent:'space-between', paddingRight:'10px'}}>
                                    <Typography variant="body2" style={{fontWeight: 'bold'}}>{`유저아이디 ${notification.senderId}`}</Typography>
                                    {/*
                                    <Typography variant="body2" >{notification.content[0].content}</Typography>
                                    <Typography variant="body2" style={{fontWeight: 'bold', color: 'red'}}>{notification.type=='chat' && notification.content.length}</Typography>
                                    */}
                                    {notification.type=='chat' && (
                                        <span class="badge rounded-pill bg-danger" style={{fontSize:'11px'}}>{notification.type=='chat' && notification.content.length}</span>
                                    )}
                                </Box>
                            </NotificationItem>
                        )})
                    ) : (
                        <NotificationItem>
                            <Typography variant="body2">알림이 없습니다</Typography>
                        </NotificationItem>
                    )}
                </NotificationPopup>
            )}
        </div>
    );
};

/*
const jsonData = {
    'memberId': localStorage.getItem('membersId'),
    'content': text,
    'createAt': timestamp,
    'type': 'chat',
    'link': `/bigchat/${topic}`,
    'senderId': sender
}
*/


//헤더 컴포넌트
const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState(''); //검색어 상태
    const { role, setRole } = useContext(TemplateContext); //사용자 role 상태
    const [open, setOpen] = useState(false); //가이드 등록 모달 사용여부 상태
    let menuList = menuData[role]; //사용자 role에 따라 메뉴 변경
    const [mqttClientList, setMqttClientList] = useState([]); //mqtt 객체 리스트 상태
    const [notifications, setNotifications] = useState([]); //알림 리스트 상태

    //로그아웃 함수
    const handleLogout = () => {
        logout().then(res => {
            localStorage.clear();
            navigate('/home');
        })
    }

    //가이드 등록 모달 관련 함수
    const handleOpen = () => {
        if (localStorage.getItem("token")) setOpen(true);
    };
    const handleClose = () => setOpen(false);

    
    //채팅방 알림을 위한 함수
    //채팅방 알림을 위해서 상위 컴포넌트에서 채팅방 연결 관리
    const getChattingList = async ()=>{
        if(localStorage.getItem('token')){
            //채팅방 리스트 불러오기
            const chattingList = await chattingListMyData(localStorage.getItem('membersId'));
            //console.log(chattingList);

            //mqtt 연결 객체 리스트
            let mqttClients=[];

            for(let joinChatting of chattingList){
                //mqtt 연결 객체 생성, 각 객체는 각각의 채팅방 연결이 된다.
                const mqttClient = mqtt.connect('ws://121.133.84.38:1884');

                //연결 성공
                mqttClient.on('connect', () => {
                    console.log('Connected to MQTT broker:',joinChatting.chattingRoom.id);
                });
          
                //연결 실패시
                mqttClient.on('error', (err) => {
                    console.error('Connection error:', err);
                });

                //채팅방 subscribe, 즉 토픽(채팅방) 정하기
                mqttClient.subscribe(`${joinChatting.chattingRoom.id}`, (err) => {
                    if (!err) {console.log('Subscribed to topic', joinChatting.chattingRoom.id);}
                    else {console.error('Subscription error:', err);}
                });

                //메시지 수신시 아래 코드 실행
                mqttClient.on('message', async (topic, message) => {
                    console.log('Received message:', message.toString());
                    try {
                        const parsedMessage = JSON.parse(message.toString());
                        const { text, sender, timestamp } = parsedMessage;
            
                        //자신 메세지 제외
                        if (sender == localStorage.getItem('membersId')) return;

                        //받은 메세지 디비 저장 메소드(이걸 왜 여기에서???? 보낼때하면 되잖아)

                        //알림 테이블에 추가하는 함수(memberId, content, type, link)
                        //현재 채팅방에 들어가있으면 알림테이블에 추가하지 않는다
                        if(location.pathname.includes('bigchat') &&
                             location.pathname.includes(`${topic}`)) return;
                        else{
                            //알림 테이블에 추가
                            const jsonData = {
                                'memberId': localStorage.getItem('membersId'),
                                'content': text,
                                'createAt': timestamp,
                                'type': 'chat',
                                'link': `/bigchat/${topic}`,
                                'senderId': `${sender}`
                            }
                            const postedData = await postNotification(jsonData); //알림테이블에 추가하기
                            //받은 메세지 알림 리스트 상태에 추가(dto 그대로 받기)
                            const notiList = await getNoti(); //알림 테이블 불러오기
                            setNotifications(notiList);
                        }                 
                    } catch (error) {console.error('Error parsing message:', error);}
                });
            }

            return mqttClients; //각 채팅방 mqtt 연결객체 리스트를 반환
        }
    };

    const getNoti= async (type)=>{
        const notificationList = await getNotifications(localStorage.getItem('membersId'));
        const notiStateList =[]; //새로운 리스트 만들기
        for(let noti of notificationList){ //불러온거
            if(noti.type=='chat'){ //타입이 채팅이면
                if(notiStateList.find(ele => ele.senderId==noti.senderId)) { //이미 새로운리스트에 있다면
                    notiStateList.forEach(ele => {
                        if(ele.senderId==noti.senderId){
                            ele.content.push(noti);
                            ele.timestamp=noti.timestamp;
                        }
                    });
                }
                else{
                    notiStateList.push({...noti, content:[noti]});
                }
            }

        }
        type && setNotifications(notiStateList);
        return notiStateList;
    };

    //마운트시 모든 채팅방 mqtt 연결(처음엔 이게 맞음)
    //상품목록 페이지 벗어날때 검색창 비우기
    //url변경시 리렌더링 되게?
    useEffect(() => {
        //console.log(location.pathname);
        if(mqttClientList.length==0){ //mqtt연결 리스트가 비어있을 경우에만(마운트시)
            const chatList = getChattingList();
            setMqttClientList(chatList); //mqtt연결 리스트 상태
            getNoti(1); //알림 상태
        }

        //상품페이지 벗어날때 검색창 검색어 초기화
        if (!location.pathname.includes('/product')) {
            setSearchKeyword('');
        }

        //채팅방 들어갔을때 알림 제거용
        if(location.pathname.includes('bigchat')){
            //채팅방 url이랑 알림 링크랑 비교해서 들어왓으면 알림 제거
            for(let noti of notifications){
                if(noti.link == location.pathname){
                    setNotifications(prevNotifications => 
                        prevNotifications.filter(notification => notification.link !== location.pathname)
                    );
                    readNotification(noti.content[0]);
                }
            }
        }
    }, [location.pathname]);

    const handleChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') handleNavigatePage();
    };

    const handleNavigatePage = () => {
        console.log('검색 실행:', searchKeyword);
        navigate(`/product?keyword=${searchKeyword}`);
    };

    //스크롤 관련 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleClick = (path) => {
        navigate(path);
        scrollToTop();
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerFrame}>
                <button className={styles.logoButton} onClick={() => { navigate('/home'); }}>TripMaven</button>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={() => { setRole('user') }}>고객</Button>
                    <Button onClick={() => { setRole('guide') }}>가이드</Button>
                    <Button onClick={() => { setRole('admin') }}>관리자</Button>
                </ButtonGroup>

                <div className={styles.nav}>
                    <div className={styles.inputstyle}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="검색어를 입력하세요"
                            value={searchKeyword}
                            onChange={handleChange}
                            onKeyDown={handleEnterPress}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} onClick={handleNavigatePage} />
                    </div>
                    <div className={styles.navFrame}>
                        <div className={styles.navItems}>
                            <button className={styles.navButton} onClick={() => { handleClick('/home') }}>Home</button>
                            <button className={styles.navButton} onClick={() => { handleClick('/aiservice') }}>AI 서비스</button>
                            <div className={styles.dropdown}>
                                <button className={styles.dropdownButton}>
                                    마이 페이지
                                    <svg
                                        className={styles.dropdownIcon}
                                        width="9"
                                        height="6"
                                        viewBox="0 0 9 6"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4.98622 5.30911C4.85946 5.43134 4.68755 5.5 4.50831 5.5C4.32906 5.5 4.15715 5.43134 4.03039 5.30911L0.206369 1.62092C0.141806 1.56078 0.0903082 1.48884 0.0548807 1.4093C0.0194533 1.32975 0.00080548 1.2442 2.55226e-05 1.15763C-0.000754434 1.07107 0.0163492 0.985216 0.0503381 0.905091C0.084327 0.824966 0.134521 0.752172 0.19799 0.690957C0.26146 0.629742 0.336934 0.581331 0.42001 0.54855C0.503085 0.515768 0.592098 0.499272 0.681854 0.500025C0.77161 0.500777 0.860312 0.518762 0.942784 0.552931C1.02526 0.5871 1.09985 0.636769 1.1622 0.699038L4.50831 3.92629L7.85441 0.699038C7.9819 0.580277 8.15265 0.514562 8.32989 0.516048C8.50713 0.517533 8.67668 0.5861 8.80201 0.70698C8.92734 0.827861 8.99843 0.991383 8.99997 1.16233C9.00151 1.33327 8.93338 1.49796 8.81024 1.62092L4.98622 5.30911Z"
                                            fill="#1E1E1E"
                                        />
                                    </svg>
                                </button>
                                <div className={styles.dropdownContent}>
                                    {menuList && menuList.map((item, index) => {
                                        if (item.name) {
                                            return <a key={index}><button className={styles.navButton1} onClick={() => { handleClick(item.path.includes('mypageprofile')?`${item.path}/${localStorage.getItem('membersId')}`:item.path) }}>{item.name}</button></a>
                                        }
                                    })}
                                </div>
                            </div>
                            <button className={styles.navButton} onClick={handleOpen}>가이드 등록</button>
                            <NotificationComponent notifications={notifications} setNotifications={setNotifications}/>
                        </div>

                        {!localStorage.getItem("token") ?
                            <NavLink className={styles.loginButton} to="/login" >로그인</NavLink>
                            :
                            <NavLink onClick={handleLogout} className={styles.loginButton} to="/home" >로그아웃</NavLink>
                        }
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                keepMounted
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <GuideRegistration />
                </Box>
            </Modal>
        </header>
    );
}

export default Header;
