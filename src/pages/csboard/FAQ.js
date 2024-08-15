import React, { useState } from 'react';
import styles from '../../styles/csboard/FAQ.module.css';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const faqContent = [
    {
      tabTitle: '서비스 소개',
      questions: [
        '서비스 소개 관련 질문 1',
        '서비스 소개 관련 질문 2',
        '서비스 소개 관련 질문 3',
        '서비스 소개 관련 질문 4',
        '서비스 소개 관련 질문 5',
      ],
      answers: [
        '여기에 서비스 소개 관련 질문 1에 대한 답변이 들어갑니다.',
        '여기에 서비스 소개 관련 질문 2에 대한 답변이 들어갑니다.',
        '여기에 서비스 소개 관련 질문 3에 대한 답변이 들어갑니다.',
        '여기에 서비스 소개 관련 질문 4에 대한 답변이 들어갑니다.',
        '여기에 서비스 소개 관련 질문 5에 대한 답변이 들어갑니다.',
      ],
    },
    {
      tabTitle: '이용 방법',
      questions: [
        '이용 방법 관련 질문 1',
        '이용 방법 관련 질문 2',
        '이용 방법 관련 질문 3',
        '이용 방법 관련 질문 4',
        '이용 방법 관련 질문 5',
      ],
      answers: [
        '여기에 이용 방법 관련 질문 1에 대한 답변이 들어갑니다.',
        '여기에 이용 방법 관련 질문 2에 대한 답변이 들어갑니다.',
        '여기에 이용 방법 관련 질문 3에 대한 답변이 들어갑니다.',
        '여기에 이용 방법 관련 질문 4에 대한 답변이 들어갑니다.',
        '여기에 이용 방법 관련 질문 5에 대한 답변이 들어갑니다.',
      ],
    },
    {
      tabTitle: '결제',
      questions: [
        '결제 관련 질문 1',
        '결제 관련 질문 2',
        '결제 관련 질문 3',
        '결제 관련 질문 4',
        '결제 관련 질문 5',
      ],
      answers: [
        '여기에 결제 관련 질문 1에 대한 답변이 들어갑니다.',
        '여기에 결제 관련 질문 2에 대한 답변이 들어갑니다.',
        '여기에 결제 관련 질문 3에 대한 답변이 들어갑니다.',
        '여기에 결제 관련 질문 4에 대한 답변이 들어갑니다.',
        '여기에 결제 관련 질문 5에 대한 답변이 들어갑니다.',
      ],
    },
    {
      tabTitle: '취소/환불',
      questions: [
        '취소/환불 관련 질문 1',
        '취소/환불 관련 질문 2',
        '취소/환불 관련 질문 3',
        '취소/환불 관련 질문 4',
        '취소/환불 관련 질문 5',
      ],
      answers: [
        '여기에 취소/환불 관련 질문 1에 대한 답변이 들어갑니다.',
        '여기에 취소/환불 관련 질문 2에 대한 답변이 들어갑니다.',
        '여기에 취소/환불 관련 질문 3에 대한 답변이 들어갑니다.',
        '여기에 취소/환불 관련 질문 4에 대한 답변이 들어갑니다.',
        '여기에 취소/환불 관련 질문 5에 대한 답변이 들어갑니다.',
      ],
    },
    {
      tabTitle: '가이드 등록',
      questions: [
        '가이드 등록 관련 질문 1',
        '가이드 등록 관련 질문 2',
        '가이드 등록 관련 질문 3',
        '가이드 등록 관련 질문 4',
        '가이드 등록 관련 질문 5',
      ],
      answers: [
        '여기에 가이드 등록 관련 질문 1에 대한 답변이 들어갑니다.',
        '여기에 가이드 등록 관련 질문 2에 대한 답변이 들어갑니다.',
        '여기에 가이드 등록 관련 질문 3에 대한 답변이 들어갑니다.',
        '여기에 가이드 등록 관련 질문 4에 대한 답변이 들어갑니다.',
        '여기에 가이드 등록 관련 질문 5에 대한 답변이 들어갑니다.',
      ],
    },
  ];

  return (
    <div className={styles.faq}>
      <h1 className={styles.title}>FAQ</h1>
      <div className={styles.tabs}>
        {faqContent.map((tab, tabIndex) => (
          <button
            key={tabIndex}
            className={`${styles.tab} ${
              activeTab === tabIndex ? styles.active : ''
            }`}
            onClick={() => handleTabClick(tabIndex)}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>

      <div className={styles.questions}>
        {faqContent[activeTab].questions.map((question, index) => (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            key={index}
          >
            <AccordionSummary
              aria-controls={`panel${index}d-content`}
              id={`panel${index}d-header`}
            >
              <Typography>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faqContent[activeTab].answers[index]}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
