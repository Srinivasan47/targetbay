import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../UserProvider';
import { NotificationManager } from 'react-notifications';

export default function UserTileComponent(props) {

    const { userInfo, setUserInfo } = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();
    const [editUserInfo, setEditUserInfo] = useState({ firstName: '', lastName: '', userEmail: '' });
    const [swapUserInfo, setSwapUserInfo] = useState([]);
    useEffect(() => {
        setEditUserInfo({ firstName: props.user.firstName, lastName: props.user.lastName, userEmail: props.user.userEmail });
        var index = userInfo.findIndex(function (o) {
            return o.userId === props.user.userId;
        });
        setSwapUserInfo(userInfo.slice(0, index).concat(userInfo.slice(index + 1)));
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setEditUserInfo({
            [name]: value
        });
    };

    const onSubmit = data => {
        const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        if (users.length > 0) {
            var index = users.findIndex(x => x.userId === props.user.userId);
            data.userId = props.user.userId;
            var emailCount = users.filter(x => x.userEmail === data.userEmail && x.userId != props.user.userId).length;
            if (index != -1 && emailCount == 0) {
                users.splice(index, 1);
                users.splice(index, 0, data);
                if (data.swapUser != "") {
                    var swapIndex = users.findIndex(x => x.userId == data.swapUser);
                    let a = users[index];
                    users[index] = users[swapIndex];
                    users[swapIndex] = a;
                }
                localStorage.setItem("users", JSON.stringify(users));
                setUserInfo(JSON.parse(localStorage.getItem("users")));
                NotificationManager.success('Updated Successfully', 'Success');
                props.onUserUpdate();
            }
            else {
                NotificationManager.error('Email Id is already exist', 'Error');
            }
        }
        console.log(data);
    };
    return (
        <div class="col-md-4">
            <div class="card mb-4 user-tile">
                <div class="card-body edit-component">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="d-flex justify-content-between swap-section">
                            <div className="user-id">#{props.user.userId}</div>
                            <div>
                                <select class="form-control form-control-sm" name="swapUser" ref={register({ maxLength: 45 })}>
                                    <option value="">Swap</option>
                                    {swapUserInfo && swapUserInfo.map((item, index) => (
                                        <option value={item.userId}>{item.userId}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary btn-sm">Save</button>
                            </div>
                        </div>
                        <div class="card-text">
                            <div class="form-group">
                                <input type="text" name="firstName" className="form-control form-control-sm" placeholder="First Name" value={editUserInfo.firstName} onChange={(e) => handleChange(e)} ref={register({ required: true, maxLength: 45 })} />
                                {errors.firstName && errors.firstName.type === "required" && <span className="error">This is required</span>}
                                {errors.firstName && errors.firstName.type === "maxLength" && <span className="error">Max length exceeded</span>}
                            </div>
                            <div class="form-group">
                                <input type="text" name="lastName" className="form-control form-control-sm" placeholder="Last Name" value={editUserInfo.lastName} onChange={(e) => handleChange(e)} ref={register({ required: true, maxLength: 45 })} />
                                {errors.lastName && errors.lastName.type === "required" && <span className="error">This is required</span>}
                                {errors.lastName && errors.lastName.type === "maxLength" && <span className="error">Max length exceeded</span>}
                            </div>
                            <div class="form-group">
                                <input type="email" name="userEmail" className="form-control form-control-sm" placeholder="Email Address" value={editUserInfo.userEmail} onChange={(e) => handleChange(e)} ref={register({
                                    required: true, maxLength: 45, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                })} />
                                {errors.userEmail && errors.userEmail.type === "required" && <span className="error">This is required</span>}
                                {errors.userEmail && errors.userEmail.type === "maxLength" && <span className="error">Max length exceeded</span>}
                                {errors.userEmail && errors.userEmail.type === "pattern" && <span className="error">Invalid Email Address</span>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
