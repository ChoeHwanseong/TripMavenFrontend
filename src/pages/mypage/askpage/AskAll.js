import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Pagination } from '@mui/material';
import { MypageContext } from '../../../context/MypageContext';
import { TemplateContext } from '../../../context/TemplateContext';

const AskAll = () => {
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { inquiries, totalPages } = useContext(MypageContext);
  const { memberInfo } = useContext(TemplateContext);
  const [inquery, setInquiry] = useState([]);

  useEffect(() => {
    setInquiry(inquiries)
    if (memberInfo.role != 'ADMIN') {
      const filteredInquiries = inquiries.filter((item) => item.member.id === memberInfo.id);
      setInquiry(filteredInquiries);
    }
  }, [inquiries, memberInfo.id]);


  const handleClick = (inquiry) => {
    navigate(`/askdetailsview/${inquiry.id}`);
  };

  const handleadminClick = (inquiry) => {
    navigate(`/mypage/admin/AskDetailsView/${inquiry.id}`);
  };


  const paginatedInquiries = inquery.slice((page - 1) * itemsPerPage, page * itemsPerPage);


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  

  console.log(memberInfo.role != 'ADMIN')

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 3 }}>
        <Typography
          style={{ fontWeight: 'bold', marginLeft: '-15px' }}
          variant="h4"
        >
          문의 내역
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#0066ff', '&:hover': { backgroundColor: '#0056b3' } }}
          onClick={() => navigate(`/askdetails/${memberInfo.id}`)}
        >
          문의 하기
        </Button>
      </Box>
      {memberInfo.role != 'ADMIN' ?
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>답변 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInquiries.map((myinquiry, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => handleClick(myinquiry)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#D0F0FF' } }}
              >
                <TableCell>{myinquiry.id}</TableCell>
                <TableCell>{myinquiry.title}</TableCell>
                <TableCell>{myinquiry.createdAt.split('T')[0]}</TableCell>
                <TableCell>{myinquiry.comments ? '완료' : '대기중'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      :
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor:'#f9f9f9'}}>
            <TableRow>
              <TableCell>작성번호</TableCell>
              <TableCell>아이디</TableCell>
              <TableCell>분류</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>답변 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInquiries.map((myinquiry, index) => (
              <TableRow
                key={index}
                hover
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleadminClick(myinquiry)}
                sx={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  backgroundColor: hoveredRow === index ? '#D0F0FF' : 'inherit',
                }}
              >
                <TableCell>{myinquiry.id}</TableCell>
                <TableCell>{myinquiry.member.name}</TableCell>
                <TableCell>{myinquiry.member.role ? '고객' : '가이드'}</TableCell>
                <TableCell>{myinquiry.title}</TableCell>
                <TableCell>{myinquiry.createdAt.split('T')[0]}</TableCell>
                <TableCell>{myinquiry.comments ? '완료' : '대기중'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
    </Box>
  );
};

export default AskAll;
