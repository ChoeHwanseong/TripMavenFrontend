import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaUsers, FaQuestionCircle, FaFlag, FaPencilAlt, FaComments, FaRobot, FaStar, FaHeart } from 'react-icons/fa';
import styles from '../styles/components/SideMenu.module.css';
import { menuData } from '../config/MyPageEndPoint';
import { RoleContext } from './context/roleContext';

//메뉴 데이터 구조
/*
    export const menuData = {
        admin: [
            { name: "내 정보 관리", path: "/mypageprofile/2" },
            { name: "회원 목록", path: "/memberlist" },
            { name: "1:1문의 내역", path: "/adminask" },
            { name: "신고 내역", path: "/adminreport" }
        ],
        guide: [
            { name: "내 정보 관리", path: "/mypageprofile/2" },
            { name: "내 게시물 관리", path: "/guidemypost" },
            { name: "1:1문의 내역", path: "/guideaskdetails" },
            { name: "채팅방", path: "/bigchat" },
            { name: "AI 서비스", path: "/guidemypageaiservice" },
            {path: "/guidemypagemypostdetails" }, //내 게시물 상세보기는 메뉴 내용엔 없음
            {path: "/guideask" },
            {path: "/guideaskdetailsview"}
        ],
        user: [
            { name: "내 정보 관리", path: "/mypageprofile/2" },
            { name: "이용후기", path: "/userreview" },
            { name: "1:1문의 내역", path: "/userask" },
            { name: "찜 목록", path: "/userlike" },
            { name: "채팅방", path: "/bigchat" }
        ]
    };

//이제 안써도 되는데 일단은 지우진 않음
const DecideSideMenu = (nowPageEndPoint) => {
    for (let key in menuData) {
        let endPoints = menuData[key]
        
            endPoints=
            [
                { name: "내 정보 관리", path: "/adminprofile" },
                { name: "회원 목록", path: "/memberlist" },
                { name: "1:1문의 내역", path: "/adminask" },
                { name: "신고 내역", path: "/adminreport" }
            ]
         
        const nowPageEndPoint_= '/'+nowPageEndPoint.toLowerCase().split('/')[1]
        for(let i=0;i<endPoints.length;i++){
            if(nowPageEndPoint_ == endPoints[i]['path']) return endPoints
            else if(nowPageEndPoint_ == endPoints[i]['path']) return endPoints
            else if(nowPageEndPoint_ == endPoints[i]['path']) return endPoints
        }
    }
}
*/
const SideMenu = () => {
    const { role } = useContext(RoleContext);
    //endpoint 받아오기(location.pathname)
    const location = useLocation();
    const navigate = useNavigate();

    const getIcon = (name) => {
        const iconMap = {
            "내 정보 관리": <FaUser />,
            "회원 목록": <FaUsers />,
            "1:1문의 내역": <FaQuestionCircle />,
            "신고 내역": <FaFlag />,
            "내 게시물 관리": <FaPencilAlt />,
            "채팅방": <FaComments />,
            "AI 서비스": <FaRobot />,
            "이용후기": <FaStar />,
            "찜 목록": <FaHeart />,
        };
        return iconMap[name] || null;
    };
    // 나중에 로그인 구현되면 DecideSideMenu함수 쓰지 않아도 토큰에서 role을 받아와서 뿌려주면 됨(role: admin, guide, user)
    let menuItems = menuData[role];

    return (
        <div className={styles.layoutContainer}>
            <div className={styles.sidebar}>
                <img
                    src="../../images/mypageLogo.png"
                    alt="mypagelogo"
                    className={styles.mypageLogo}
                    onClick={() => navigate('/mypageprofile')}
                />
                <ul>
                    {menuItems && menuItems.map((item, index) => {
                        if (item.name) {
                            const isActive = location.pathname.toLowerCase().includes(item.path.toLowerCase());
                            return (
                                <li key={index} className={`${styles.sidebarItem} ${isActive ? styles.active : ''}`}>
                                    <button 
                                        className={styles.navButton} 
                                        onClick={() => navigate(item.path)}
                                    >
                                        <span className={styles.icon}>{getIcon(item.name)}</span>
                                        <span className={styles.label}>{item.name}</span>
                                    </button>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </div>
            <div className={styles.mainContent}>
                {/* Main content goes here */}
            </div>
        </div>
    );
};

export default SideMenu;
