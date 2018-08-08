import {
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_ERROR,
  SUBMIT_ANSWER_SUCCESS,
  SUBMIT_ANSWER_ERROR
} from '../actions/questions';

const initialState = {
  question: null,
  answer: null,
  feedback: null,
  numCorrect: 0,
  numAttempts: 0,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      question: action.data.question,
      answer: null,
      feedback: null,
      numCorrect: action.data.numCorrect,
      numAttempts: action.data.numAttempts,
      error: null
    });
  } else if (action.type === FETCH_QUESTION_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  } else if (action.type === SUBMIT_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      question: null,
      answer: action.data.answer,
      feedback: action.data.feedback,
      numCorrect: action.data.numCorrect,
      numAttempts: action.data.numAttempts,
      error: null
    });
  } else if (action.type === SUBMIT_ANSWER_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }

  return state;
}
