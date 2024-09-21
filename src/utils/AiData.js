import axios from 'axios';

const baseUrl = "/evaluation"

// 분석내용 등록
export const createEvaluation = async (formData, memberId, productboardId) => {
  try {

    console.log('post에 전송될 memberId: ',memberId);
    console.log('post에 전송될 productboardId: ',productboardId);

      // formData에 추가 데이터 함께 보내기
      const payload = {
          ...formData, // formData에 있는 필드들
          member_id: memberId,
          productboard_id: productboardId
      };

      console.log('post에 전송될 payload: ',payload)

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


// 분석내용 조회 (상품id 로)
export const resultGetByProductId = (ProductId) => {
    console.log('리뷰 axios 넘어간 ProductId: ', ProductId);
    return axios.get(`${baseUrl}/product/${ProductId}`).then(res => {
        return res.data;
    }).catch(err => {
        console.error('Error fetching reviews:', err);
    });
}