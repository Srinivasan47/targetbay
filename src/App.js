import React, { useContext } from 'react';
import AddUserComponent from './Component/AddUserComponent/AddUserComponent';
import UserListComponent from './Component/UserListComponent/UserListComponent';
import 'react-notifications/lib/notifications.css';
import { UserProvider } from './UserProvider';
import './App.css';
import { NotificationContainer } from 'react-notifications';

function App() {
  return (
    <UserProvider >
      <div className="app">
        <NotificationContainer />
        <AddUserComponent />
        <div className="row">
          <UserListComponent />
        </div>
      </div>
    </UserProvider>

  );
}

export default App;
