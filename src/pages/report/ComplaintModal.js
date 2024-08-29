import React, { useEffect, useState } from 'react';
import styles from '../../styles/report/ComplaintModal.module.css';
import { postGetById } from '../../utils/postData';
import { reportPost } from '../../utils/reportData';

const ComplaintModal = ({ onClose, onSubmit, id }) => {

  // 평가항목 state
  const [attitude, setAttitude] = useState(null);
  const [information, setInformation] = useState(null);
  const [disgust, setDisgust] = useState(null);
  const [offensive, setOffensive] = useState(null);
  const [noShow, setNoShow] = useState(null);
  const [additionalComments, setAdditionalComments] = useState('');
  const [posts, setPosts] = useState(null);

  const membersId = localStorage.getItem('membersId');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await postGetById(id);
        console.log('postData: ',postData);
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleReasonChange = (event) => {
    const { value } = event.target;
    switch (value) {
      case '불친절한 태도':
        setAttitude((prev) => (prev === null ? value : null));
        break;
      case '부정확한 정보':
        setInformation((prev) => (prev === null ? value : null));
        break;
      case '혐오 발언':
        setDisgust((prev) => (prev === null ? value : null));
        break;
      case '공격적인 언어 사용':
        setOffensive((prev) => (prev === null ? value : null));
        break;
      case '예약 불이행':
        setNoShow((prev) => (prev === null ? value : null));
        break;
      default:
        break;
    }
  };

  const handleCommentsChange = (event) => {
    setAdditionalComments(event.target.value);
  };

  // 신고하기
  const handleSubmit = async () => {
    const confirmed = window.confirm('정말 신고하시겠습니까?');
    if (confirmed) {
      // Using the value for selected reasons, null for unselected
      const complaintData = {
        member_id: membersId,
        productboard_id: id, // Use complaintId here
        attitude: attitude,
        information: information,
        disgust: disgust,
        offensive: offensive,
        noShow: noShow,
        comments: additionalComments,
      };

      console.log('complaintData: ', complaintData);

      await reportPost(complaintData);

      window.alert('신고가 완료되었습니다.');
      onClose();
    } else {
      onClose();
    }
  };

  if (!posts || !posts.member) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Complaint</h2>
        <p className={styles.subtitle}>
          <strong>{posts.member.name}</strong> 님을 신고하시겠습니까?
        </p>
        <div className={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              name="reason"
              value="불친절한 태도"
              onChange={handleReasonChange}
              checked={attitude !== null}
            />
            불친절한 태도
          </label>
          <label>
            <input
              type="checkbox"
              name="reason"
              value="부정확한 정보"
              onChange={handleReasonChange}
              checked={information !== null}
            />
            부정확한 정보
          </label>
          <label>
            <input
              type="checkbox"
              name="reason"
              value="혐오 발언"
              onChange={handleReasonChange}
              checked={disgust !== null}
            />
            혐오 발언
          </label>
          <label>
            <input
              type="checkbox"
              name="reason"
              value="공격적인 언어 사용"
              onChange={handleReasonChange}
              checked={offensive !== null}
            />
            공격적인 언어 사용
          </label>
          <label>
            <input
              type="checkbox"
              name="reason"
              value="예약 불이행"
              onChange={handleReasonChange}
              checked={noShow !== null}
            />
            예약 불이행
          </label>
        </div>
        <textarea
          className={styles.comments}
          placeholder="추가 의견을 입력하세요"
          value={additionalComments}
          onChange={handleCommentsChange}
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          신고하기
        </button>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ComplaintModal;
