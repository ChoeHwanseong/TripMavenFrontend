import React from 'react';
import styles from '../styles/components/Loading.module.css';
import { Box } from 'lucide-react';
import { CircularProgress } from '@mui/material';

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <Box>
                <CircularProgress />
            </Box>
        {/*
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>로딩중</p>
        */}
        </div>
    );
};

export default Loading;