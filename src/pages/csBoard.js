import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './csBoard.css';
import { useState } from "react";

//레이아웃용 컴포넌트
export default function CSBoard(){

    
    const FAQ = () => {
        const [open, setOpen] = useState(Array(5).fill(false));
    
        const toggleFAQ = (index) => {
            const newOpen = [...open];
            newOpen[index] = !newOpen[index];
            setOpen(newOpen);
        };
    

    return <>
        {/*<Header />*/}
        <div className="container">
        <Outlet/>
        <h1>FAQ <span>자주 묻는 질문</span></h1>
        <div className="faq">
            <h1>FAQ <span>자주 묻는 질문</span></h1>
            <div className="faq-categories">
                <span>서비스 소개</span>
                <span>이용 방법</span>
                <span>결제</span>
                <span>서비스 소개</span>
                <span>서비스 소개</span>
            </div>
            <div className="faq-list">
                {open.map((isOpen, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            이용 방법이 궁금한가요?
                            <span className="arrow">{isOpen ? '▲' : '▼'}</span>
                        </div>
                        {isOpen && (
                            <div className="faq-answer">
                                여기에 답변 내용이 들어갑니다.
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="inquiry-button">문의 하기</button>
        </div>
        </div>
        {/*<Footer />*/}
    
    </>
}
}
