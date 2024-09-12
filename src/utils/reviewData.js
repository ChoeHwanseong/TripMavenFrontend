import axios from 'axios';
const baseUrl = "http://localhost:9099/review"

// 리뷰 등록
export const reviewPost = (createData) => {
    console.log('리뷰 axios 넘어간 데이타: ',createData);
    return axios.post(`${baseUrl}/post`,createData).then(res =>{
        console.log('res:', res);
        return res;
    })
}

// 리뷰 조회 (상품id 로)
export const reviewGet = (id) => {
    console.log('리뷰 raxios 넘어간 id: ', id);
    return axios.get(`${baseUrl}/product/${id}`).then(res => {
        console.log('res:  ', res);
        console.log('res:  ', res.data);
        return res.data;
    }).catch(err => {
        console.error('Error fetching reviews:', err);
    });
}