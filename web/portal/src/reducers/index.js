/**
 * Index reducer to combine all the reducers
 **/

/** Please update below state tree if new state is added
 {
    loading: true/false,
    token: "xxxxxxxxxx",
    account: {
		  "accountid": "facebook-10206181895733803",
		  "username": "jonas cheng",
		  "email": "jonas_cheng@trend.com.tw",
		  "role": "User"
		},
    surveyID: '',
    subject: '',
    questions: [{},{},...],
    editSubject: true/false,
    editQuestion: {},
    editPage: int (page's id),
    orderPage: true/false,
    surveys: [{},{},...]
 }
**/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loading from './loading';
import token from './token';
import account from './account';
import surveyID from './surveyID';
import subject from './subject';
import questions from './questions';
import editSubject from './editSubject';
import editQuestion from './editQuestion';
import editPage from './editPage';
import orderPage from './orderPage';
import surveys from './surveys';

const rootReducer = combineReducers({
    loading,
    token,
    account,
    surveyID,
    subject,
    questions,
    editSubject,
    editQuestion,
    editPage,
    orderPage,
    surveys,
    routing: routerReducer
});

export default rootReducer;
