import expect from 'expect';
import * as actions from '../../../portal/src/actions/loading';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] loading action', () => {
    it('should create an action to set loading', () => {
        expect(
            actions.setLoading(true)
        ).toEqual({
            type: types.SET_LOADING,
            loading: true
        });

        expect(
            actions.setLoading(false)
        ).toEqual({
            type: types.SET_LOADING,
            loading: false
        });
    });
});
