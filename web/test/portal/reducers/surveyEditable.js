import expect from 'expect';
import surveyEditable from '../../../portal/src/reducers/surveyEditable';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] surveyEditable reducer', () => {
    it('should handle surveyEditable state for default value', () => {
        expect(
            surveyEditable(undefined, { type: '' })
        ).toEqual(true);
    });

    it('should handle surveyEditable state', () => {
        expect(
            surveyEditable(false, {
                type: types.SET_EDITABLE
            })
        ).toEqual(true);

        expect(
            surveyEditable(true, {
                type: types.SET_NOT_EDITABLE
            })
        ).toEqual(false);
    });
});
