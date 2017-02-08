import '../../helpers/env';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../src/actions/survey';
import * as types from '../../../src/constants/ActionTypes';
import Config from '../../../src/config';

const mockStore = configureStore([thunkMiddleware]);

describe('[Feedback] survey action', () => {
    it('should create an action to request survey', () => {
        expect(
            actions.requestSurvey()
        ).toEqual({
            type: types.REQUEST_SURVEY
        });
    });

    it('should create an action to receive survey success', () => {
        const survey = {
            content: [
                {
                    page: 1,
                    description: 'I am Page 1',
                    question: [{
                        id: '1AN2AL0F9BNA7A',
                        order: 1,
                        type: 'rating',
                        label: 'Testing question text',
                        data: [
                            { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Dissatisfied' },
                            { value: '1APPJND2CYBHCD9V0FEBA', label: 'Satisfied' }
                        ],
                        input: 'Tell us the reason why you choose this answer',
                        required: false
                    }]
                }
            ],
            thankyou: {
                privacy: {}
            },
            format: 'v1'
        };
        expect(
            actions.receiveSurveySuccess(survey)
        ).toEqual({
            type: types.RECEIVE_SURVEY_SUCCESS,
            survey
        });
    });

    it('should create an action to receive survey failure', () => {
        expect(
            actions.receiveSurveyFailure('Error')
        ).toEqual({
            type: types.RECEIVE_SURVEY_FAILURE,
            errorMsg: 'Error'
        });
    });

    it('should create an action to fetch survey', () => {
        const settings = {
            accountid: "facebook-xxxxxx",
            locale: "zh-TW",
            preview: false,
            surveyid: "1111-2222-3333-4444",
            type: "default"
        };
        const accountid = 'facebook-xxxxxx';
        const surveyid = '1111-2222-3333-4444';
        const survey = {
            content: [
                {
                    page: 1,
                    description: 'I am Page 1',
                    question: [{
                        id: '1AN2AL0F9BNA7A',
                        order: 1,
                        type: 'rating',
                        label: 'Testing question text',
                        data: [
                            { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Dissatisfied' },
                            { value: '1APPJND2CYBHCD9V0FEBA', label: 'Satisfied' }
                        ],
                        input: 'Tell us the reason why you choose this answer',
                        required: true
                    }]
                }
            ],
            thankyou: {
                privacy: {}
            },
            format: 'v1'
        };
        const feedback = {
            Q1: {
                data: [
                    { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Dissatisfied' },
                    { value: '1APPJND2CYBHCD9V0FEBA', label: 'Satisfied' }
                ],
                required: true
            }
        };
        const requiredData = [{
            done: false,
            id: "1AN2AL0F9BNA7A",
            order: 1,
            required: true
        }];


        nock(Config.baseURL)
        .get(`/api/v1/surveys/${accountid}/${surveyid}`)
        .reply(200, { survey });

        const store = mockStore({ settings, survey, submit: {} });
        const expectedActions = [
            { type: types.REQUEST_SURVEY },
            { type: types.RECEIVE_SURVEY_SUCCESS, survey },
            { type: types.GO_TO_PAGE, index: 1 },
            { type: types.SET_FEEDBACK_FORMAT, feedback },
            { type: types.SET_REQUIRED_DATA, requiredData },
            { type: types.SET_PAGE_DONE, done: "init" }
        ];

        return store.dispatch(actions.fetchSurvey(accountid, surveyid))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create an action to get one feedback', () => {
        const settings = {
            accountid: "facebook-xxxxxx",
            locale: "zh-TW",
            preview: false,
            surveyid: "1111-2222-3333-4444",
            type: "default"
        };
        const accountid = 'facebook-xxxxxx';
        const surveyid = '1111-2222-3333-4444';
        const clientid = '1234';
        const feedback = {
            surveyid,
            accountid,
            feedback: {},
            datetime: Date.now()
        };

        nock(Config.baseURL)
        .get(`/api/v1/feedbacks/${surveyid}/${clientid}`)
        .reply(200, feedback);

        const store = mockStore({ settings, survey: {}, submit: {} });
        const expectedActions = [
            { type: types.REQUEST_SURVEY },
            { type: types.RECORD_FEEDBACK, feedback: {} },
            { type: types.SAVE_CLIENT_ID, clientID: clientid },
            { type: types.REQUEST_SURVEY }
        ];

        return store.dispatch(actions.getFeeback(accountid, surveyid, clientid))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create an action to surveyDone', () => {
        expect(
            actions.surveyDone()
        ).toEqual({
            type: types.SURVEY_DONE
        });
    });

    it('should create an action to goToPage', () => {
        expect(
            actions.goToPage(2)
        ).toEqual({
            type: types.GO_TO_PAGE,
            index: 2
        });
    });

    it('should create an action to save prefill', () => {
        const data = {
            email: "xxxx@domain.com"
        };
        expect(
            actions.savePrefill(data)
        ).toEqual({
            type: types.SAVE_PREFILL_DATA,
            data
        });
    });

    it('should create an action to set L10n', () => {
        const l10n = {
            basic: "en-US",
            subject: "I am subject"
        };
        expect(
            actions.setL10n(l10n)
        ).toEqual({
            type: types.SET_SURVEY_L10N,
            l10n
        });
    });
});
