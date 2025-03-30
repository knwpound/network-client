import React from "react";

const SentMessage = ({message}) =>{
    return(
        <div className="d-flex justify-content-end">
            <div className="p-2 px-3 rounded-3" style={{ maxWidth: "60%" , background:"#FFCEB4"}}>
                {message}
            </div>
        </div>
    )
}

export default SentMessage;