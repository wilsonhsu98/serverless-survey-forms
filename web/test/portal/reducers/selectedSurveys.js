import expect from 'expect';
import selectedSurveys from '../../../portal/src/reducers/selectedSurveys';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] selectedSurveys reducer', () => {
    it('should handle selectedSurveys state for default value', () => {
        expect(
            selectedSurveys(undefined, { type: '' })
        ).toEqual('');
    });

    it('should handle selectedSurveys state', () => {
        expect(
            selectedSurveys('', {
                type: types.ADD_SELECTED_SURVEYS,
                selectedSurveys: '1111-2222-3333'
            })
        ).toEqual('1111-2222-3333');
    });

    it('should handle selectedSurveys state when stop selected', () => {
        expect(
            selectedSurveys('', {
                type: types.REMOVE_SELECTED_SURVEYS
            })
        ).toEqual('');
    });
});
