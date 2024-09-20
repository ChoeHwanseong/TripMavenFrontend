import styles from '../../styles/guidemypage/GuideAsk.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { csGet } from '../../utils/csData';
import Loading from '../../components/LoadingPage';

const GuideAskUpdate = () => {

    const { id } = useParams();
    const [inquiry, setInquiry] = useState(null);
    const navigate = useNavigate();

    

    useEffect(() => {
      const getinquiryData = async () => {
         try {
           const fetchedData = await csGet(id); 
           console.log(fetchedData);
          setInquiry(fetchedData);

        } catch (error) {
           console.error('에러났당', error);
        }
      };
      
      getinquiryData();
    }, [id]); 

    if (!inquiry) {
        return <Loading />;  {/* 이코드 지우면 inquery.id 가져올때 오류발생할수도있음 */}
    }

    // 제목과 내용을 업데이트하는 핸들러 함수
    const handleTitleChange = (e) => {
      setInquiry({ ...inquiry, title: e.target.value });
    };

    const handleContentChange = (e) => {
        setInquiry({ ...inquiry, content: e.target.value });
    };


    // 수정 버튼 클릭 핸들러
    /*
     const handleUpdateClick = async () => {
       try {
          // 서버로 수정된 데이터를 보내는 요청
           console.log('제목',inquiry.title);
         console.log('내용',inquiry.content);
          await csfetchUpdateData(id, inquiry);
          
          // 수정이 완료되면 상세보기 페이지로 이동
           navigate('/guideaskdetails');
     } catch (error) {
           console.error('수정 중 에러났당', error);
      }
   };
*/



    return <>
        <div className={styles.container}>
            <h2 className={styles.title}>문의 하기(수정)</h2>

            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>제목을 입력하세요</label>
                    <input 
                        type="text" 
                        id="title"
                        className={styles.input}
                        onChange={handleTitleChange}
                        value={inquiry.title}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="content" className={styles.label}>내용을 입력하세요</label>
                    <textarea 
                        id="content" 
                        className={styles.textarea}
                        onChange={handleContentChange}
                        value={inquiry.content}/>
                </div>

                <button
                  className={styles.submitButton}
                  onClick={()=>{navigate('/guideaskdetails');}}>수정 하기
                </button>
            </div>
        </div>
    </>
};

export default GuideAskUpdate;
