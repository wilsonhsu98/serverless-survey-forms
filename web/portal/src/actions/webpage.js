
import * as types from '../constants/ActionTypes';

export function setWebpage(data) {
    return {
        type: types.SET_WEBPAGE,
        webpage: data
    };
}
