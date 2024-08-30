import axios from "axios";


const baseUrl = "http://localhost:9099"

// 파일만 전송
export const filesPost = async (formData) => {
    try {
      console.log('filesPost 의 formData: ',formData)
        const response = await axios.post(`${baseUrl}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('서버 응답:', response.data);
        return { success: true, data: response.data };
      } catch (error) {
        console.error('업로드 중 오류 발생:', error);
        return { success: false, error: error.message };
      }

};


// 파일 가져오기
export const fetchFiles = async (productboardId) => {
    try {

        const response = await axios.get(`${baseUrl}/upload/${productboardId}`, {
          responseType: 'blob' // 서버에서 Blob으로 파일 데이터를 받아옴
        });
        
        const fileUrl = URL.createObjectURL(response.data);
        console.log('fileUrl: ',fileUrl)
        return fileUrl;
      } catch (error) {
        console.error('Error fetching files:', error);
        throw error;
      }
};

// 파일 가져오기(가이드 인증용 파일 이름으로 가져오기, guidelicense)
export const fetchLicenseFile = async (filename) => {
  try {
      const response = await axios.get(`${baseUrl}/downloadlicense/${filename}`, {
        responseType: 'blob' // 서버에서 Blob으로 파일 데이터를 받아옴
      });
      
      const fileUrl = URL.createObjectURL(response.data);
      return {fileUrl, file:response.data};
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
};
