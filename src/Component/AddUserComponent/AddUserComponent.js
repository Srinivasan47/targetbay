import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../UserProvider';
import { NotificationManager } from 'react-notifications';

export default function AddUserComponent() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        if (users.length > 0 && users.length <= 20) {
            var index = users.findIndex(x => x.userEmail == data.userEmail);

            if (index === -1) {
                data.userId = users.length + 1;
                users.push(data);
                localStorage.setItem("users", JSON.stringify(users));
                setUserInfo(JSON.parse(localStorage.getItem("users")));
                NotificationManager.success('Added Successfully', 'Success');
            }
            else {
                NotificationManager.error('Email Id is already exist', 'Error');
            }
        }
        else if (users.length === 0) {
            data.userId = users.length + 1;
            users.push(data);
            localStorage.setItem("users", JSON.stringify(users));
            setUserInfo(JSON.parse(localStorage.getItem("users")));
            NotificationManager.success('Added Successfully', 'Success');
        }
        else {
            NotificationManager.warning("You can't add more then 20 item", 'Warning');
        }
    };

    return (
        <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="col">
                    <input type="text" name="firstName" className="form-control" placeholder="First Name" ref={register({ required: true, maxLength: 45 })} />
                    {errors.firstName && errors.firstName.type === "required" && <span className="error">This is required</span>}
                    {errors.firstName && errors.firstName.type === "maxLength" && <span className="error">Max length exceeded</span>}
                </div>
                <div className="col">
                    <input type="text" name="lastName" className="form-control" placeholder="Last Name" ref={register({ required: true, maxLength: 45 })} />
                    {errors.lastName && errors.lastName.type === "required" && <span className="error">This is required</span>}
                    {errors.lastName && errors.lastName.type === "maxLength" && <span className="error">Max length exceeded</span>}
                </div>
                <div className="col">
                    <input type="email" name="userEmail" className="form-control" placeholder="Email Address" ref={register({
                        required: true, maxLength: 45, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })} />
                    {errors.userEmail && errors.userEmail.type === "required" && <span className="error">This is required</span>}
                    {errors.userEmail && errors.userEmail.type === "maxLength" && <span className="error">Max length exceeded</span>}
                    {errors.userEmail && errors.userEmail.type === "pattern" && <span className="error">Invalid Email Address</span>}
                </div>
                <div className="col text-center">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>

            </div>
        </form>
    );
};