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

export const productFetchAllData = async () => {
  try {
    const res = await axios.get('/product');
    return res.data;
  } catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

export const productFetchTitleAndContent = async (keyword) => {
  try{
    const res = await axios.get(`/product/titlencontent/${keyword}`);
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
