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