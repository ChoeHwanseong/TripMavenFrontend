import axios from 'axios';

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
    console.log(id)
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
    // 성공적으로 응답을 받았을 때의 처리
    console.log('Response:', response.data);
  })
  .catch(error => {
    // 오류가 발생했을 때의 처리
    console.error('에러났당', error);
  });
  //URL package.json에  "proxy": "http://localhost:9099" 추가후  뒤에 가져올 주소만 적어주기 
};

//폼로그인!!@!@!@!@!@!@
export const FormLogin = async (form) =>{
  const reponse = await axios.post('/login', form ,{headers:{
    'Content-Type': 'application/json'}})
  return reponse.data;
  }
