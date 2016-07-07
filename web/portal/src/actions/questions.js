
import * as types from '../constants/ActionTypes';

export function addQuestion(data) {
    return {
        type: types.ADD_QUESTION,
        questions: data
    };
}
