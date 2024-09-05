const membersId= localStorage.getItem('membersId');

export const menuData = {


    admin: [
        { name: "내 정보 관리", path: `/mypageprofile`},
        { name: "회원 목록", path: "/memberlist" },
        { name: "1:1문의 내역", path: "/adminask" },
        { name: "신고 내역", path: "/adminreport" }
    ],
    guide: [
        { name: "내 정보 관리", path: `/mypageprofile` },
        { name: "내 게시물 관리", path: "/guidemypost" },
        { name: "1:1문의 내역", path: "/askall" },
        { name: "채팅방", path: "/bigchat" },
        { name: "AI 서비스", path: "/guidemypageaiservice" },
        {path: "/guidemypagemypostdetails" }, //내 게시물 상세보기는 메뉴 내용엔 없음
        {path: "/guideask" },
        {path: "/guideaskdetailsview"},
        {path: "/askdetails"},
        {path: "/askdetailsview"}      
    ],
    user: [
        { name: "내 정보 관리", path: `/mypageprofile` },
        { name: "이용후기", path: "/userreview" },
        { name: "1:1문의 내역", path: "/askall" },
        { name: "찜 목록", path: "/userlike" },
        { name: "채팅방", path: "/bigchat" },
        {path: "/useraskpage"},
        {path: "/askdetails"},
        {path: "/askdetailsview"}
    ]
};
