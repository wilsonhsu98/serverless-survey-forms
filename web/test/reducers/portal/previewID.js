import expect from 'expect';
import previewID from '../../../portal/src/reducers/previewID';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] previewID reducer', () => {
    it('should handle previewID state', () => {
        expect(
            previewID('', {
                type: types.SET_PREVIEW,
                previewID: '1111-2222-3333'
            })
        ).toEqual('1111-2222-3333');
    });

    it('should handle previewID state when stop preview', () => {
        expect(
            previewID('', {
                type: types.STOP_PREVIEW
            })
        ).toEqual('');
    });
});
