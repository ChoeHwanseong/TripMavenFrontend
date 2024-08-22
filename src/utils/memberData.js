import axios from 'axios';
import { Navigate } from 'react-router-dom';

//멤버 가져오기
export const fetchData = async () => {
  try {
    const res = await axios.get('/members');
    //URL package.json에  "proxy": "http://localhost:9099" 추가후  뒤에 가져올 주소만 적어주기 
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

//회원가입
export const fetchedData = async (id) => {
  try {
    //console.log(id) //디버그용
    const res = await axios.get(`/members/id/${id}`);
    //URL package.json에  "proxy": "http://localhost:9099" 추가후  뒤에 가져올 주소만 적어주기 
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};


//await axios 꼭 붙이기
export const SignUp = async (form) => {
  await axios.post('/signup', form)
  .then(response => {    
  })
  .catch(error => {
    // 오류가 발생했을 때의 처리
    if(error.code == 'ERR_BAD_REQUEST')alert('중복된 아이디입니다.');
    
  });
  //URL package.json에  "proxy": "http://localhost:9099" 추가후  뒤에 가져올 주소만 적어주기 
};

//폼로그인!!@!@!@!@!@!@
export const FormLogin = async (form) =>{
  const response = await axios.post('http://localhost:9099/login', form ,{headers:{
    'Content-Type': 'multipart/form-data'}})

  const token = response.headers['authorization'] || response.headers['Authorization'];
  if(token){
    const pureToken = token.split(' ')[1];
    window.localStorage.setItem("token", pureToken);
    let role = "USER"
    if(response.data.isAdmin) role = "ADMIN"
    else if(response.data.isGuide) role = "GUIDE"
    window.localStorage.setItem("role", role);
    window.localStorage.setItem("membersId", response.data.membersId);
    window.localStorage.setItem("refresh", response.data.refresh);
  }

  return response;
  }

  //가이드 등록.
  export const toGuide = async (form) =>{
    const response = await axios.post('http://localhost:9099/toGuide', form ,{headers:{
      'Content-Type': 'multipart/form-data'}})
      .then(res =>{
        window.localStorage.setItem("role", res.data.role);
        console.log(res.data.role);
      })
      .catch(error =>{
        console.error('에러났당', error);
    throw error; 
      })
      
    }

  export const updateProfile = async (id, updatedData) => {
    try {
      console.log('id',id);
      console.log('updatedData',updatedData);
      const res = await axios.put(`http://localhost:9099/members/${id}`, updatedData);
      return res.data;
    } catch (error) {
      console.error('프로필 업데이트 중 에러났당', error);
      throw error;
    }
  };

  // 회원 탈퇴
  export const deleteProfile = async (id) => {
    try {
      console.log('id',id);
      const res = await axios.delete(`http://localhost:9099/members/${id}`);
      return res.data;
    } catch (error) {
      console.error('회원 탈퇴 중 에러났당', error);
      throw error;
    }
  };
