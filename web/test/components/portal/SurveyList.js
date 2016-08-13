import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SurveyList from '../../../portal/src/components/List/SurveyList';

DomMock('<html><body></body></html>');

describe('[Portal] Testing SurveyList Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        surveys: [
            {
                accountid: 'facebook-00000',
                subject: 'I am Questionnaire',
                surveyid: '11111-0000-2222-3333',
                datetime: 1470380181870
            },{
                accountid: 'facebook-00000',
                subject: 'TODOS',
                surveyid: '2222-3333-4444-0000',
                datetime: 1470301920229
            }],
        selectedSurveys: '2222-3333-4444-0000',
        questionsActions: () => {},
        surveysActions: {
            toggleSelectedSurveys: (val) => {
                props.selectedSurveys = val;
            }
        }
    };
    const content = TestUtils.renderIntoDocument(
        <SurveyList {...props} />
    );

    it('survey list: count surveys number', () => {
        const list = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-list');
        expect(list.length).toEqual(2);
    });

    it('survey list: selected survey', () => {
        const input = TestUtils.scryRenderedDOMComponentsWithTag(content, 'input');
        expect(input[0].checked).toEqual(false);
        expect(input[1].checked).toEqual(true);
    });

    it('survey list: change selected survey', () => {
        const input = TestUtils.scryRenderedDOMComponentsWithTag(content, 'input');
        TestUtils.Simulate.change(input[0]);
        expect(props.selectedSurveys).toEqual(input[0].value);
    });
});
