import expect from 'expect';
import surveys from '../../../portal/src/reducers/surveys';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] surveys reducer', () => {
    it('should handle surveys state for default value', () => {
        expect(
            surveys(undefined, { type: '' })
        ).toEqual([]);
    });

    it('should handle surveys state', () => {
        expect(
            surveys([], {
                type: types.RECIEVE_SURVEYS_SUCCESS,
                surveys: [
                    {
                        accountid: 'facebook-00000',
                        subject: 'I am Questionnaire',
                        surveyid: '11111-0000-2222-3333',
                        datetime: 1470380181870,
                        count: 10
                    }, {
                        accountid: 'facebook-00000',
                        subject: 'TODOS',
                        surveyid: '2222-3333-4444-0000',
                        datetime: 1470301920229,
                        count: 0
                    }]
            })
        ).toEqual([
            {
                accountid: 'facebook-00000',
                subject: 'I am Questionnaire',
                surveyid: '11111-0000-2222-3333',
                datetime: 1470380181870,
                count: 10
            }, {
                accountid: 'facebook-00000',
                subject: 'TODOS',
                surveyid: '2222-3333-4444-0000',
                datetime: 1470301920229,
                count: 0
            }]);
    });
});
