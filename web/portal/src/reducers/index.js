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
    lang: 'en-US',
    surveyL10n: {},
    surveyVersion: 'v2',
    questions: [{},{},...],
    dropQuestion: { page: 1, index: 0 },
    editSubject: true/false,
    editQuestion: {},
    editPage: {page:(the first is 1), description:''},
    orderPage: [],
    surveys: [{},{},...],
    selectedSurveys: '',
    selectedL10n: '',
    surveyEditable: true,
    surveyPolicy: {
        description: "Thanks for ...",
        privacy: {
            label: "If Trend Micro ...",
            terms: "Yes, ... ",
            input: "Please enter your email address."
        }
    },
    preview: 'embedded/previewPhone/previewPad/previewDesktop',
    previewID: '',
    users: [],
    subscribers: [],
    selectedUser: {}
    webpage: 'index', or 'create/build' or 'create/l10n
    popup: ''
 }
**/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loading from './loading';
import token from './token';
import account from './account';
import surveyID from './surveyID';
import subject from './subject';
import lang from './lang';
import surveyL10n from './surveyL10n';
import surveyVersion from './surveyVersion';
import questions from './questions';
import dropQuestion from './dropQuestion';
import editSubject from './editSubject';
import editQuestion from './editQuestion';
import editPage from './editPage';
import orderPage from './orderPage';
import surveys from './surveys';
import selectedSurveys from './selectedSurveys';
import selectedL10n from './selectedL10n';
import surveyEditable from './surveyEditable';
import surveyPolicy from './surveyPolicy';
import preview from './preview';
import previewID from './previewID';
import users from './users';
import subscribers from './subscribers';
import selectedUser from './selectedUser';
import webpage from './webpage';
import popup from './popup';

const rootReducer = combineReducers({
    loading,
    token,
    account,
    surveyID,
    subject,
    lang,
    surveyL10n,
    surveyVersion,
    questions,
    dropQuestion,
    editSubject,
    editQuestion,
    editPage,
    orderPage,
    surveys,
    selectedSurveys,
    selectedL10n,
    surveyEditable,
    surveyPolicy,
    preview,
    previewID,
    users,
    subscribers,
    selectedUser,
    webpage,
    popup,
    routing: routerReducer
});

export default rootReducer;
