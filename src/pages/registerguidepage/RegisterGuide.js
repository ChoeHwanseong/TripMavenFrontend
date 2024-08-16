import React, { useRef, useState } from 'react';
import styles from '../../styles/registerguidepage/RegisterGuide.module.css';
import { AiOutlinePaperClip } from 'react-icons/ai';

const RegisterGuidePage = () => {
  const [formData, setFormData] = useState({fileName: '', introduce: ''});
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === 'application/pdf' ||
        fileType.startsWith('image/')
      ) {
        setFormData(formData.fileName=file.name);
        
      } else {
        setFormData(formData.fileName='');
        alert('이미지 파일(jpg, jpeg, png, gif) 또는 PDF 파일만 업로드 가능합니다.');
      }
    }
  };

  const submitToGuide = () =>{
    const form = new FormData()
    form.append('id',window.localStorage.getItem("membersId"));
    form.append('guidelicense',formData.fileName) // 파일 업로드 어케 햇더라...; 
    form.append('introduce', )

  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>가이드 등록</h1>

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
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>자기소개</label>
        <textarea
          className={styles.textarea} name="introduce" value={formData.introduce}
          placeholder="자기소개를 입력해주세요 30자 이상 500자 이하"
        />
      </div>
      <div className={styles.buttonblock}>
        <button className={styles.button} onClick={submitToGuide}>등록</button>
      </div>
    </div>
  );
};

export default RegisterGuidePage;
