import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion, submitAnswer, submitAnswerSuccess } from '../actions/questions';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }

  submitAnswer(e) {
    e.preventDefault;
    this.props.dispatch(submitAnswer(this.input.value, this.props.question));
  }

  render() {
    // button
    let button = null;
    // show submit button if the question has not been answered
    if (this.props.question) {
      button = <button onClick={(e) => this.submitAnswer(e)} type="submit">Submit</button>
      // show the next button if the question has been answered
    } else if (this.props.answer) {
      button = <button onClick={() => this.props.dispatch(fetchQuestion())}>Next</button>
    } 

    // answer
    let answer = null;
    if (this.props.correct) {
      // if user got it right, display 'correct' message
      answer = 
        <div className="answer">
          <h3>¡Buen trabajo! ¡Estas correcto!</h3>
          <h4> Good job!  You are correct! </h4>
        </div>
    } else if (this.props.correct === false) {
      // if user got it wrong, display 'incorrect' message
      answer =
      <div className="answer">
        <h3>¡Incorrecto!  La respuesta correcta es {this.props.answer}.</h3>
        <h4>Incorrect!  The right answer was {this.props.answer}.</h4>
      </div>
    } else {
      // if user has not guess, display input box
      answer = 
        <div className="answer">
          <label for="answer-text-box" class="answer-box-label">Answer:</label>
          <input name="answer-text-box" ref={input => this.input = input} type="text-box" placeholder="Type your answer"></input>
        </div>
    }

    return (
      <div className="dashboard center">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="dashboard-protected-data">
          <p>Question: {this.props.question}</p>
          <p>
            {answer}
            {button}
          </p>
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
