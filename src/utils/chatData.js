import axios from "axios";

export const chattingRoomData = async (myId, yourId) => {
    try {
      const res = await axios.get(`/spring/chat/topic/${myId}/${yourId}`);
      return res.data;
    }
    catch (error) {
      console.error('에러났당', error);
      throw error; 
    }
  };


export const chattingListYourData = async (myId) => {
  try {
    const res = await axios.get(`/spring/chat/topic/${myId}`);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
}
}; 

export const submitMessage  = async (topic, userMessage , membersId) => {
  try {
      const res = await axios.post('/spring/chat/save', {topic, userMessage, membersId});  // 프록시 설정에 맞게 /spring 경로 유지
      return res.data;
  } catch (error) {
      console.error('에러났당', error);
      throw error;
  }
};
   


export const chattingListMyData = async (myId) => {
  try {
    const res = await axios.get(`/spring/chat/topic/my/${myId}`);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
}; 


export const getMessages = async (chattingRoomId) => {
  try {
    const res = await axios.get(`/spring/chat/history/${chattingRoomId}`);  // POST 요청으로 채팅방 ID를 전송
    return res.data;
  } catch (error) {
    console.error('에러났당', error);
    throw error;
  }
};