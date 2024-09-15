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
import PostDetails from "../productPage/PostDetails";
import RoleBasedRoute from "../../components/RoleBasedRoute";


export default function MyPageRoutes() {

    return <>
        <PronunContext.Provider value={{}}>
            <Routes>
                <Route path="/:id" element={<RoleBasedRoute element={<MypageProfile />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
                <Route path="/privateAsk" element={<RoleBasedRoute element={<PrivateAsk />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />
                <Route path="/update/:id" element={<RoleBasedRoute element={<MypageUpdate />} requiredRole={["USER", "GUIDE", "ADMIN"]} />} />

                {/* GUIDE */}
                <Route path='/guide/PostDetails/:id' element={<RoleBasedRoute element={<PostDetails />} requiredRole={["GUIDE", "ADMIN"]} />} />

                {/* ADMIN */}
                <Route path='/admin/report' element={<RoleBasedRoute element={<AdminReport />} requiredRole={["ADMIN"]} />} />
                <Route path='/admin/ask' element={<RoleBasedRoute element={<AdminAsk />} requiredRole={["ADMIN"]} />} />
                <Route path='/admin/memberlist' element={<RoleBasedRoute element={<MemberList />} requiredRole={["ADMIN"]} />} />
                <Route path='/admin/AskDetailsView/:id' element={<RoleBasedRoute element={<AdminAskDetailsView />} requiredRole={["ADMIN"]} />} />
                <Route path='/admin/Answer/:id' element={<RoleBasedRoute element={<AdminAnswer />} requiredRole={["ADMIN"]} />} />


                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </PronunContext.Provider>
    </>
}