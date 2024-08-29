import axios from 'axios';
const baseUrl = "http://localhost:9099/product/report"

// 신고 등록
export const reportPost = (createData) => {
    console.log('신고 axios 넘어간 데이타: ',createData);
    return axios.post(`${baseUrl}/post`,createData).then(res =>{
        console.log('res:', res);
        return res;
    })
}

// 신고 전체조회(관리자)
export const reportAllget = () => {
    return axios.get(baseUrl).then(res =>{
        return res.data;
    })
}

// 신고 조회(가이드 회원id)
export const reportGet = (member_id) => {
    return axios.get(baseUrl + `/${member_id}`).then(res =>{
        return res.data;
    })
}
