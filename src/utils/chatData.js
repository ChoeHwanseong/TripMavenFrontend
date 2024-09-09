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


export const ChattingListMyData = async (myId) => {
  try {
    const res = await axios.get(`/spring/chat/topic/my/${myId}`);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error; 
  }
}; 