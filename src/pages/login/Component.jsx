import "./Component.css";
import { IconFontAwesomeFreeSolidEEyeSlash } from "../IconFontAwesomeFreeSolidEEyeSlash/IconFontAwesomeFreeSolidEEyeSlash.jsx";

export const Component = ({ className, ...props }) => {
  return (
    <div className={"div " + className}>
      <div className="page">
        <div className="div2">이메일 </div>
        <div className="frame-4">
          <div className="kim-1234-gmail-com">kim1234@gmail.com </div>
        </div>
        <div className="div3">비밀번호 </div>
        <div className="frame-42">
          <div className="frame-7">
            <div className="ellipse-1"></div>
            <div className="ellipse-3"></div>
            <div className="ellipse-5"></div>
            <div className="ellipse-2"></div>
            <div className="ellipse-4"></div>
            <div className="ellipse-6"></div>
          </div>
          <IconFontAwesomeFreeSolidEEyeSlash className="icon-font-awesome-free-solid-e-eye-slash-instance"></IconFontAwesomeFreeSolidEEyeSlash>
        </div>
        <div className="remember">
          <div className="frame-8">
            <div className="group-2">
              <div className="ellipse-7"></div>
              <div className="ellipse-8"></div>
            </div>
            <div className="frame-9">
              <div className="div4">자동 로그인 </div>
            </div>
          </div>
          <div className="frame-11">
            <div className="div5">아이디/비밀번호 찾기 </div>
          </div>
        </div>
        <div className="sign-in">
          <div className="div6">로그인 </div>
        </div>
        <img className="vector-1" src="/images/vector-10.svg" />
        <div className="frame-13">
          <div className="sns">SNS 간편 로그인 </div>
        </div>
        <div className="social-login">
          <div className="frame-14">
            <div className="frame-18">
              <img className="google" src="/images/google0.svg" />
            </div>
          </div>
          <div className="frame-15">
            <div className="naver-btn">
              <div className="div7">
                <img className="div8" src="/images/div6.svg" />
              </div>
            </div>
          </div>
          <div className="frame-17">
            <img className="removebg-preview-1" src="/images/removebg-preview-10.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
