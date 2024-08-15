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

    
export const createPost = async () => {
  try {
    const res = await axios.post('/product');
    return res.data;
  } catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
};

