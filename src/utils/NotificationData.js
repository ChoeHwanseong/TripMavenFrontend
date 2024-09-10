import axios from "axios";

export const postNotification = async (jsondata) => {
    try {
      const res = await axios.post('/spring/noti/', jsondata,
        {headers: {'Content-Type': 'application/json'}});
      return res.data;
    }
    catch (error) {
      console.error('에러났당', error);
      throw error; 
    }
};

export const getNotifications = async (myId) => {
    try {
      const res = await axios.get(`/spring/noti/${myId}`);
      return res.data;
    }
    catch (error) {
      console.error('에러났당', error);
      throw error; 
    }
};