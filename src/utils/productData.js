import axios from 'axios';


export const productFetchData = async (id) => {
  try {
    const res = await axios.get(`/product/${id}`);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

export const productFetchMyData = async (email) => {
  try {
    const res = await axios.get(`/product/member/${email}`);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

//상품목록 전체 얻어오기(20개씩 얻어오기)
export const productFetchAllData = async (page) => {
  try {
    const res = await axios.get(`/product/all/${page}`);
    return res.data;
  } catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

//제목 내용 검색(20개씩 얻어오기)
export const productFetchTitleAndContent = async (keyword, page) => {
  try{
    const res = await axios.get(`/product/titlencontent/${keyword}?page=${page}`);
    return res.data;
  } catch(error) {
    console.error('에러났땅',error)
    throw error;
  }
}

//도시로 검색(20개씩 얻어오기)
export const productFetchCity = async (city, page) => {
  try{
    const res = await axios.get(`/product/city/${city}?page=${page}`);
    return res.data;
  } catch(error) {
    console.error('에러났땅',error)
    throw error;
  }
}

export const createPost = async (data) => {
  try {
    console.log('수정된 데이타: ',data);
    console.log('수정된 데이타 제목: ',data.title);
    console.log('수정된 데이타 내용: ',data.content);
    console.log('수정된 데이타 회원번호: ',data.members_id);
    const res = await axios.post('/product',data);
    return res.data;
  } catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};


export const updatePost = async (data) => {
  try {
    console.log('수정된 데이타: ',data);
    console.log('수정된 데이타 제목: ',data.title);
    console.log('수정된 데이타 내용: ',data.content);
    console.log('수정된 데이타 회원번호: ',data.members_id);
    const res = await axios.put(`/product/${data.members_id}`,data);
    return res.data;
  } catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};
