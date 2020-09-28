import React, { Component, useContext } from 'react';
import { UserContext } from '../../UserProvider';

export default function UserTileComponent(props) {

    return (
        <div class="col-md-4">
            <div class="card mb-4 user-tile">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div className="user-id">#{props.user.userId}</div>
                        <div className="btn-group">
                            <span className="edit-user" onClick={() => props.editUser(props.rowIndex)}></span>
                            <span className="trash" onClick={() => props.deleteUser(props.user.userId)}></span>
                        </div>
                    </div>
                    <div class="card-text">
                        <div class="user-info">
                            <label class="col-form-label">First Name:</label>
                            <div class="user-data">
                                {props.user.firstName}
                            </div>
                        </div>
                        <div class="user-info">
                            <label class="col-form-label">Last Name:</label>
                            <div class="user-data">
                                {props.user.lastName}
                            </div>
                        </div>
                        <div class="user-info">
                            <label class="col-form-label">Email:</label>
                            <div class="user-data">
                                {props.user.userEmail}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
