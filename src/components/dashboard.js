import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestions } from '../actions/questions';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestions());
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="dashboard-protected-data">
          <p>Question: {this.props.question}</p>
          <p>Answer:{this.props.answer}</p>
          <p>Times Correct:{this.props.numCorrect}</p>
          <p>Times Attempted:{this.props.numAttempts}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    question: state.questions.data.question,
    answer: state.questions.data.answer,
    numCorrect: state.questions.data.numCorrect,
    numAttempts: state.questions.data.numAttempts
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
