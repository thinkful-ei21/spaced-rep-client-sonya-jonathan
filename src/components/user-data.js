import React from 'react';
import { connect } from 'react-redux';
import './user-data.css'

export class UserData extends React.Component {
  render() {
    return (
      <section className="user-data">
        <h3>Welcome, {this.props.username}!</h3>
        <section className="user-stats">
        <span>Times Correct: </span>
        <span className="num-correct">{this.props.numCorrect}</span>
        <span>Times Attempted: </span>
        <span className="num-attempts">{this.props.numAttempts}</span>
       
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    numCorrect: state.questions.numCorrect,
    numAttempts: state.questions.numAttempts
  };
};

export default connect(mapStateToProps)(UserData);
