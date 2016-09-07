import expect from 'expect';
import * as actions from '../../../portal/src/actions/preview';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] preview action', () => {
    it('should create an action to set preview', () => {
        const previewID = '1111-2222-3333';
        expect(
            actions.setPreview('embedded', previewID)
        ).toEqual({
            type: types.SET_PREVIEW,
            preview: 'embedded',
            previewID
        });
    });

    it('should create an action to change preview', () => {
        const preview = 'previewPhone';
        expect(
            actions.changePreview(preview)
        ).toEqual({
            type: types.SET_CHANGE_PREVIEW,
            preview
        });
    });

    it('should create an action to close preview', () => {
        expect(
            actions.closePreview()
        ).toEqual({
            type: types.STOP_PREVIEW
        });
    });
});
