

export default function Login(){

   
    return <>
        <div className="p-5 bg-warning text-white rounded">
            <h1>
                로그인
            </h1>
        </div>
        <form>
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-3">
                    <input  type="text" className="form-control" placeholder="아이디를 입력하세요" name="username"/>
                </div>
                <div className="col-3">
                    <input  type="password" className="form-control" placeholder="비밀번호를 입력하세요" name="password"/>
                </div>
                <div className="col-auto">
                    <button className="btn btn-danger" >로그인</button>
                </div>
            </div>
        </form>
    </>
}