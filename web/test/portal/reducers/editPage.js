import expect from 'expect';
import editPage from '../../../portal/src/reducers/editPage';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] editPage reducer', () => {
    it('should handle editPage state for default value', () => {
        expect(
            editPage(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle editPage state', () => {
        expect(
            editPage({}, {
                type: types.SET_EDITPAGE,
                editPage: {
                    description: 'I am Page 1',
                    page: 1
                }
            })
        ).toEqual({
            description: 'I am Page 1',
            page: 1
        });
    });

    it('should handle editPage state when stop edit', () => {
        expect(
            editPage({}, {
                type: types.STOP_EDITPAGE
            })
        ).toEqual({});
    });
});
