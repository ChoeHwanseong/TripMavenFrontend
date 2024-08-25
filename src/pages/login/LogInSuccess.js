import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { access, refresh, role, memberId } = router.query;

        if (access && refresh) {
            // JWT 토큰과 사용자 정보를 로컬 스토리지에 저장합니다.
            window.localStorage.setItem("token", access);
            window.localStorage.setItem("role", role);
            window.localStorage.setItem("memberId", memberId);
            window.localStorage.setItem("refresh", refresh);
            //authStore.setIsAdmin(isAdmin === 'true');
            //authStore.checkLoggedIn();

            // 원하는 페이지로 리다이렉트합니다.
            navigate
        }
    }, [router.query]);

    return (
        <div>
            <p>로그인 성공! 리다이렉트 중...</p>
        </div>
    );
};

export default LoginSuccess;
