import Loading from "./loading";

export default function Modal(){
    const modal={
        display:'block',
        position: 'fixed',
        top: 0,left:0,
        zIndex: 1060,
        width: '100%',
        height: '100%',
        backgroundColor: '#80808080'};

    return <>
        <div className="modal fade show" tabIndex="-1" style={modal} >
            <div className="modal-dialog modal-lg modal-dialog-centered\">
                <div className="modal-content">                
                    <div className="modal-body">
                        <Loading/>
                    </div>
                </div>
            </div>
        </div>
    </>
}