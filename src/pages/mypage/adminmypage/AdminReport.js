import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Pagination } from '@mui/material';
import { reportAllget } from '../../../utils/reportData';
import ComplaintModal from '../../report/ComplaintModal';
import { TemplateContext } from '../../../context/TemplateContext';

const AdminReport = () => {
  const [inquiries, setInquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedReport, setSelectedReport] = useState([true, {}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { memberInfo } = useContext(TemplateContext);

  useEffect(() => {
    const getReportData = async () => {
      try {
        const fetchedData = await reportAllget();
        setInquiries(fetchedData);
      } catch (error) {
        console.error('에러났당', error);
      }
    };

    getReportData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (report) => {
    setSelectedReport([true, { ...report }]); // 클릭한 신고 데이터 저장
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedReport(null); // 선택된 데이터 초기화
  };

  // Pagination
  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = inquiries.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <Box sx={{ maxWidth: 1200, p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          신고 내역
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={memberInfo.profile} sx={{ width: 32, height: 32, mr: 2 }} />
          <Typography>관리자</Typography>
        </Box>
      </Box>

      <TableContainer component={Paper} >
        <Table>
          <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
            <TableRow>
              <TableCell>작성번호</TableCell>
              <TableCell>신고자</TableCell>
              <TableCell>신고 대상자</TableCell>
              <TableCell>신고 내용</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>신고대상자 활동 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((inquiry, index) => (
              <TableRow key={index} onClick={() => handleRowClick(inquiry)} style={{ cursor: 'pointer' }}>
                <TableCell>{inquiry.member.id}</TableCell>
                <TableCell>{inquiry.member.name}</TableCell>
                <TableCell>{inquiry.productBoard.member.name}</TableCell>
                <TableCell>
                  {inquiry.etc}

                </TableCell>
                <TableCell>{inquiry.createdAt.split('T')[0]}</TableCell>
                <TableCell onClick={(e) => {
                  e.stopPropagation();
                  console.log(inquiry.productBoard.member.id)
                  console.log(inquiry.productBoard.member)
                }}>
                  {inquiry.productBoard.member.isactive == "1" ? '비활성화하기' : '활성화하기'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(inquiries.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      {/* ComplaintModal 표시 */}
      {isModalOpen && (
        <ComplaintModal
          post={selectedReport[1].productBoard} // 선택된 신고 데이터 전달
          isReport={selectedReport}
          onClose={handleCloseModal}
          where={'report'}
        />
      )}
    </Box>
  );
};

export default AdminReport;
