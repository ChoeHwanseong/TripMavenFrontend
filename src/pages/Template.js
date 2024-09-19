import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Template.module.css";
import Chat from "./chat/Chat";
import { useEffect, useState } from "react";
import { TemplateContext } from "../context/TemplateContext";
import { fetchedData } from "../utils/memberData";


//레이아웃용 컴포넌트
export default function Template() {
    //개발 편의성을 위해 하드코딩한 것임. 나중에는 로그인한 회원 role로 넣기
    const [role, setRole] = useState('');
    
    //로그인한 사용자 정보
    const [memberInfo, setMemberInfo] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const getMember = async ()=>{
            if(localStorage.getItem('token')){
                const memberData = await fetchedData(localStorage.getItem('membersId'));
                setMemberInfo(memberData);
                setRole(memberData.role);
            }
            setIsLoading(false);
        };
        getMember();
    },[]);

    if (isLoading) {
        // 로딩 중일 때 보여줄 UI를 여기에 작성
        return <div>Loading...</div>;
    }
    
    return <>
        <TemplateContext.Provider value={{ role, setRole, memberInfo, setMemberInfo}}>
            <div className={styles.body}>
                <Header />  
                <div className={styles.layout}>
                    <div className={styles.container}>
                        <Outlet />
                    </div>
                    <Chat />
                </div>
                <Footer />
            </div>
        </TemplateContext.Provider>
    </>
}
