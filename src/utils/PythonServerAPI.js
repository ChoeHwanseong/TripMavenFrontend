import axios from 'axios';

const baseUrl = "/python"

// ocr
export const ocr = async (formData) => {
    try {
        const response = await axios.post(`${baseUrl}/ocr`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('서버 응답:', response.data);
        return { success: true, data: response.data };
      }
      catch (error) {
        console.error('업로드 중 오류 발생:', error);
        return { success: false, error: error.message };
      }
};

// 자격증 확인
export const verifyLicense = async (formData) => {
  try {
      const response = await axios.post(`${baseUrl}/license`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('서버 응답:', response.data);
      return { success: true, data: response.data };
    }
    catch (error) {
      console.error('업로드 중 오류 발생:', error);
      return { success: false, error: error.message };
    }
};

//크롤링 해보쟈
export const newsCrawling = async()=>{
  try {
    const response = await axios.post(`${baseUrl}/newheadline`);
    console.log('서버 응답:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('크롤링 중 오류 발생:', error);
      return { success: false, error: error.message };
  }
}


//음성+텍스트 평가
//voice 음성데이터, gender , text
export const evaluateVoiceAndText = async (formData) => {
  try {
      const response = await axios.post(`${baseUrl}/analysis`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('서버 응답:', response.data);
      return { success: true, data: response.data };
    }
    catch (error) {
      console.error('업로드 중 오류 발생:', error);
      return { success: false, error: error.message };
    }
};

//발음 평가
//voice 음성데이터, text
export const evaluatePronunciation = async (formData) => {
  try {
      const response = await axios.post(`${baseUrl}/pron`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('서버 응답:', response.data);
      return { success: true, data: response.data };
    }
    catch (error) {
      console.error('업로드 중 오류 발생:', error);
      return { success: false, error: error.message };
    }
};

