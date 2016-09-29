import '../../helpers/env';
import DomMock from '../../helpers/dom-mock';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../portal/src/actions/surveys';
import * as types from '../../../portal/src/constants/ActionTypes';
import Config from '../../../portal/src/config';

DomMock('<html><body></body></html>');
const mockStore = configureStore([thunkMiddleware]);

describe('[Portal] surveys action', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to save surveys', () => {
        expect(
            actions.receiveSurveysSuccess([])
        ).toEqual({
            type: types.RECIEVE_SURVEYS_SUCCESS,
            surveys: []
        });
    });

    it('should create an action to get surveys', () => {
        const account = {
            accountid: 'facebook-xxxxxx',
            username: 'Mr. Test',
            role: 'Admin'
        };
        const selectedUser = {};
        const token = 'xxxxxxx';
        const surveys = [
            {
                accountid: 'facebook-00000',
                subject: 'I am Questionnaire',
                surveyid: '11111-0000-2222-3333',
                datetime: 1470380181870,
                count: 10
            },{
                accountid: 'facebook-00000',
                subject: 'TODOS',
                surveyid: '2222-3333-4444-0000',
                datetime: 1470301920229,
                count: 0
            } ];

        nock(Config.baseURL, {
            reqheaders: { 'authorization': token }
        })
        .get(`/api/v1/mgnt/surveys/${account.accountid}`)
        .reply(200, {
            surveys: surveys
        });

        const store = mockStore({
            account,
            selectedUser,
            token
        });
        const expectedActions = [
            { type: types.REMOVE_SELECTED_SURVEYS },
            { type: types.REQUEST_SURVEYS_LIST },
            { type: types.RECIEVE_SURVEYS_SUCCESS, surveys }
        ];

        return store.dispatch(actions.getSurveys())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create an action to toggle selected surveys', () => {
        const selectedSurveys = '11111-0000-2222-3333';
        const store = mockStore({ selectedSurveys });

        store.dispatch(actions.toggleSelectedSurveys(selectedSurveys));
        expect(
            store.getActions()
        ).toEqual(
            [ { type: types.REMOVE_SELECTED_SURVEYS } ]
        );
        store.clearActions();

        const toggleSurveys = '2222-3333-4444-0000';
        store.dispatch(actions.toggleSelectedSurveys(toggleSurveys));
        expect(
            store.getActions()
        ).toEqual(
            [ { type: types.ADD_SELECTED_SURVEYS,
                selectedSurveys: toggleSurveys } ]
        );
    });

    it('should create an action to delete survey', () => {
        const account = {
            accountid: 'facebook-xxxxxx',
            username: 'Mr. Test',
            role: 'Admin'
        };
        const selectedUser = {};
        const selectedSurveys = '11111-0000-2222-3333';
        const token = 'xxxxxxx';

        nock(Config.baseURL, {
            reqheaders: { 'authorization': token }
        })
        .intercept(`/api/v1/mgnt/surveys/${account.accountid}/${selectedSurveys}`, 'DELETE')
        .reply(200, {});

        const store = mockStore({
            account,
            selectedUser,
            selectedSurveys,
            token
        });
        const expectedActions = [
            { type: types.REQUEST_DELET_SURVEYS },
            { type: types.RECIEVE_DELETE_SURVEYS_SUCCESS },
            { type: types.REMOVE_SELECTED_SURVEYS },
            { type: types.REMOVE_SELECTED_SURVEYS },
            { type: types.REQUEST_SURVEYS_LIST }
        ];

        return store.dispatch(actions.deleteSurvey())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create an action to export survey', () => {
        const account = {
            accountid: 'facebook-xxxxxx',
            username: 'Mr. Test',
            role: 'Admin'
        };
        const selectedUser = {};
        const selectedSurveys = '11111-0000-2222-3333';
        const token = 'xxxxxxx';

        nock(Config.baseURL, {
            reqheaders: { 'authorization': token }
        })
        .get(`/api/v1/mgnt/report/${account.accountid}/${selectedSurveys}`)
        .reply(200, {
            accountid: account.accountid,
            surveyid: selectedSurveys,
            subject: 'Hello World',
            datetime: Date.now(),
            survey: {
                content: [],
                thankyou: {
                    privacy: {}
                },
                format: 'v1'
            },
            data:[]
        });

        const store = mockStore({
            account,
            selectedUser,
            selectedSurveys,
            token
        });
        const expectedActions = [
            { type: types.REQUEST_REPORT },
            { type: types.RECIEVE_REPORT_SUCCESS }
        ];

        return store.dispatch(actions.exportSurvey())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create an action to duplicate survey', () => {
        const account = {
            accountid: 'facebook-xxxxxx',
            username: 'Mr. Test',
            role: 'Admin'
        };
        const subject = 'Hello';
        const selectedSurveys = '1111-2222-3333';
        const questions = [{
            page: 1,
            description: 'I am Page 1',
            question: [{
                id: '1AN2AL0F9BNA7A',
                type: 'rating',
                label: 'Testing question text',
                data: [
                    { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Dissatisfied' },
                    { value: '1APPJND2CYBHCD9V0FEBA', label: 'Satisfied' }
                ],
                input: 'Tell us the reason why you choose this answer',
                required: false
            }]
        }];

        nock(Config.baseURL, {
            reqheaders: { 'Cache-Control': 'max-age=0' }
        })
        .get(`/api/v1/surveys/${account.accountid}/${selectedSurveys}`)
        .reply(200, {
            surveyid: selectedSurveys,
            subject,
            survey: {
                content: questions,
                thankyou: {}
            }
        });

        const store = mockStore({ account, selectedSurveys });
        const expectedActions = [
            { type: types.REQUEST_COPY_SURVEY }
        ];

        return store.dispatch(actions.copySurvey())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
