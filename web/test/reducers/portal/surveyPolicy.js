import expect from 'expect';
import surveyPolicy from '../../../portal/src/reducers/surveyPolicy';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] surveyPolicy reducer', () => {
    it('should handle surveyPolicy state', () => {
        expect(
            surveyPolicy({}, {
                type: types.SET_SURVEY_POLICY,
                surveyPolicy: {
                    description: 'Thanks for sharing your feedback with Trend Micro.',
                    privacy: {
                        input: 'Please enter your email address.',
                        label: 'If Trend Micro has a follow-up survey on the Email Scan, would you like to participate?',
                        terms: 'Yes, Trend Micro can reach me at this address: '
                    }
                }
            })
        ).toEqual({
            description: 'Thanks for sharing your feedback with Trend Micro.',
            privacy: {
                input: 'Please enter your email address.',
                label: 'If Trend Micro has a follow-up survey on the Email Scan, would you like to participate?',
                terms: 'Yes, Trend Micro can reach me at this address: '
            }
        });
    });


    it('should handle surveyPolicy state to init', () => {
        expect(
            surveyPolicy({}, {
                type: types.INIT_SURVEY_POLICY
            })
        ).toEqual({
            description: 'Thanks for sharing your feedback with Trend Micro.',
            privacy: {}
        });
    });
});
