
import * as types from '../constants/ActionTypes';

export default function loading(state = false, action) {
    switch (action.type) {
    case types.SET_LOADING:
        return action.loading;
    case types.REQUEST_SET_SUBJECT:
    case types.REQUEST_SURVEYS_LIST:
    case types.REQUEST_DELET_SURVEYS:
    case types.REQUEST_GET_QUESTION:
    case types.REQUEST_REPORT:
    case types.REQUEST_USERS_LIST:
    case types.REQUEST_CHANGE_ROLE:
        return true;
    case types.SET_SUBJECT_SUCCESS:
    case types.SET_SUBJECT_FAILURE:
    case types.RECIEVE_SURVEYS_SUCCESS:
    case types.RECIEVE_SURVEYS_FAILURE:
    case types.RECIEVE_DELETE_SURVEYS_SUCCESS:
    case types.RECIEVE_DELETE_SURVEYS_FAILURE:
    case types.RECIEVE_QUESTIONS_SUCCESS:
    case types.RECIEVE_QUESTIONS_FAILURE:
    case types.RECIEVE_REPORT_SUCCESS:
    case types.RECIEVE_REPORT_FAILURE:
    case types.RECIEVE_USERS_SUCCESS:
    case types.RECIEVE_USERS_FAILURE:
    case types.RECIEVE_CHANGE_ROLE_SUCCESS:
    case types.RECIEVE_CHANGE_ROLE_FAILURE:
        return false;
    default:
        return state;
    }
}
