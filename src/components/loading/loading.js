import style from './Loading.module.css';

//데이타 뿌려 주기전 로딩 화면 컴포넌트
export default function Loading(){

    return <>
        <div className="p-5 bg-warning text-white rounded">
            <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center">
                    <h1 className="display-5">
                        로딩 중
                    </h1>
                </div>
                <div className="d-flex align-items-center">
                    <div className={style.loading}>
                        <div className={style.item}></div>
                        <div className={style.item}></div>
                        <div className={style.item}></div>
                        <div className={style.item}></div>
                        <div className={style.item}></div>
                        <div className={style.item}></div>
                    </div>
                </div>
            </div>
        </div>
    
    </>
}