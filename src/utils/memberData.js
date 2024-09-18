import axios from 'axios';

//멤버 가져오기
export const fetchData = async () => {
  try {
    const res = await axios.get('/spring/members');
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error;
  }
};

//아이디로 멤버 가져오기
export const fetchedData = async (id) => {
  try {
    //console.log(id) //디버그용
    //console.log('res: ',res.data) //디버그용
    const res = await axios.get(`/spring/members/id/${id}`);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error;
  }
};


//이메일로 멤버 가져오기
export const findMemberbyEmail = async (email) => {
  try {
    const res = await axios.get(`/spring/members/email/${email}`);
    return res.data;
  }
  catch (error) {
    console.error('에러났당', error);
    throw error;
  }
};

//회원가입
//await axios 꼭 붙이기
export const SignUp = async (form) => {
  await axios.post('/spring/signup', form)
    .then(response => {
      alert('가입 완료! 가입한 계정으로 로그인해주세요.');
      window.location.href = "/login";
    })
    .catch(error => {
      // 오류가 발생했을 때의 처리
      if (error.code === 'ERR_BAD_REQUEST') alert('중복된 아이디입니다.');


    });
  //URL package.json에  "proxy": "http://localhost:9099" 추가후  뒤에 가져올 주소만 적어주기 
};

//폼로그인!!@!@!@!@!@!@
export const FormLogin = async (form) => {
  const response = await axios.post('http://localhost:9099/login', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  const token = response.headers['authorization'] || response.headers['Authorization'];
  if (token) {
    const pureToken = token.split(' ')[1];
    window.localStorage.setItem("token", pureToken);
    let role = "USER"
    if (response.data.isAdmin) role = "ADMIN"
    else if (response.data.isGuide) role = "GUIDE"
    window.localStorage.setItem("role", role);
    window.localStorage.setItem("membersId", response.data.membersId);
    window.localStorage.setItem("refresh", response.data.refresh);
    window.localStorage.setItem("loginType", "local");
  }

  return response;
}

//로그아웃
export const logout = async () => {
  await axios.post('/spring/logout')
    .then(res => {
      return res
    })
    .catch(error => {
      // 오류가 발생했을 때의 처리
      if (error.code === 'ERR_BAD_REQUEST') alert('중복된 아이디입니다.');

    });
}

//가이드 등록.
export const toGuide = async (form) => {
  await axios.post('http://localhost:9099/toGuide', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      window.localStorage.setItem("role", res.data.role);
      console.log(res.data.role);
    })
    .catch(error => {
      console.error('에러났당', error);
      throw error;
    })

}

export const updateProfile = async (id, updatedData) => {
  try {
    console.log(updatedData);
    const res = await axios.put(`/spring/members/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error('프로필 업데이트 중 에러났당', error);
    throw error;
  }
};


// 회원 탈퇴
export const deleteProfile = async (id) => {
  try {
    console.log('id', id);
    const res = await axios.put(`/spring/members/delete/${id}`);
    logout();
    localStorage.clear();
    return res.data;
  } catch (error) {
    console.error('회원 탈퇴 중 에러났당', error);
    throw error;
  }
};


