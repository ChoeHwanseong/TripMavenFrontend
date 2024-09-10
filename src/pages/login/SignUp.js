import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/login/SignUp.module.css';
import { findMemberbyEmail, SignUp } from '../../utils/memberData';
import { useLocation } from 'react-router-dom';
import useValid from './useValid';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Check from '@mui/icons-material/Check';

const steps = ['기본 정보', '추가 정보', '가입 정보'];
const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

// Custom Stepper styles
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg, rgb(135,206,250) 0%, rgb(70,130,180) 50%, rgb(0,191,255) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg, rgb(135,206,250) 0%, rgb(70,130,180) 50%, rgb(0,191,255) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
        width: '250px',
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage: 'linear-gradient( 136deg, rgb(135,206,250) 0%, rgb(70,130,180) 50%, rgb(0,191,255) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage: 'linear-gradient( 136deg, rgb(135,206,250) 0%, rgb(70,130,180) 50%, rgb(0,191,255) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <Check />,
        2: <Check />,
        3: <Check />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const Signup = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const [activeStep, setActiveStep] = useState(0);
    const [addressObj, setAddressObj] = useState({ areaAddress: '', townAddress: '', detailAddress: '' });

    // Form validations
    const email = useValid('', (value) =>
        !value ? '이메일을 입력하세요' : !/\S+@\S+\.\S+/.test(value) ? '유효한 이메일 주소를 입력하세요' : ''
    );
    const name = useValid('', (value) => !value ? '이름을 입력하세요' : '');
    const password = useValid('', (value) =>
        !value ? '비밀번호를 입력하세요' : value.length < 6 ? '비밀번호는 최소 6자 이상이어야 합니다' : ''
    );
    const passwordConfirm = useValid('', (value) =>
        !value ? '비밀번호 확인을 입력하세요' : value !== password.value ? '비밀번호가 일치하지 않습니다' : ''
    );
    const region = useValid('', (value) => !value ? '관심 지역을 선택하세요' : '');
    const gender = useValid('', (value) => !value ? '성별을 선택하세요' : '');
    const birthday = useValid('', (value) => !value ? '생년월일을 입력하세요' : '');
    const address = useValid(addressObj, (value) =>
        !value.areaAddress || !value.townAddress ? '주소를 입력하세요' : ''
    );
    const detailAddressRef = useRef(null); // 상세주소 입력 필드에 대한 참조 생성
    const handleNext = () => {
        let isValid = true;

        if (activeStep == 0) {
            if (email.value == '') {
                email.setError('이메일을 입력하세요');
                isValid = false;
            }
            if (name.value == '') {
                name.setError('이름을 입력하세요');
                isValid = false;
            }
            if (password.value == '') {
                password.setError('비밀번호를 입력하세요');
                isValid = false;
            }
            if (passwordConfirm.value == '') {
                passwordConfirm.setError('비밀번호 확인을 입력하세요');
                isValid = false;
            }
            if (passwordConfirm.value != password.value) {
                passwordConfirm.setError('비밀번호가 일치하지 않아요!');
                isValid = false;
            }
        }
        if (activeStep == 1) {
            if (region.value == "") {
                region.setError('관심 지역을 선택하세요');
                isValid = false;
            }
            if (gender.value == "") {
                gender.setError('성별을 선택하세요');
                isValid = false;
            }
            if (birthday.value == '') {
                birthday.setError('생년월일을 입력하세요');
                isValid = false;
            }
        }
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if(activeStep ==2 ) setAddressObj(prev => ({ ...prev, detailAddress: detailAddressRef.current.value }));
        }
        else alert('항목을 모두 입력해주세요.');

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !email.error &&
            !name.error &&
            !password.error &&
            !passwordConfirm.error &&
            !region.error &&
            !gender.error &&
            !birthday.error &&
            !address.error
        ) {
            const form = {
                email: email.value,
                name: name.value,
                password: password.value,
                interCity: region.value,
                gender: gender.value,
                birthday: birthday.value,
                address: `${addressObj.areaAddress} ${addressObj.townAddress} ${addressObj.detailAddress}`,
                loginType: 'local'
            };
            SignUp(form)

        } else {
            alert('모든 필드를 올바르게 입력하세요.');
        }
    };

    useEffect(() => {
        const getEmail = query.get("email");
        const getData = async () => {
            const newMember = await findMemberbyEmail(getEmail);
            if (newMember) {
                alert('회원가입을 진행해주세요.');
                document.querySelector('#email').setAttribute('readonly', true);
            }
            switch (newMember.loginType) {
                case 'google': //구글에서 회원가입했다면
                    email.setValue(newMember.email);
                    name.setValue(newMember.name);
                    password.setValue(newMember.password);
                    passwordConfirm.setValue(newMember.password);
                    break;
                case 'naver': //네이버에서 햇다면
                    email.setValue(newMember.email);
                    name.setValue(newMember.name);
                    password.setValue(newMember.password);
                    passwordConfirm.setValue(newMember.password);
                    gender.setValue(newMember.gender);
                    birthday.setValue(newMember.birthday);
                    break;
                default: //캌캌오
                    email.setValue(newMember.email);
                    name.setValue(newMember.name);
                    password.setValue(newMember.password);
                    passwordConfirm.setValue(newMember.password);
                    gender.setValue(newMember.gender);



            }
        }
        if (getEmail) getData();
    }, []);

    const DaumPost = () => {
        const open = useDaumPostcodePopup(postcodeScriptUrl);
        

        const handleComplete = (data) => {
            let fullAddress = data.address;
            let extraAddress = '';
            let localAddress = data.sido + ' ' + data.sigungu;
            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += (extraAddress !== '' ? `, ${extraAddress}` : extraAddress);
                }
                fullAddress = fullAddress.replace(localAddress, '');
                setAddressObj((prev) => ({
                    ...prev,
                    areaAddress: localAddress,
                    townAddress: fullAddress + (extraAddress !== '' ? ` (${extraAddress})` : '')
                }));
            }
        };

        const handleClick = () => {
            open({ onComplete: handleComplete });
        };    

        return (
            <>
                <div className={styles.inputWithButton}>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={`${addressObj.areaAddress} ${addressObj.townAddress}`}
                        readOnly
                        placeholder="주소를 입력하세요"
                    />
                    <button type="button" onClick={handleClick} className={styles.searchButton2}>주소찾기</button>
                </div>
                <input
                    type="text"
                    id="detailAddress"
                    name="detailAddress"
                    onBlur={()=>{if(detailAddressRef.current.value!='')setAddressObj(prev => ({ ...prev, detailAddress: detailAddressRef.current.value }))}}                  
                    placeholder="상세주소를 입력하세요"
                    className={styles.detailAddressInput}
                    ref={detailAddressRef} // 참조 연결
                />
            </>
        );
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email.value}
                                onChange={email.onChange}
                                placeholder="이메일을 입력하세요"
                            />
                            {email.error && <p className={styles.error}>{email.error}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">이름</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name.value}
                                onChange={name.onChange}
                                placeholder="이름을 입력하세요"
                            />
                            {name.error && <p className={styles.error}>{name.error}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password.value}
                                onChange={password.onChange}
                                placeholder="비밀번호를 입력하세요"
                            />
                            {password.error && <p className={styles.error}>{password.error}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">비밀번호 확인</label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                value={passwordConfirm.value}
                                onChange={passwordConfirm.onChange}
                                placeholder="비밀번호 확인"
                            />
                            {passwordConfirm.error && <p className={styles.error}>{passwordConfirm.error}</p>}
                        </div>
                    </>
                );
            case 1:
                return (
                    <>
                        <div className={styles.inputGroup}>
                            <label htmlFor="region">관심 지역</label>
                            <select
                                id="region"
                                name="region"
                                value={region.value}
                                onChange={region.onChange}
                                className={styles.selectInput}
                            >
                                <option value="">관심 지역을 선택하세요</option>
                                <option value="seoul">서울</option>
                                <option value="busan">부산</option>
                                <option value="incheon">인천</option>
                                <option value="daegu">대구</option>
                                <option value="daejeon">대전</option>
                                <option value="gwangju">광주</option>
                                <option value="ulsan">울산</option>
                                <option value="sejong">세종</option>
                                <option value="gyeonggi">경기도</option>
                                <option value="gangwon">강원특별자치도</option>
                                <option value="chungbuk">충청북도</option>
                                <option value="chungnam">충청남도</option>
                                <option value="jeonbuk">전북특별자치도</option>
                                <option value="jeonnam">전라남도</option>
                                <option value="gyeongbuk">경상북도</option>
                                <option value="gyeongnam">경상남도</option>
                                <option value="jeju">제주특별자치도</option>
                            </select>
                            {region.error && <p className={styles.error}>{region.error}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="gender">성별</label>
                            <select
                                id="gender"
                                name="gender"
                                value={gender.value}
                                onChange={gender.onChange}
                                className={styles.selectInput}
                            >
                                <option value="">성별을 선택하세요</option>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                            </select>
                            {gender.error && <p className={styles.error}>{gender.error}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="birthdate">생년월일</label>
                            <input
                                type="date"
                                id="birthday"
                                name="birthday"
                                value={birthday.value}
                                onChange={birthday.onChange}
                                className={styles.dateInput}
                            />
                            {birthday.error && <p className={styles.error}>{birthday.error}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="address">주소</label>
                            <DaumPost />
                            {address.error && <p className={styles.error}>{address.error}</p>}
                        </div>
                    </>
                );
            case 2:
                return (
                    <div className={styles.summaryStep}>
                        <h2>회원가입 정보 확인</h2>
                        <p>이메일: {email.value}</p>
                        <p>이름: {name.value}</p>
                        <p>관심 지역: {region.value}</p>
                        <p>성별: {gender.value}</p>
                        <p>생년월일: {birthday.value}</p>
                        <p>주소: {`${addressObj.areaAddress} ${addressObj.townAddress} ${addressObj.detailAddress}`}</p>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}
                sx={{ width: '80%', margin: 'auto' }}>
                {steps.map((label) => (
                    <Step key={label} sx={{ mx: 2 }}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <form className={styles.signupForm} onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                {renderStepContent(activeStep)}
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={handleBack}
                        className={styles.backButton}
                        disabled={activeStep === 0}
                    >
                        이전
                    </button>
                    {activeStep === steps.length - 1 ? (
                        <button type="button" className={styles.signupButton} onClick={handleSubmit}>
                            가입
                        </button>
                    ) : (
                        <button type="button" onClick={handleNext} className={styles.nextButton}>
                            다음
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Signup;
