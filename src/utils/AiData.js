import axios from 'axios';

const baseUrl = "/evaluation"

// 분석내용 등록
export const createEvaluation = async (formData, member_id, productboard_id) => {
  try {
      // formData에 추가 데이터 함께 보내기
      const payload = {
          ...formData, // formData에 있는 필드들
          member_id: member_id,
          productboard_id: productboard_id
      };

      // URL 수정 (기존의 `${baseUrl}`을 올바르게 사용)
      const response = await axios.post(`http://localhost:9099${baseUrl}`, payload, {
          headers: {
              'Content-Type': 'application/json', // 전송 데이터 타입
          },
      });
      console.log('서버 응답:', response.data);
      return response.data;
  } catch (error) {
      console.error('저장 중 오류 발생:', error);
      return { success: false, error: error.message };
  }
};
