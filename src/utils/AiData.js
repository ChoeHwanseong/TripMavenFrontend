import axios from 'axios';

const baseUrl = "/evaluation"

// 분석내용 등록
export const createEvaluation = async (formData, member_id, productboard_id) => {
    try {
        console.log('formData: ',formData);
        const response = await axios.post(`http:/localhost:9099/${baseUrl}`, formData, member_id, productboard_id, {
        });
        console.log('서버 응답:', response.data);
        return response.data;
      }
      catch (error) {
        console.error('저장 중 오류 발생:', error);
        return { success: false, error: error.message };
      }
};
