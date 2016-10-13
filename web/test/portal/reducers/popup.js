import expect from 'expect';
import popup from '../../../portal/src/reducers/popup';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] popup reducer', () => {
    it('should handle popup state for default value', () => {
        expect(
            popup(undefined, { type: '' })
        ).toEqual('');
    });

    it('should handle popup state', () => {
        expect(
            popup('', {
                type: types.SET_POPUP,
                popup: 'deleteOneSurvey'
            })
        ).toEqual('deleteOneSurvey');
    });

    it('should handle popup state when close popup', () => {
        expect(
            popup('somePopup', {
                type: types.CLOSE_POPUP
            })
        ).toEqual('');
    });
});
