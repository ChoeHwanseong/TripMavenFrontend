import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

//레이아웃용 컴포넌트
export default function Template(){

    return <>
        <Header />
        <div className="container">
            <Outlet/>
        </div>
        <Footer />
    
    </>
}