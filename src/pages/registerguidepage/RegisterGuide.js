import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/registerguidepage/RegisterGuide.module.css';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { postPost } from '../../utils/postData';
import { filesPost } from '../../utils/fileData';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { ocr } from '../../utils/PythonServerAPI';
import LinearProgress from '@mui/material/LinearProgress';

const RegisterGuidePage = () => {
  const [formData, setFormData] = useState({ fileName: '', introduce: '' });
  const [selectedFile, setSelectedFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [loading, setLoading] = useState(false); //로딩 스테이트
  const [ocrResult, setOcrResult] = useState({});
  

  const handleFileChange_ = async (event) => {
    const files = Array.from(event.target.files);
    setSelectedFile(files);

    // 미리보기 URL 설정
    const filePreview = files.map((file) => {
      return {
        name: file.name,
        url: URL.createObjectURL(file),
      };
    });
    setPreviewUrl(filePreview);

    setLoading(true);
    const formData = new FormData();
    formData.append('image',files[0]);
    formData.append('ocrValue','ocr');
    try {
      const respData = await ocr(formData);
      if(respData.success == true){
        setOcrResult((prev)=>({...prev, name:respData.data.name, number:respData.data.number, subject:respData.data.subject}));
      }

    } catch (error) {
        console.error('Error uploading file:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 메모리 누수 방지: 컴포넌트 언마운트 시 URL 객체 해제
    return () => {
      previewUrl.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [previewUrl]);


  /*
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === 'application/pdf' ||
        fileType.startsWith('image/')
      ) {
        setFormData(formData.fileName = file.name);

      } else {
        setFormData(formData.fileName = '');
        alert('이미지 파일(jpg, jpeg, png, gif) 또는 PDF 파일만 업로드 가능합니다.');
      }
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, introduce: event.target.value })
  };
  */

  const submitToGuide = () => {
    const form = new FormData()
    form.append('id', window.localStorage.getItem("membersId"));
    form.append('guidelicense', formData.fileName) // 파일 업로드 어케 햇더라...; 
    form.append('introduce',)

  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>가이드 등록</h1>
      <div className={styles.contentFrame}>
        <Box sx={{ mt: 1, width:'50%'}}>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            style={{ display: 'none' }}  // Hide the file input
            onChange={handleFileChange_}
          />
          <label htmlFor="file-input">
            <Button
              variant="outlined"
              component="span"
              sx={{ mt: 1,border:'1px solid #0066ff', '&:hover': {color:'#ffffff', backgroundColor: '#0066ff' } }}
            >
              파일 찾기
            </Button>
          </label>

          {/* 선택된 파일명 표시 */}
          {selectedFile.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {selectedFile.map((file, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  미리보기: {file.name}
                </Typography>
              ))}
            </Box>
          )}

          {/* 이미지 미리보기 표시 */}
          {previewUrl.length > 0 && (
            <Box sx={{ mt: 2 , paddingLeft:0}}>
              {previewUrl.map((file, index) => (
                <img
                  key={index}
                  src={file.url}  
                  alt={`파일 미리보기 ${index + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '550px', objectFit: 'cover', marginBottom: '10px',border:'3px solid #f1f1f1' }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/*
        <div className={styles.fieldGroup}>
          <label className={styles.label}>자격증</label>
          <div className={styles.inputFile} onClick={handleFileClick}>
            <AiOutlinePaperClip style={{ marginRight: '10px' }} />
            <span>{formData.fileName || '파일을 넣어주세요'}</span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".jpg,.jpeg,.png,.gif,.pdf"
              onChange={handleFileChange}
            />
          </div>
          <div>

          </div>
        </div>
        */}

        <div className={styles.licenseInfoConfirm}>
          <Box sx={{ mt: 8 }}>
            <Typography variant="h7" gutterBottom sx={{fontWeight:'bold'}}>자격증 정보 확인</Typography>
            {loading ? (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
            ) : 
            (<>
              <TextField fullWidth label="자격증명" margin="normal"  defaultValue={!ocrResult?'not detected':ocrResult.subject==='default'?'not detected':ocrResult.subject}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField fullWidth label="성명" margin="normal" defaultValue={!ocrResult?'not detected':ocrResult.name==='default'?'not detected':ocrResult.name}/>
              <TextField fullWidth label="문서 확인 번호" margin="normal"  defaultValue={!ocrResult?'not detected':ocrResult.number==='default'?'not detected':ocrResult.number}/>
              <Box sx={{ display: 'flex', justifyContent: 'end', marginTop:'10px' }}>
                <Button variant="contained" sx={{ backgroundColor: '#0066ff' }} onClick={submitToGuide}>등록 요청</Button>
              </Box>
            </>)}
          </Box>
          
        </div>
      </div>

      {/*
      <div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>자기소개</label>
          <textarea
            className={styles.textarea} name="introduce" value={formData.introduce}
            placeholder="자기소개를 입력해주세요 30자 이상 500자 이하"
            onChange={handleChange}
          />
        </div>
        <div className={styles.buttonblock}>
          <button className={styles.button} onClick={submitToGuide}>등록</button>
        </div>
      </div>
       */}

    </div>

  );
};

export default RegisterGuidePage;
