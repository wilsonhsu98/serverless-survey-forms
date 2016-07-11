/**
 * Index reducer to combine all the reducers
 **/

/** Please update below state tree if new state is added
 {
    loading: true/false,
    fbID: "10206181895733803",
    account: {
		  "accountid": "facebook-10206181895733803",
		  "username": "jonas cheng",
		  "email": "jonas_cheng@trend.com.tw",
		  "role": "User"
		},
    questions: [{},{},...],
    editQuestion: {}
 }
**/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loading from './loading';
import fbID from './fbID';
import account from './account';
import questions from './questions';
import editQuestion from './editQuestion';

const rootReducer = combineReducers({
    loading,
    fbID,
    account,
    questions,
    editQuestion,
    routing: routerReducer
});

export default rootReducer;
