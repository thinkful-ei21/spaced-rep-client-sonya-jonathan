import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button className="log-out-button" onClick={() => this.logOut()}>
          Log out
        </button>
      );
    }

    return (
      <header role='banner' className="header-bar">
        <div className="header-title">
          <h1>Cartas Contra Español</h1>
        </div>
        <div className="header-button">{logOutButton}</div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
