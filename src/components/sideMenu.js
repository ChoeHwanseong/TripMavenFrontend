import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/components/sideMenu.module.css';

const SideMenu = () => {

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    //endpoint 받아오기(location.pathname)
    /*
        endpoint로

    */
    return <>
        <div className={styles.sidebar}>
            <div>
                <h2>My Page</h2>
                <ul>
                    <li><button className={styles.navButton} onClick={()=>navigate('/guideprofile')}>내 정보 관리</button></li>
                    <li>내 정보 관리</li>
                    <li>회원 목록</li>
                    <li>1:1문의 내역</li>
                    <li>신고 내역</li>
                </ul>
            </div>
        </div>
    </>
}

export default SideMenu;