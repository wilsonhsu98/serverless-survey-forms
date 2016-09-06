import expect from 'expect';
import surveyID from '../../../portal/src/reducers/surveyID';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] surveyID reducer', () => {
    it('should handle surveyID state', () => {
        expect(
            surveyID('', {
                type: types.SET_SURVEYID,
                surveyID: '1111-2222-3333'
            })
        ).toEqual('1111-2222-3333');
    });
});
