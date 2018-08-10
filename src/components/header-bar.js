import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { resetGame } from '../actions/questions';
import { clearAuthToken } from '../local-storage';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  reset() {
    this.props.dispatch(resetGame());
  }

  render() {
    // Only render these buttons if we are logged in
    let logOutButton;
    let resetButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button className="log-out" onClick={() => this.logOut()}>
          Log out
        </button>
      );
      resetButton = (
        <button className="reset" onClick={() => this.reset()}>
          Reset
        </button>
      );
    }

    return (
      <header role="banner" className="header-bar">
        <div className="header-title">
          <h1>Cartas Contra Español</h1>
        </div>
        <div className="buttons">
          <div className="reset-button">{resetButton}</div>
          <div className="log-out-button">{logOutButton}</div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
