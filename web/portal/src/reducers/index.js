/**
 * Index reducer to combine all the reducers
 **/

/** Please update below state tree if new state is added
 {
 	loading: true/false
 }
**/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loading from './loading';

const rootReducer = combineReducers({
    loading,
    routing: routerReducer
});

export default rootReducer;
