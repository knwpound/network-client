import React from "react";

const LeaveModal = () =>{
    return(
        <div className="modal-overlay items-center justify-center">
      <div
        className="bg-white py-4 px-5 rounded-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header align-items-center justify-content-center">
            <h4 className="text-black mt-2 fw-bold">Are you sure?</h4>
        </div>
        <div className="modal-body mb-3 text-center align-items-center justify-content-center">
            <p className="fw-semibold">Are you sure you want to leave this group</p>
            <div className="d-flex align-items-center justify-content-center">
                <button className="btn fw-bold shadow-sm me-5" style={{backgroundColor:"lightgray"}}>Cancel</button>
                <button className="btn fw-bold shadow-sm px-3" style={{backgroundColor:"#FF9551"}}>Leave</button>
            </div>
        </div>
      </div>
    </div>
    )
}

export default LeaveModal;