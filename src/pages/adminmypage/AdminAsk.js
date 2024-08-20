import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { csAllget } from '../../utils/csData';

const AdminAsk = () => {

  const [inquiry, setInquiries] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCSData = async () => {
      try {
        const fetchedData = await csAllget();
        setInquiries(fetchedData);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getCSData();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleClick = (inquiry) => {
    navigate(`/adminAskDetailsView/${inquiry.id}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          1:1 문의 내역
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src="../../../images/defaultimage.png" sx={{ width: 32, height: 32, mr: 2 }} />
          <Typography>관리자</Typography>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor:'#f9f9f9'}}>
            <TableRow>
              <TableCell>작성번호</TableCell>
              <TableCell>아이디</TableCell>
              <TableCell>분류</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>처리상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiry.map((inquiry, index) => (
              <TableRow
                key={index}
                hover
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(inquiry)}
                sx={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  backgroundColor: hoveredRow === index ? '#D0F0FF' : 'inherit',
                }}
              >
                <TableCell>{inquiry.id}</TableCell>
                <TableCell>{inquiry.member.name}</TableCell>
                <TableCell>{inquiry.member.role ? '고객' : '가이드'}</TableCell>
                <TableCell>{inquiry.title}</TableCell>
                <TableCell>{inquiry.createdAt.split('T')[0]}</TableCell>
                <TableCell>{inquiry.isActive ? '완료' : '미완료'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminAsk;
