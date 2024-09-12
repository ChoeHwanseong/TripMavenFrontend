import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button } from '@mui/material';
import styles from '../../styles/home/GuideRankging.module.css'; // Import the CSS module

const GuideRanking = () => {
    const [ranking, setRanking] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const rowsPerPage = 5; // Limit of rows per page

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await axios.get('/api/guide-ranking');
                setRanking(response.data);
            } catch (error) {
                console.error('Error fetching guide ranking:', error);
            }
        };

        fetchRanking();
    }, []);

    // Get the current page's data by slicing the ranking array
    const currentRanking = ranking.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Calculate total number of pages
    const totalPages = Math.ceil(ranking.length / rowsPerPage);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Box className={styles.leaderboardContainer}>
            <Paper className={styles.leaderboardTitle} elevation={3}>
                <Typography variant="h4" align="center" className={styles.titleText}>
                    LEADERBOARD
                </Typography>
            </Paper>
            <Box className={styles.leaderboardContent}>
                {currentRanking.map((guide, index) => {
                    // Calculate global index based on current page
                    const globalIndex = (currentPage - 1) * rowsPerPage + index;

                    return (
                        <Paper
                            key={guide.id}
                            className={`${styles.leaderboardItem} ${
                                globalIndex === 0 ? styles.firstPlaceItem : ''
                            }`}
                            elevation={2}
                        >
                            <Box className={styles.rankingNumber}>
                                {globalIndex + 1}
                            </Box>
                            <Box className={styles.rankingInfo}>
                                <Typography variant="h6">
                                    {guide.name}
                                    {globalIndex === 0 && (
                                        <img
                                            src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                                            alt="Gold Medal"
                                            className={styles.goldMedal}
                                        />
                                    )}
                                </Typography>
                                <Typography variant="body2">
                                    게시물 수: {guide.postCount}
                                </Typography>
                            </Box>
                        </Paper>
                    );
                })}
            </Box>
            <Box className={styles.paginationButtons}>
                <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                >
                    &lt;Prev
                </Button>
                <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                >
                    Next&gt;
                </Button>
            </Box>
        </Box>
    );
};

export default GuideRanking;
