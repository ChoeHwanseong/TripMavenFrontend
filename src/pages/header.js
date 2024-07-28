import { Link, NavLink, useNavigate,redirect } from "react-router-dom";



export default function Header(){   
    

    
    return <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
               
                <Link className="navbar-brand" to="/">
                    <img src="/images/home_icon.png" style={{width:'40px'}} className="img-thumbnail"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">                            
                            {/*로그아웃 클릭시 이벤트 처리후 to속성에 지정한 URL로 이동한다*/}
                                               
                            <NavLink className="nav-link" to="/login" >로그인</NavLink> 
                            
                            <NavLink className="nav-link" to="/" onClick={[]} >로그아웃</NavLink>    
                            
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users" >회원</NavLink>   
                        </li>
                        <li className="nav-item">
                            {/* 회원제 게시판으로 비 로그인 상태에서 클릭시 로그인 화면으로 이동*/}
                            {/* 
                                클릭 이벤트의 콜백 메소드 실행후 to속성에 지정한 URL로 이동
                                단, to 속성을 onClick속성 보다 앞에 위치 시키자                             
                            */}
                            <NavLink className="nav-link"  to="/bbs" onClick={[]} style={{}}>게시판</NavLink> 
                        </li>   
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/photos" style={[]}>사진앨범</NavLink> 
                        </li>
                        
                    </ul>                
                </div>
            </div>
            </nav>
    
    </>

}