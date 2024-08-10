import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/components/sideMenu.module.css';
import { menuData } from '../config/myPageEndPoint';

//메뉴 데이터 구조
/*
    export const menuData = {
        admin: [
            { name: "내 정보 관리", path: "/adminprofile" },
            { name: "회원 목록", path: "/memberlist" },
            { name: "1:1문의 내역", path: "/adminask" },
            { name: "신고 내역", path: "/adminreport" }
        ],
        guide: [
            { name: "내 정보 관리", path: "/guideprofile" },
            { name: "내 게시물 관리", path: "/guidemypagemypostdetails" },
            { name: "1:1문의 내역", path: "/guidemypageinquirydetails" },
            { name: "채팅방", path: "/bigChat" },
            { name: "AI 서비스", path: "/guidemypageaiservice" }
        ],
        user: [
            { name: "내 정보 관리", path: "/userprofile" },
            { name: "이용후기", path: "/userreview" },
            { name: "1:1문의 내역", path: "/userask" },
            { name: "찜 목록", path: "/" },
            { name: "채팅방", path: "/bigChat" }
        ]
    };
*/
const DecideSideMenu = (nowPageEndPoint) => {
    for (let key in menuData) {
        let endPoints = menuData[key]
        /*
            endPoints=
            [
                { name: "내 정보 관리", path: "/adminprofile" },
                { name: "회원 목록", path: "/memberlist" },
                { name: "1:1문의 내역", path: "/adminask" },
                { name: "신고 내역", path: "/adminreport" }
            ]
         */
        for (let i = 0; i < endPoints.length; i++) {
            if (nowPageEndPoint == endPoints[i]['path']) return endPoints
            else if (nowPageEndPoint == endPoints[i]['path']) return endPoints
            else if (nowPageEndPoint == endPoints[i]['path']) return endPoints
        }
    }
}

const SideMenu = ({ role }) => {

    //endpoint 받아오기(location.pathname)
    const location = useLocation();
    const navigate = useNavigate();

    // 나중에 로그인 구현되면 DecideSideMenu함수 쓰지 않아도 토큰에서 role을 받아와서 뿌려주면 됨(role: admin, guide, user)
    let menuItems = DecideSideMenu(location.pathname);

    return <>
        <div className={styles.sidebar}>
            <div>
                <img
                    src="../../images/mypageLogo.png"
                    alt="mypagelogo"
                    className={styles.mypageLogo}
                    onClick={() => navigate('/mypageprofile')}
                />
                <ul>
                    {menuItems && menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={index}><button className={`${styles.navButton} ${isActive ? styles.active : ''}`} onClick={() => navigate(item.path)}>{item.name}</button></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    </>
}

export default SideMenu;