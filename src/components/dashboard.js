import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion, submitAnswer,} from '../actions/questions';
import Answer from './answer';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }



  render() {
   

    return (
      <div className="dashboard center">
        <div className="dashboard-username">
          <p>Username: {this.props.username}</p>
          <p>Times Correct:{this.props.numCorrect}</p>
          <p>Times Attempted:{this.props.numAttempts}</p>
        </div>          
            <Answer /> 
        </div>
     
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

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
