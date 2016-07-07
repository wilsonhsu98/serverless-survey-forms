
import * as types from '../constants/ActionTypes';

export function setLoading(flag) {
    return {
        type: types.SET_LOADING,
        loading: flag
    };
}
