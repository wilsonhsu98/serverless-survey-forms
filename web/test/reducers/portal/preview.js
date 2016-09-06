import expect from 'expect';
import preview from '../../../portal/src/reducers/preview';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] preview reducer', () => {
    it('should handle preview state', () => {
        expect(
            preview('', {
                type: types.SET_PREVIEW,
                preview: 'embedded'
            })
        ).toEqual('embedded');
    });

    it('should handle preview state when change preview', () => {
        expect(
            preview('embedded', {
                type: types.SET_CHANGE_PREVIEW,
                preview: 'previewPhone'
            })
        ).toEqual('previewPhone');
    });

    it('should handle preview state when stop preview', () => {
        expect(
            preview('embedded', {
                type: types.STOP_PREVIEW
            })
        ).toEqual('');
    });
});
