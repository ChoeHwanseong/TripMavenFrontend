import axios from 'axios';

export const csfetchData = async () => {
  try {
    const res = await axios.get('/cs/getAll');
    //URL package.json에  "proxy": "http://localhost:9099" 추가후  뒤에 가져올 주소만 적어주기 
    return res.data;
  } catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};