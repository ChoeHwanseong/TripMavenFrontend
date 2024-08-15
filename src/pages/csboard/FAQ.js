import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

export default function CustomizedAccordions() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
    <Box sx={{ width: '100%', maxWidth: '1000px', margin: 'auto' , marginTop: 25}}>
      <Typography variant="h3">
      <div style={{color: 'black', marginBottom: 15, marginTop:'-30px' ,paddingLeft: '20px'}}>FAQ</div>
      </Typography>
      <Box sx={{ width: '100%' }}>
        <AppBar position="static" color="default" elevation={1} sx={{ width: '100%' , maxWidth: '950px',margin: 'auto' ,border: 'solid' , borderWidth :'0.5px' , borderColor : 'lightgray' ,marginBottom : 0}}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#003CFF',
              },
              '& .Mui-selected': {
                color: '#0066FF', 
              },
            }}
          >
            
            {faqContent.map((tab, index) => (
              <Tab key={index} label={tab.tabTitle} {...a11yProps(index)} sx={{ fontSize: '17px' }}/>
            ))}
          </Tabs>
        </AppBar>
        <SwipeableViews
  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  index={value}
  onChangeIndex={handleChangeIndex}
  style={{ width: '100%' }}
  animateTransitions={false} // 애니메이션 비활성화
>
  {faqContent.map((tab, index) => (
    <TabPanel value={value} index={index} dir={theme.direction} key={index}>
      {tab.questions.map((question, qIndex) => (
        <Accordion
          expanded={expanded === `panel${qIndex}`}
          onChange={handleAccordionChange(`panel${qIndex}`)}
          key={qIndex}
        >
          <AccordionSummary
            aria-controls={`panel${qIndex}d-content`}
            id={`panel${qIndex}d-header`}
          >
            <Typography>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{tab.answers[qIndex]}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </TabPanel>
  ))}
</SwipeableViews>
      </Box>
    </Box>
  );
}
