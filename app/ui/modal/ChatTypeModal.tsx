import React from "react";

const ChatTypeModal = () =>{
    return(
        <div className="modal-overlay items-center justify-center">
      <div
        className="bg-white py-4 px-5 rounded-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header align-items-center justify-content-center">
            <h4 className="text-black mt-2 ms-auto fw-bold">Choose Chat Type</h4>
            <button
        //   onClick={onClose}
          className="m-2 ms-auto text-dark fs-3 border-0 bg-transparent"
        >
          &times;
        </button>
        </div>
        <div className="modal-body mb-3 text-center align-items-center justify-content-center">
            <p className="fw-semibold">Select the type of chat you want to create.</p>
            <div className="d-flex mt-4 align-items-center justify-content-center">
                <button className="btn fw-bold shadow-sm me-5 py-2 px-4 fs-5" style={{backgroundColor:"#FFCEB4"}}>Private</button>
                <button className="btn fw-bold shadow-sm py-2 px-4 fs-5" style={{backgroundColor:"#E7C5F9"}}>Group</button>
            </div>
        </div>
      </div>
    </div>
    )
}

export default ChatTypeModal;