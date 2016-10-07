import '../../helpers/env';
import DomMock from '../../helpers/dom-mock';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../portal/src/actions/questions';
import * as types from '../../../portal/src/constants/ActionTypes';
import * as values from '../../../portal/src/constants/DefaultValues';
import Config from '../../../portal/src/config';

const mockStore = configureStore([thunkMiddleware]);

describe('[Portal] questions action', () => {
    let questions = [];
    beforeEach(() => {
        questions = [{
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
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action to set survey ID', () => {
        const surveyID = '11111-0000-2222-3333';
        expect(
            actions.setSurveyID(surveyID)
        ).toEqual({
            type: types.SET_SURVEYID,
            surveyID
        });
    });

    it('should create an action to finish edit question', () => {
        const store = mockStore({
            selectedUser: {}
        });
        const expectedActions = [
            { type: types.SET_SURVEYID, surveyID: '' },
            { type: types.SET_SUBJECT, subject: '' },
            { type: types.INIT_QUESTIONS },
            { type: types.INIT_SURVEY_POLICY },
            { type: types.SET_WEBPAGE, webpage: 'index' }
        ];

        store.dispatch(actions.finishEdit());
        expect(
            store.getActions()
        ).toEqual(expectedActions);
    });

    it('should create an action to add question', () => {
        const store = mockStore({ questions });

        store.dispatch(actions.addQuestion(1));
        const result = store.getActions();
        expect(result[0].type).toEqual(types.ADD_QUESTION);
        expect(result[0].questions[0].question.length).toEqual(2);
    });

    it('should create an action to update question', () => {
        const editQuestion = {
            id: '1AN2AL0F9BNA7A',
            type: 'radio',
            label: 'Hello World',
            data: [
                { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Dissatisfied' },
                { value: '1APPJND2CYBHCD9V0FEBA', label: 'Satisfied' }
            ],
            input: 'Tell us the reason why you choose this answer',
            required: false
        };
        const store = mockStore({ questions, editQuestion });

        store.dispatch(actions.updateQuestionItem());
        const result = store.getActions();
        expect(result[0].type).toEqual(types.EDIT_QUESTION);
        expect(result[0].questions[0].question[0]).toEqual(editQuestion);
    });

    it('should create an action to copy question', () => {
        const store = mockStore({ questions });

        store.dispatch(actions.copyQuestion(1, 0));
        const result = store.getActions();
        expect(result[0].type).toEqual(types.COPY_QUESTION);

        expect(result[0].questions[0].question.length).toEqual(2);

        expect(
            result[0].questions[0].question[1].label
        ).toEqual(result[0].questions[0].question[0].label);

        expect(
            result[0].questions[0].question[1].id
        ).toNotEqual(result[0].questions[0].question[0].id);
    });

    it('should create an action to delete question', () => {
        const store = mockStore({ questions });

        store.dispatch(actions.deleteQuestion(1, 0));
        expect(
            store.getActions()
        ).toEqual([{
            type: types.DELETE_QUESTION,
            questions: [{
                page: 1,
                description: 'I am Page 1',
                question: []
            }]
        }]);
    });

    it('should create an action to exchange question', () => {
        const ExQuestions = [{
            page: 1,
            description: 'I am Page 1',
            question: [{
                id: 'AAAAAA',
                type: 'checkbox',
                label: 'Testing checkbox text',
                data: [],
                input: '',
                required: false
            }, {
                id: 'BBBBBB',
                type: 'rating',
                label: 'Testing rating text',
                data: [],
                input: '',
                required: false
            }]
        }];
        const store = mockStore({ questions: ExQuestions });
        store.dispatch(
            actions.exchangeQuestion(1, 1, 1, 0, {
                id: 'BBBBBB',
                type: 'rating',
                label: 'Testing rating text',
                data: [],
                input: '',
                required: false
            })
        );
        expect(
            store.getActions()
        ).toEqual([{
            type: types.EXCHANGE_QUESTION,
            questions: [{
                page: 1,
                description: 'I am Page 1',
                question: [{
                    id: 'BBBBBB',
                    type: 'rating',
                    label: 'Testing rating text',
                    data: [],
                    input: '',
                    required: false
                }, {
                    id: 'AAAAAA',
                    type: 'checkbox',
                    label: 'Testing checkbox text',
                    data: [],
                    input: '',
                    required: false
                }]
            }]
        }]);
    });

    it('should create an action to add page', () => {
        expect(
            actions.addPage(2)
        ).toEqual({
            type: types.ADD_PAGE,
            page: {
                page: 2,
                description: values.PAGE_TITLE,
                question: []
            }
        });
    });

    it('should create an action to copy page', () => {
        const store = mockStore({ questions });

        store.dispatch(actions.copyPage(1));
        const result = store.getActions();
        expect(result[0].type).toEqual(types.COPY_PAGE);
        expect(result[0].questions.length).toEqual(2);
        expect(result[0].questions[0].description).toEqual(result[0].questions[1].description);
        expect(result[0].questions[1].page).toEqual(2);
    });

    it('should create an action to edit page title', () => {
        const store = mockStore({
            questions,
            editPage: {
                page: 1,
                description: 'Hello'
            }
        });

        store.dispatch(actions.editPageTitle());
        expect(
            store.getActions()
        ).toEqual([{
            type: types.EDIT_PAGE_TITLE,
            questions: [{
                page: 1,
                description: 'Hello',
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
            }]
        }]);
    });

    it('should create an action to delete page', () => {
        questions = [{
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
        }, {
            page: 2,
            description: 'I am Page 2',
            question: []
        }];
        const store = mockStore({ questions });

        store.dispatch(actions.deletePage(1));
        expect(
            store.getActions()
        ).toEqual([{
            type: types.DELETE_PAGE,
            questions: [{
                page: 1,
                description: 'I am Page 2',
                question: []
            }]
        }]);
    });

    it('should create an action to exchange page', () => {
        const ExPage = [
            {
                page: 1,
                description: 'Come from P1',
                question: []
            }, {
                page: 2,
                description: 'Come from P2',
                question: []
            }];
        const store = mockStore({ questions: ExPage, orderPage: [2, 1] });

        store.dispatch(actions.exchangePage());
        expect(
            store.getActions()
        ).toEqual([{
            type: types.EXCHANGE_PAGE,
            questions: [
                {
                    page: 1,
                    description: 'Come from P2',
                    question: []
                }, {
                    page: 2,
                    description: 'Come from P1',
                    question: []
                }]
        }]);
    });

    it('should create an action to save questions success', () => {
        expect(
            actions.saveQuestionsSuccess()
        ).toEqual({
            type: types.SAVE_QUESTIONS_SUCCESS
        });
    });

    it('should create an action to save questions failure', () => {
        global.window = { localStorage: {} };
        const store = mockStore({ surveyID: '', subject: '' });
        const expectedActions = [
            { type: types.EXPIRED_TOKEN },
            { type: types.SAVE_QUESTIONS_FAILURE, errorMsg: 'Error' }
        ];

        store.dispatch(actions.saveQuestionsFailure('Error'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to save questions', () => {
        const account = {
            accountid: 'facebook-xxxxxx',
            username: 'Mr. Test',
            role: 'Admin'
        };
        const surveyID = '1111-2222-3333';
        const subject = 'Hello World';
        const surveyPolicy = {
            description: 'Thanks for sharing your feedback with Trend Micro.',
            privacy: {}
        };
        const selectedUser = {};
        const token = 'xxxxxxx';
        questions = [{
            page: 1,
            description: '',
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
        }];
        const newQuestions = [Object.assign({}, questions[0], { description: values.PAGE_TITLE })];
        const postData = {
            subject: subject,
            survey: {
                format: Config.surveyFormat,
                content: newQuestions,
                thankyou: surveyPolicy
            }
        };

        nock(Config.baseURL, {
            reqheaders: { 'authorization': token }
        })
        .intercept(`/api/v1/mgnt/surveys/${account.accountid}/${surveyID}`, 'PUT', JSON.stringify(postData))
        .reply(200, { datetime: Date.now() });

        const store = mockStore({ account, surveyID, subject, questions, surveyPolicy, selectedUser, token });
        const expectedActions = [
            { type: types.REQUEST_SAVE_QUESTION },
            { type: types.UPDATE_QUESTIONS, questions: newQuestions },
            { type: types.SAVE_QUESTIONS_SUCCESS }
        ];

        return store.dispatch(actions.saveQuestion())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create an action to set survey policy', () => {
        const surveyPolicy = {
            description: 'Thanks for sharing your feedback with Trend Micro.',
            privacy: {}
        };
        expect(
            actions.setSurveyPolicy(surveyPolicy)
        ).toEqual({
            type: types.SET_SURVEY_POLICY,
            surveyPolicy
        });
    });

    it('should create an action to edit survey policy', () => {
        const account = {
            accountid: 'facebook-xxxxxx',
            username: 'Mr. Test',
            role: 'Admin'
        };
        const surveyID = '1111-2222-3333';
        const subject = 'Hello World';
        const surveyPolicy = {
            description: 'Thanks for sharing your feedback with Trend Micro.',
            privacy: {}
        };
        const selectedUser = {};
        const token = 'xxxxxxx';
        const oneQuestion = Object.assign({}, questions[0].question[0], { order: 1 });
        const newQuestions = [Object.assign({}, questions[0], { question: [oneQuestion] })];

        const store = mockStore({ account, surveyID, subject, questions, surveyPolicy, selectedUser, token });
        store.dispatch(actions.editSurveyPolicy(true));
        expect(
            store.getActions()
        ).toEqual([
            {
                type: types.SET_SURVEY_POLICY,
                surveyPolicy: {
                    description: 'Thanks for sharing your feedback with Trend Micro.',
                    privacy: {
                        label: 'If Trend Micro has a follow-up survey on the Email Scan, would you like to participate?',
                        terms: 'Yes, Trend Micro can reach me at this address: ',
                        input: 'Please enter your email address.'
                    }
                }
            },
            { type: types.REQUEST_SAVE_QUESTION },
            {
                type: types.UPDATE_QUESTIONS,
                questions: newQuestions
            }
        ]);
    });

    it('should create an action to get questions success', () => {
        expect(
            actions.receiveQuestionsSuccess(questions)
        ).toEqual({
            type: types.RECIEVE_QUESTIONS_SUCCESS,
            questions
        });
    });

    it('should create an action to get questions failure', () => {
        global.window = { localStorage: {} };
        const store = mockStore({ surveyID: '', subject: '' });
        const expectedActions = [
            { type: types.EXPIRED_TOKEN },
            { type: types.RECIEVE_QUESTIONS_FAILURE, errorMsg: 'Error' }
        ];

        store.dispatch(actions.receiveQuestionsFailure('Error'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create an action to get questions', () => {
        const account = {
            accountid: 'facebook-xxxxxx',
            username: 'Mr. Test',
            role: 'Admin'
        };
        const selectedUser = {};
        const subject = 'Hello';
        const surveyID = '1111-2222-3333';

        nock(Config.baseURL, {
            reqheaders: { 'Cache-Control': 'max-age=0' }
        })
        .get(`/api/v1/surveys/${account.accountid}/${surveyID}`)
        .reply(200, {
            surveyid: surveyID,
            subject,
            survey: {
                content: questions,
                thankyou: {}
            }
        });

        const store = mockStore({ account, selectedUser });
        const expectedActions = [
            { type: types.REQUEST_GET_QUESTION },
            { type: types.SET_SUBJECT, subject },
            { type: types.SET_SURVEY_POLICY, surveyPolicy: {} },
            { type: types.RECIEVE_QUESTIONS_SUCCESS, questions },
            { type: types.SET_SURVEYID, surveyID },
            { type: types.SET_WEBPAGE, webpage: 'userCreate' }
        ];

        return store.dispatch(actions.getQuestion(surveyID))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create an action to set drop question', () => {
        const dropQuestion = {
            page: 1,
            index: 1
        };

        expect(
            actions.setDropQuestion(dropQuestion)
        ).toEqual({
            type: types.SET_DROP_QUESTION,
            dropQuestion
        });
    });

    it('should create an action to stop drop question', () => {
        expect(
            actions.stopDropQuestion()
        ).toEqual({ type: types.STOP_DROP_QUESTION });
    });
});
