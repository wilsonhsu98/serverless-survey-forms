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
import done from './done';
import paging from './paging';

const rootReducer = combineReducers({
    loading,
    settings,
    survey,
    done,
    paging,
    routing: routerReducer
});

export default rootReducer;
