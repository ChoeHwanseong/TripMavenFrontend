import { Navigate, Route, Routes } from "react-router-dom";
import { PronunContext } from "../../context/PronunContext";
import PrivateAsk from "./PrivateAsk";
import MypageUpdate from "./MyPageUpdate";
import MypageProfile from "./MyPageProfile";

export default function MyPageRoutes() {

    return <>
        <PronunContext.Provider value={{}}>
            <Routes>
                <Route path="/:id" element={<MypageProfile />} /> 
                <Route path="/privateAsk" element={<PrivateAsk />} />
                <Route path="/update/:id" element={<MypageUpdate />} /> 
                <Route path="*" element={<Navigate to="/" replace={true} />} /> 
            </Routes>
        </PronunContext.Provider>
    </>
}