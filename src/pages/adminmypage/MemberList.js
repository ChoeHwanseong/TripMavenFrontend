import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils/memberData';
import GuideRegistration from '../registerguidepage/RegisterGuide';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: 0,
  width: 1200,
  height: '85vh',
  bgcolor: 'background.paper',
  border: '1px solid primary',
  borderRadius: '16px',
  boxShadow: 24,
};

const MemberList = () => {
  const [data, setData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      }
      catch (error) {console.error('에러났당', error);}
    };

    getData();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  }

  const handleClick = (user) => {
    navigate(`/mypageprofile/${user.id}`);
  };

  //모달관련 스테이트, 함수
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpen = (userId) => {
    if(localStorage.getItem("token")) {
      setOpen(true);
      setSelectedUserId(userId);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  return <>
    <Box sx={{ maxWidth: 1200, p: 3,mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          회원 목록
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src="../../../images/defaultimage.png" sx={{ width: 32, height: 32, mr: 2 }} />
          <Typography>관리자</Typography>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>회원 번호</TableCell>
              <TableCell>아이디</TableCell>
              <TableCell>분류</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>번호</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>등록일</TableCell>
              <TableCell>자격증 유/무</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user, index) => (
              <TableRow
                key={index}
                hover
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <TableCell align="center">{user.id}</TableCell>

                <TableCell onClick={() => handleClick(user)} 
                  sx={{cursor: 'pointer'}}
                >{user.name}</TableCell>

                <TableCell>{user.role=='USER'?'일반회원':user.role=='GUIDE'?'가이드':'관리자'}</TableCell>
                
                <TableCell onClick={() => handleClick(user)} 
                  sx={{cursor: 'pointer'}}
                >{user.email}</TableCell>

                <TableCell>{user.telNumber}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.createdAt.split('T')[0]}</TableCell> {/* 시간까지 나옴, 스플릿으로 앞부분만 뿌려주기 */}
                <TableCell align="center">{(user.guidelicense && user.role=='USER') ? (<Button variant="contained" sx={{ backgroundColor: '#0066ff' }} onClick={()=>handleOpen(user.id)}>인증 요청</Button>) : '무'}</TableCell> {/* 자격증 디폴트값 '무', false면 '유' */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Button>{'<'}</Button>
        <Typography sx={{ mx: 2 }}>1</Typography>
        <Button>{'>'}</Button>
      </Box>
    </Box>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          <GuideRegistration userId={selectedUserId}/>
      </Box>
    </Modal>
  </>
};

export default MemberList;
