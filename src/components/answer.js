import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion, submitAnswer,} from '../actions/questions';
// import requiresLogin from './requires-login';

export class Answer extends React.Component {

  submitAnswer(e) {
    e.preventDefault();
    this.props.dispatch(submitAnswer(this.input.value));
  }

  render() {

    let answer = null;
    if (this.props.feedback) {
      // if user got it right, display 'correct' message
      answer = 
        <div className="answer">
          <h3>¡Buen trabajo! ¡Estas correcto!</h3>
          <h4> Good job!  You are correct! </h4>
          <button onClick={() => this.props.dispatch(fetchQuestion())}>Next</button>
        </div>
    } else if (this.props.feedback === false) {
      // if user got it wrong, display 'incorrect' message
      answer =
      <div className="answer">
        <h3>¡Incorrecto!  La respuesta correcta es {this.props.answer}.</h3>
        <h4>Incorrect!  The right answer was {this.props.answer}.</h4>
        <button onClick={() => this.props.dispatch(fetchQuestion())}>Next</button>
      </div>
    } else {
      // if user has not guessed, display input box
      answer = 
        <div className="answer">
          <p>Question: {this.props.question}</p>
          <label htmlFor="answer-text-box" className="answer-box-label">Answer:</label>
          <input name="answer-text-box" ref={input => this.input = input} type="text-box" placeholder="Type your answer"></input>
          <button onClick={(e) => this.submitAnswer(e)} type="submit">Submit</button>
        </div>
    }


    return (
      <React.Fragment>
        {answer}
      </React.Fragment>
    );

  }
}
  const mapStateToProps = state => {
    return {
      question: state.questions.question,
      answer: state.questions.answer,
      feedback: state.questions.feedback
    };
  };
  
  export default connect(mapStateToProps)(Answer);



