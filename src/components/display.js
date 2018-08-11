import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion, submitAnswer } from '../actions/questions';
import './display.css';

export class Display extends React.Component {
  componentDidMount() {
    this.input.focus();
    this.props.dispatch(fetchQuestion());
  }

  componentDidUpdate() {
    if (this.btn) {
      this.btn.focus();
    }
    if (this.input) {
      this.input.focus();
    }
  }

  submitAnswer(e) {
    e.preventDefault();
    this.props.dispatch(submitAnswer(this.input.value));
  }

  render() {
    let message = 'Come on... you can do better than that... :(';

    if (this.props.streak >= 3) {
      message = 'Bet you miss the next one >:)';
    }
    if (this.props.streak >= 5) {
      message = 'Everyone gets lucky sometimes...';
    }
    if (this.props.streak >= 7) {
      message = 'Okay, okay... so you know a few words...';
    }
    if (this.props.streak >= 10) {
      message = 'Come on... no one like a show off...';
    }

    // if user has not guessed, display input box
    let display = (
      <form className="display">
        <p className="display-word">{this.props.question}</p>
        <input
          className="display-text-box"
          name="display-text-box"
          ref={input => (this.input = input)}
          type="text-box"
          placeholder="Type your answer"
        />
        <button onClick={e => this.submitAnswer(e)} type="submit">
          Submit
        </button>
      </form>
    );

    // if user got it right, display 'correct' message
    if (this.props.feedback) {
      display = (
        <section className="display">
          <div className="feedback-right">
            <h3>¡Buen trabajo! ¡Estas correcto!</h3>
            <h5>(Good job! You are correct!)</h5>
          </div>
          <button
            ref={btn => (this.btn = btn)}
            onClick={() => this.props.dispatch(fetchQuestion())}
          >
            Next
          </button>
        </section>
      );
    }

    // if user got it wrong, display 'incorrect' message
    if (this.props.feedback === false) {
      display = (
        <section className="display">
          <div className="feedback-wrong">
            <h3>
              ¡Incorrecto! La respuesta correcta es:{' '}
              <span className="right-answer">{this.props.answer}</span>.
            </h3>
            <h5>
              (Incorrect! The right answer was:{' '}
              <span className="right-answer">{this.props.answer}</span>.)
            </h5>
          </div>
          <button
            ref={btn => (this.btn = btn)}
            onClick={() => this.props.dispatch(fetchQuestion())}
          >
            Next
          </button>
        </section>
      );
    }

    return (
      <React.Fragment>
        {display}
        <section className="streak-section">
          <span className="streak-count"><span className="streak-num">{this.props.streak}</span> correct in a row</span>
          <span className="streak-message">{message}</span>
        </section>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  streak: state.questions.streak,
  question: state.questions.question,
  answer: state.questions.answer,
  feedback: state.questions.feedback
});

export default connect(mapStateToProps)(Display);
