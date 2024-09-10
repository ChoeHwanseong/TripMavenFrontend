import { Navigate, Route, Routes } from "react-router-dom";
import PronunciationTest from "./PronunciationTest";
import MICTest from "./MICTest";
import { newsCrawling } from "../../utils/PythonServerAPI";
import { useEffect } from "react";
import { PronunContext } from "../../context/PronunContext";

export default function PronunciationRoutes() {
    let newsHeadLine = []
    const fetchnews = async (e) => {
        try {
            const response = await newsCrawling();
            for (let i = 0; i <= response.data.length - 1; i++) {
                newsHeadLine.push(response.data[i])
            }
        } catch (error) {
            console.error('크롤링 중 오류 발생:', error);
        }
    };
    useEffect(() => {
        fetchnews();
    });

    return <>
        <PronunContext.Provider value={{newsHeadLine}}>
            <Routes>
                <Route path="" element={<MICTest />} />
                <Route path="/:sequence" element={<PronunciationTest />} />
                <Route path="*" element={<Navigate to="" replace={true} />} />
            </Routes>
        </PronunContext.Provider>
    </>
}