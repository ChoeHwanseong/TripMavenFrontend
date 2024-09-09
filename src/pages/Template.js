import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Template.module.css";
import Chat from "./chat/Chat";
import { useEffect, useState } from "react";
import { TemplateContext } from "../components/context/TemplateContext";
import { fetchedData } from "../utils/memberData";
import { ChattingListMyData } from "../utils/chatData";

//레이아웃용 컴포넌트
export default function Template() {
    //개발 편의성을 위해 하드코딩한 것임. 나중에는 로그인한 회원 role로 넣기
    const memberRole = localStorage.getItem('role'); //로그인한 회원 role
    const [role, setRole] = useState('admin');
    

    const location = useLocation();
    
    //로그인한 사용자 정보
    const [memberInfo, setMemberInfo] = useState({});

    useEffect(()=>{
        const getMember = async ()=>{
            if(localStorage.getItem('token')){
                const memberData = await fetchedData(localStorage.getItem('membersId'));
                setMemberInfo(memberData);
            }
        };

        const getChattingList = async ()=>{
            if(localStorage.getItem('token')){
                const chattingList = await ChattingListMyData(localStorage.getItem('membersId'));
                let mqttClients=[];
                for(let joinchatting in chattingList){

                }
                setMemberInfo(chattingList);
            }
        };
        getMember();
    },[]);

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
