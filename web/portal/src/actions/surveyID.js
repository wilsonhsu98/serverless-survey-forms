
import * as types from '../constants/ActionTypes';

export function setSuveyID(data) {
    return {
        type: types.SET_SURVEYID,
        surveyID: data
    };
}
