import React from "react";
import FriendTag from "../../ui/profile/FriendTag";

const ProfilePage = () => {
    return (
        <div className="container my-3 px-5">
            <h2 className="fw-bold mt-5">Profile</h2>
                <div className="d-flex align-items-center mt-4">
                    <div>
                        <div
                            className="ms-3 rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                background: "gray",
                                width: "35px",
                                height: "35px"
                            }}
                        >
                            <img
                                src="../images/icon/user.png"
                                alt=""
                                style={{
                                    width: "20px",
                                }}
                            />
                        </div>
                    </div>
                    <input
                        type="text"
                        className="form-control rounded-3 ms-3"
                        id="UserName"
                        aria-describedby="userNameHelp"
                        value={"Pound Kanokwan"}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn fw-bold shadow-sm rounded-3 mt-3 ms-auto" style={{ background: "#FFCEB4" }}>Save</button>
                </div>
            <div>
                <h5 className="fw-bold">Friends</h5>
                <div className="container bg-white py-4 px-5 rounded-3 shadow-sm">
                <input
                        type="text"
                        className="form-control rounded-3 fw-medium py-2 w-50"
                        id="UserName"
                        aria-describedby="userNameHelp"
                        placeholder= "Search by name"
                        style={{background:"#D9D9D9"}}
                    />
                <div className="mt-4">
                    <FriendTag name={"Susan"} color={"pink"}/>
                    <FriendTag name={"Susan"} color={"pink"}/>
                    <FriendTag name={"Susan"} color={"pink"}/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
