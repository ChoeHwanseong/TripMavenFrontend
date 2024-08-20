import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { csAllget } from '../../utils/csData';

const AskAll = () => {
  const [inquiry, setInquiries] = useState([]);
  const membersId = localStorage.getItem('membersId');
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

  const handleClick = (inquiry) => {
    navigate(`/askdetailsview/${inquiry.id}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m:3 }}>
        <Typography 
          style={{fontWeight:'bold'}}
          variant="h4">문의 내역</Typography>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: '#0066ff', '&:hover': { backgroundColor: '#0056b3' } }} 
          onClick={() => navigate(`/askdetails/${membersId}`)}
        >
          문의 하기
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor:'#f9f9f9'}}>
            <TableRow>
              <TableCell>번호</TableCell>
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
                onClick={() => handleClick(inquiry)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#D0F0FF' } }}
              >
                <TableCell>{inquiry.id}</TableCell>
                <TableCell>{inquiry.title}</TableCell>
                <TableCell>{inquiry.createdAt.split('T')[0]}</TableCell>
                <TableCell>{inquiry.isactive ? '처리완료' : '처리중'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button disabled>{'<'}</Button>
        <Typography sx={{ mx: 2 }}>1</Typography>
        <Button>{'>'}</Button>
      </Box>
    </Box>
  );
};

export default AskAll;
