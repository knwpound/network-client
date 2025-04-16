import React from "react";

const AddFriendModal = () =>{
    return(
        <div className="modal-overlay items-center justify-center">
      <div
        className="bg-white py-4 px-5 rounded-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header align-items-center justify-content-center">
            <h4 className="text-black mt-2 ms-auto fw-bold">Add new Friend</h4>
            <button
        //   onClick={onClose}
          className="m-2 ms-auto text-dark fs-3 border-0 bg-transparent"
        >
          &times;
        </button>
        </div>
        <div className="modal-body mb-3 text-center align-items-center justify-content-center">
            <input type="text" className="form-control px-3 py-1 rounded-2 text-center fw-medium" placeholder="Enter Friend's email"/>
            <div className="d-flex mt-4 align-items-center justify-content-center">
                <button className="btn fw-bold me-5 py-2 px-4 " style={{backgroundColor:"lightgray"}}>Cancel</button>
                <button className="btn fw-bold py-2 px-4 " style={{backgroundColor:"#FFCEB4"}}>Add</button>
            </div>
        </div>
      </div>
    </div>
    )
}

export default AddFriendModal;