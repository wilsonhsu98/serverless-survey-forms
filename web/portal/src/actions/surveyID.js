
import * as types from '../constants/ActionTypes';

export function setSurveyID(data) {
    return {
        type: types.SET_SURVEYID,
        surveyID: data
    };
}
