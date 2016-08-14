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
import feedback from './feedback';
import submit from './submit';
import done from './done';
import paging from './paging';
import clientID from './clientID';
import prefillData from './prefillData';

const rootReducer = combineReducers({
    loading,
    settings,
    survey,
    feedback,
    submit,
    done,
    paging,
    clientID,
    prefillData,
    routing: routerReducer
});

export default rootReducer;
