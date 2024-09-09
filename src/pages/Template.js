import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Template.module.css";
import Chat from "./chat/Chat";
import { useEffect, useState } from "react";
import { RoleContext } from "../context/roleContext";
import { fetchedData } from "../utils/memberData";

//레이아웃용 컴포넌트
export default function Template() {
    //개발 편의성을 위해 하드코딩한 것임. 나중에는 로그인한 사람 role로 넣기
    const [role, setRole] = useState('admin');

    //로그인한 사용자 정보
    const [memberInfo, setMemberInfo] = useState({});

    useEffect(()=>{
        const getMember = async ()=>{
            if(localStorage.getItem('token')){
                const memberData = await fetchedData(localStorage.getItem('membersId'));
                setMemberInfo(memberData);
            }
        };
        getMember();
    },[]);

    return <>
        <RoleContext.Provider value={{ role, setRole, memberInfo, setMemberInfo}}>
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
        </RoleContext.Provider>
    </>
}
