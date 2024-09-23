import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/guidemypage/guidemypageaiservice/AIService.module.css';
import ScoreCircle from '../ScoreCircle';
import { useNavigate } from 'react-router-dom';
import ScoreChart from '../ScoreChart';
import { AlignJustify } from 'lucide-react';
import { resultGetByMemberId } from '../../../../utils/AiData';

const AIService = () => {

    const navigate = useNavigate();
    const memberId = localStorage.getItem('membersId');
    const [results,setResults] = useState([]);

    const handleClick = () => {
        navigate('/aipage'); // AIService 페이지로 이동
    };

 
    useEffect(()=>{

        const getResult = async () =>{
            const result = await resultGetByMemberId(6);
            console.log('회원id에따른 평가 컬럼들: ',result);
            setResults(result);
        };

        getResult();

    },[memberId]);

    const avgScore = () => {
        if (results.length > 0) {
            const totalScore = results.reduce((sum, result) => sum + result.score, 0);
            const averageScore = totalScore / results.length;
            return averageScore;
        }
        return 0;
    };
    

    return (
        <div className={styles.aiServices}>
            <h2 className={styles.aiai}>ai 서비스</h2>
            <div className={styles.scoreContainer}>
                <ScoreChart/>
                    
                    <ScoreCircle score={avgScore()} />
                </div>

                <button className={styles.button} onClick={handleClick}>AI 교육 들으러가기</button>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>검사번호</th>
                            <th>분류</th>
                            <th>AI 평가 완료된 게시글</th>
                            <th>작성일</th>
                            <th>평가 점수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(result => (
                            <tr key={result.id} onClick={()=>navigate(`/resultFinalPage/${result.productBoard.id}`)}>
                                <td>{result.id}</td>
                                <td>{result.brow? '실전테스트' : '모의테스트'}</td>
                                <td>{result.productBoard.title}</td>
                                <td>{result.createdAt.split('T')[0]}</td>
                                <td>{result.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button}>선택삭제</button>
                <button className={styles.button}>모의 테스트 결과 목록</button>
                <button className={styles.button}>실전 테스트 결과 목록</button>
            </div>
        </div>
    );
};

export default AIService;