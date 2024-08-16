import axios from 'axios';


export const csfetchData = async (id) => {
  try {
    const res = await axios.get(`/cs/get/${id}`);
    //URL package.json에  "proxy": "http://localhost:9099" 추가후  뒤에 가져올 주소만 적어주기 
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};


export const csfetchAllData = async () => {
  try {
    const res = await axios.get('/cs/getAll');
    console.log(res.data)
    //URL package.json에  "proxy": "http://localhost:9099" 추가후  뒤에 가져올 주소만 적어주기 
    return res.data;
  } catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

export const csfetchUpdateData = async (id,updatedData) => {
  try {
    const res = await axios.put(`/cs/put/${id}`,updatedData);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

export const csAsnwerfetchUpdateData = async (id,updatedData) => {
  try {
    console.log('수정된 데이타: ',updatedData);
    console.log('수정된 데이타 댓글: ',updatedData.comments);
    const res = await axios.put(`/cs/answer/${id}`,updatedData);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};


export const csfetchPostData = async (data) => {
  try {
    console.log('수정된 데이타: ',data);
    console.log('수정된 데이타 제목: ',data.title);
    console.log('수정된 데이타 내용: ',data.content);
    console.log('수정된 데이타 회원번호: ',data.members_id);
    const res = await axios.post(`/cs/post`,data);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

export const csfetchDeleteData = async (id) => {
  try {
    const res = await axios.delete(`/cs/delete/${id}`);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};
