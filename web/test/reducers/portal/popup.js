import expect from 'expect';
import popup from '../../../portal/src/reducers/popup';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] popup reducer', () => {
    it('should handle popup state', () => {
        expect(
            popup('', {
                type: types.SET_POPUP,
                popup: 'deleteOneSurvey'
            })
        ).toEqual('deleteOneSurvey');
    });
});
