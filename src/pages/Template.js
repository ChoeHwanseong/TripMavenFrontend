import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "../styles/Template.module.css";
import Chat from "./chat/Chat";
import { useContext, useState } from "react";
import { RoleContext } from "../components/context/roleContext";
import { menuData } from "../config/MyPageEndPoint";

//레이아웃용 컴포넌트
export default function Template(){

    const [role, setRole] = useState('admin');

    return <>
        <RoleContext.Provider value={{role, setRole}}>
            <Header />
            <div className={style.layout}>
                <div className={style.container}>
                    <Outlet/>
                </div>
                <Chat/>
                <Footer />
            </div>
        </RoleContext.Provider>
    
    </>
}
