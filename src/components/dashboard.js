import React from 'react';
import requiresLogin from './requires-login';
import Display from './display';
import UserData from './user-data';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <UserData />
        <Display />
      </div>
    );
  }
}

export default requiresLogin()(Dashboard);
