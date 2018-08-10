import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = data => ({
  type: FETCH_QUESTION_SUCCESS,
  data
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = error => ({
  type: FETCH_QUESTION_ERROR,
  error
});

export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';
export const submitAnswerSuccess = data => ({
  type: SUBMIT_ANSWER_SUCCESS,
  data
});

export const SUBMIT_ANSWER_ERROR = 'SUBMIT_ANSWER_ERROR';
export const submitAnswerError = error => ({
  type: SUBMIT_ANSWER_ERROR,
  error
});

export const RESET_GAME_SUCCESS = 'RESET_GAME_SUCCESS';
export const resetGameSuccess = data => ({
  type: RESET_GAME_SUCCESS,
  data
});

export const RESET_GAME_ERROR = 'RESET_GAME_ERROR';
export const resetGameError = error => ({
  type: RESET_GAME_ERROR,
  error
});

export const fetchQuestion = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions/one`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(fetchQuestionSuccess(data)))
    .catch(err => dispatch(fetchQuestionError(err)));
};

export const submitAnswer = userAnswer => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userAnswer })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(submitAnswerSuccess(data)))
    .catch(err => dispatch(submitAnswerError(err)));
};

export const resetGame = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      console.log(data);
      dispatch(resetGameSuccess(data));
    })
    .then(dispatch(fetchQuestion()))
    .catch(err => dispatch(resetGameError(err)));
};
