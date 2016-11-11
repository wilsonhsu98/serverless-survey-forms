
import * as types from '../constants/ActionTypes';

export default function loading(state = false, action) {
    switch (action.type) {
    case types.SET_LOADING:
        return action.loading;
    case types.REQUEST_SET_SUBJECT:
    case types.REQUEST_SURVEYS_LIST:
    case types.REQUEST_DELETE_ALLFEEDBACKS:
    case types.REQUEST_DELETE_SURVEYS:
    case types.REQUEST_GET_QUESTION:
    case types.REQUEST_REPORT:
    case types.REQUEST_USERS_LIST:
    case types.REQUEST_CHANGE_ROLE:
    case types.REQUEST_COPY_SURVEY:
    case types.REQUEST_IMPORT_L10N:
    case types.REQUEST_DELETE_L10N:
        return true;
    case types.SET_SUBJECT_SUCCESS:
    case types.SET_SUBJECT_FAILURE:
    case types.RECEIVE_SURVEYS_SUCCESS:
    case types.RECEIVE_SURVEYS_FAILURE:
    case types.RECEIVE_DELETE_SURVEYS_SUCCESS:
    case types.RECEIVE_DELETE_SURVEYS_FAILURE:
    case types.DELETE_ALLFEEDBACKS_SUCCESS:
    case types.DELETE_ALLFEEDBACKS_FAILURE:
    case types.RECEIVE_QUESTIONS_SUCCESS:
    case types.RECEIVE_QUESTIONS_FAILURE:
    case types.RECEIVE_REPORT_SUCCESS:
    case types.RECEIVE_REPORT_FAILURE:
    case types.RECEIVE_USERS_SUCCESS:
    case types.RECEIVE_USERS_FAILURE:
    case types.RECEIVE_CHANGE_ROLE_SUCCESS:
    case types.RECEIVE_CHANGE_ROLE_FAILURE:
    case types.POST_COPIEDSURVEY_SUCCESS:
    case types.POST_COPIEDSURVEY_FAILURE:
    case types.RECEIVE_IMPORT_L10N:
    case types.RECEIVE_DELETE_L10N:
        return false;
    default:
        return state;
    }
}
