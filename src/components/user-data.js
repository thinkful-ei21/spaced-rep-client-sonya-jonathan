import React from 'react';
import { connect } from 'react-redux';

export class UserData extends React.Component {
  render() {
    return (
      <section className="user-data">
        {/* <h3>{this.props.username}</h3> */}
        {/* <section className="user-stats"> */}
        <span>
          Times Correct: <span>{this.props.numCorrect}</span>
        </span>
        <span>
          Times Attempted: <span>{this.props.numAttempts}</span>
        </span>
        {/* </section> */}
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
