import expect from 'expect';
import surveyVersion from '../../../portal/src/reducers/surveyVersion';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] surveyVersion reducer', () => {
    it('should handle surveyVersion state for default value', () => {
        expect(
            surveyVersion(undefined, { type: '' })
        ).toEqual('');
    });

    it('should handle surveyVersion state', () => {
        expect(
            surveyVersion('', {
                type: types.SET_SURVEY_VERSION,
                surveyVersion: 'v2'
            })
        ).toEqual('v2');
    });
});
