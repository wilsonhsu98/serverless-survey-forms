
import * as types from '../constants/ActionTypes';

export function settings(data) {
    return {
        type: types.SET_SETTINGS,
        settings: data
    };
}
