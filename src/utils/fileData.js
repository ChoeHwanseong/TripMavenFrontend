import axios from "axios";


const baseUrl = "/spring"

// 파일만 전송
export const filesPost = async (files) => {
  try {
    const formData = new FormData();

    // files 배열을 순회하며 각각의 파일을 FormData에 추가
    files.forEach((file) => {
      formData.append('files', file); // 'files' 키에 모든 파일 추가
    });

    console.log('FormData content:', Array.from(formData.entries())); // 확인용

    // FormData 전송
    const response = await axios.post(baseUrl + `/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // multipart/form-data로 전송
      },
    });

    console.log(response);

    console.log('filesPost의 res.data:', response.data);
    return response.data; // 서버에서 반환된 데이터 반환
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error; // 오류 발생 시 에러를 던져서 호출자에게 전달
  }
};


// // 파일 정보 넘기기
// export const filesPost = (filesData) => {
//   console.log('filesData: ',filesData);
//   console.log('filesData.id: ',filesData.id);
//    return axios.post(baseUrl+'/upload', filesData, {
//     headers: {
//       'Content-Type': 'multipart/form-data' // 파일 업로드 시 Content-Type 설정
//     }
//   }).then(res => {
//     console.log('filesPost의 res.data: ',res.data);
//     return res.data; // 서버에서 반환된 데이터 반환
//   }).catch(error => {
//     console.error('Error uploading files:', error);
//     throw error; // 오류 발생 시 에러를 던져서 호출자에게 전달
//   });

// }