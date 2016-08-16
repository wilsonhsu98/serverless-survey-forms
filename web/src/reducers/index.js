/**
 * Index reducer to combine all the reducers
 **/

/** Please update below state tree if new state is added
 {
 	loading: true/false,
    settings: {surveyid, localize_path},
    survey: {...}
 }
**/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loading from './loading';
import settings from './settings';
import survey from './survey';
import requiredData from './requiredData';
import feedback from './feedback';
import submit from './submit';
import pageDone from './pageDone';
import done from './done';
import paging from './paging';
import clientID from './clientID';
import prefillData from './prefillData';

const rootReducer = combineReducers({
    loading,
    settings,
    survey,
    requiredData,
    feedback,
    submit,
    pageDone,
    done,
    paging,
    clientID,
    prefillData,
    routing: routerReducer
});

export default rootReducer;
