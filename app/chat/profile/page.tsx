"use client"

import React, { useEffect, useState } from "react";
import FriendTag from "../../ui/profile/FriendTag";
import { changeUserInfo, getUsers } from "../../../services/user";
import { useRouter } from "next/navigation";
import DeleteAccountModal from "../../ui/modal/DeleteAccountModal";
import { userLogout } from "../../../services/profile";
const ProfilePage = () => {
    const [name, setName] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    
    const router = useRouter()
    useEffect(() => {
        if (typeof window !== "undefined") {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          setCurrentUserId(user._id);
        }
      }, []);

    const handleLogout = async () => {
        try {
            await userLogout();
            router.push("/")
            location.reload()
        } catch (err) {
            alert("Error logout: " + err.message);
        }
    };

    

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log(storedUser);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setName(user?.name || "New User");
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let users
                if(inputValue !== "") {
                    users = await getUsers({ search: inputValue, limit: 3 });
                }
                else {
                    users = await getUsers({ limit: 3 });
                }
                console.log(users);
                const extractedData = users.data.map(person => ({
                    id: person._id,
                    name: person.name
                }));

                console.log(extractedData);

                setNames(extractedData)
                console.log(names);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();


    }, []);

    const saveHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        let user = null; // Declare 'user' outside the if block
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            user = JSON.parse(storedUser);
        }

        console.log(user);


        if (!name) {
            alert("Please fill your name.");
            setLoading(false);
            return;
        }

        try {
            await changeUserInfo({
                userId: user?._id,
                info: { name }
            });

            setLoading(false);

        } catch (error: any) {
            alert(`Change name failed: ${error.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
    
            setLoading(true);
            try {
                let users
                if(inputValue !== "") {
                    users = await getUsers({ search: inputValue, limit: 3 });
                }
                else {
                    users = await getUsers({ limit: 3 });
                }
                const extractedData = users.data.map(person => ({
                    id: person._id,
                    name: person.name
                }));
                setNames(extractedData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setLoading(false);
        };
    
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 300); // debounce by 300ms
    
        return () => clearTimeout(delayDebounceFn); // clean up on unmount or input change
    }, [inputValue]);


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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn fw-bold shadow-sm rounded-3 mt-3 ms-auto" style={{ background: "#FFCEB4" }}
                    onClick={saveHandler}>Save</button>
            </div>
            <div>
                <h5 className="fw-bold">Friends</h5>
                <div className="container bg-white py-3 px-5 rounded-3 shadow-sm">
                    <input
                        type="text"
                        className="form-control rounded-3 fw-medium py-2 w-50"
                        id="UserName"
                        aria-describedby="userNameHelp"
                        placeholder="Search by name"
                        style={{ background: "#D9D9D9" }}
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                    <div
                        className="mt-3 flex-grow-1 overflow-auto bg-white"
                        style={{
                            width: "100%",
                            overflowY: "auto",
                            overflowX: "hidden",
                        }}
                    >
                        {names.map((person) => (
                            <FriendTag key={person.id} name={person.name} color={"pink"} userId={person.id}/>
                        ))}

                    </div>
                </div>
            </div>
            <div className="d-flex mt-2">
                <button 
                    className="btn fw-bold shadow-sm rounded-3 ms-auto"
                    style={{ background: "#D9D9D9" }}
                    onClick={() => setShowDeleteAccount(true)}>
                    Delete Account
                </button>
                <DeleteAccountModal
                    isOpen={showDeleteAccount}
                    onClose={() => setShowDeleteAccount(false)}
                    user={currentUserId}
                />
                <button 
                    className="btn fw-bold shadow-sm rounded-3 ms-2"
                    style={{ background: "#FFCEB4" }}
                    onClick={handleLogout}>
                        Logout
                    </button>
            </div>
        </div>
    )
}

export default ProfilePage;
