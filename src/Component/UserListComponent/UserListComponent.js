import React, { useState, useContext } from 'react';
import UserTileComponent from "../UserTileComponent/UserTileComponent";
import EditUserComponent from "../EditUserComponent/EditUserComponent";
import { UserContext } from '../../UserProvider';
import { NotificationManager } from 'react-notifications';

export default function UserListComponent() {

    const { userInfo, setUserInfo } = useContext(UserContext);
    const [userIndex, setUserIndex] = useState(null);
    const deleteUserData = (uid) => {
        if (window.confirm("Are you sure want to delete ?")) {
            var index = userInfo.findIndex(function (o) {
                return o.userId === uid;
            });
            if (index !== -1) {
                userInfo.splice(index, 1);
                localStorage.setItem("users", JSON.stringify(userInfo));
                setUserInfo(JSON.parse(localStorage.getItem("users")));
                NotificationManager.success('Deleted Successfully', 'Success');
            }
        }
    };
    const editUserData = (uid) => {
        setUserIndex(uid);
    };
    const userUpdate = () => {
        setUserIndex(null);
    };
    return (
        userInfo && userInfo.map((user, index) => (
            userIndex === index ? <EditUserComponent user={user} onUserUpdate={userUpdate} /> : <UserTileComponent user={user} rowIndex={index} deleteUser={deleteUserData} editUser={editUserData} />
        ))
    );
};
