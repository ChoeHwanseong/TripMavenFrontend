import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { reportfetchAllData } from '../../utils/reportfetchData';

const AdminReport = () => {
  const [inquiry, setInquiries] = useState([]);

  useEffect(() => {
    const getReportData = async () => {
      try {
        const fetchedData = await reportfetchAllData();
        setInquiries(fetchedData);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getReportData();
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          신고 내역
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src="../../../images/defaultimage.png" sx={{ width: 32, height: 32, mr: 2 }} />
          <Typography>관리자</Typography>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>작성번호</TableCell>
              <TableCell>신고자</TableCell>
              <TableCell>신고 대상자</TableCell>
              <TableCell>신고 내용</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>처리상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiry.map((inquiry, index) => (
              <TableRow key={index}>
                <TableCell>{inquiry.member.id}</TableCell>
                <TableCell>{inquiry.member.name}</TableCell>
                <TableCell>{inquiry.productBoard.title}</TableCell>
                <TableCell>
                  {inquiry.attitude && '불친절한 태도, '}
                  {inquiry.information && '부정확한 정보, '}
                  {inquiry.disgust && '혐오발언, '}
                  {inquiry.offensive && '공격적인 언어, '}
                  {inquiry.noShow && '예약 불이행'}
                </TableCell>
                <TableCell>{inquiry.createdAt.split('T')[0]}</TableCell>
                <TableCell>{inquiry.isactive ? '처리중' : '처리 완료'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminReport;
