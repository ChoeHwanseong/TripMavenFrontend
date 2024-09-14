import { Navigate, Route, Routes } from "react-router-dom";
import { PronunContext } from "../../context/PronunContext";
import PrivateAsk from "./PrivateAsk";
import MypageUpdate from "./MyPageUpdate";
import MypageProfile from "./MyPageProfile";
import AdminReport from "./adminmypage/AdminReport";
import AdminAsk from "./adminmypage/AdminAsk";
import MemberList from "./adminmypage/MemberList";
import AdminAskDetailsView from "./adminmypage/AdminAskDetailsView";
import AdminAnswer from "./adminmypage/AdminAnswer";


export default function MyPageRoutes() {

    return <>
        <PronunContext.Provider value={{}}>
            <Routes>
                <Route path="/:id" element={<MypageProfile />} />
                <Route path="/privateAsk" element={<PrivateAsk />} />
                <Route path="/update/:id" element={<MypageUpdate />} />
                {/* ADMIN */}
                <Route path='/admin/report' element={<AdminReport />} />
                <Route path='/admin/ask' element={<AdminAsk />} />
                <Route path='/admin/memberlist' element={<MemberList />} />
                <Route path='/admin/AskDetailsView/:id' element={<AdminAskDetailsView/>} />
                <Route path='/admin/Answer/:id' element={<AdminAnswer />} />

                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </PronunContext.Provider>
    </>
}