import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { csGet } from '../../../utils/csData';

const AdminAskDetailsView = () => {

    const { id } = useParams();
    const [inquiry, setInquiry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getCSData = async () => {
            try {
                const fetchedData = await csGet(id);
                setInquiry(fetchedData);
            } catch (error) {
                console.error('에러났당', error);
            }
        };

        getCSData();
    }, [id]);

    if (!inquiry) {
        return <div>로딩중</div>; // 로딩 중 처리
    }

    return (
        <Box sx={{ maxWidth: 1000, p: 3, mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    문의 내역
                    <Typography variant="subtitle1" component="span" sx={{ ml: 2 }}>
                        상세보기
                    </Typography>
                </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ width: '20%', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                                작성번호
                            </TableCell>
                            <TableCell sx={{ width: '30%', textAlign: 'center' }}>{inquiry.id}</TableCell>
                            <TableCell sx={{width: '20%', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                                분류
                            </TableCell>
                            <TableCell sx={{ width: '30%', textAlign: 'center' }}>{inquiry.member.role ? '고객' : '가이드'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                                아이디
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{inquiry.member.name}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                                작성일
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{inquiry.createdAt.split('T')[0]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                                제목
                            </TableCell>
                            <TableCell colSpan={3} sx={{ textAlign: 'center' }}>{inquiry.title}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                                내용
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} sx={{textAlign: 'center' }}>{inquiry.content}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f9f9f9', color: '#000' }}>
                                답변
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: 'center' }}>{inquiry.comments}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="contained" sx={{backgroundColor:'#0066ff','&:hover' : {backgroundColor:'#0056b3'}}}  onClick={() => navigate(`/adminAnswer/${inquiry.id}`)}>
                    답변 등록 및 수정하기
                </Button>
                <Button variant="contained" sx={{backgroundColor:'#0066ff','&:hover' : {backgroundColor:'#0056b3'}}} onClick={() => navigate('/adminask')}>
                    목록
                </Button>
            </Box>
        </Box>
    );
};

export default AdminAskDetailsView;
