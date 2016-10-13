import expect from 'expect';
import * as actions from '../../../portal/src/actions/webpage';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] webpage action', () => {
    it('should create an action to set webpage', () => {
        expect(
            actions.setWebpage('index')
        ).toEqual({
            type: types.SET_WEBPAGE,
            webpage: 'index'
        });

        expect(
            actions.setWebpage('create')
        ).toEqual({
            type: types.SET_WEBPAGE,
            webpage: 'create'
        });
    });
});
