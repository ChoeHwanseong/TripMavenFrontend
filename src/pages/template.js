import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "../styles/Template.module.css";

//레이아웃용 컴포넌트
export default function Template(){

    return <>
        
        <Header />
        <div className={style.layout}>
            <div className={style.container}>
                <Outlet/>
            </div>
            <Footer />
        </div>
    
    </>
}