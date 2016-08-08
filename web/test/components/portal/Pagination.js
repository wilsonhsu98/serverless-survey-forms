import DomMock from '../../helpers/dom-mock';
import { wrapInTestContext } from '../../helpers/dnd-test';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Pagination from '../../../portal/src/components/Form/Pagination';
import Item from '../../../portal/src/components/Form/Item';

DomMock('<html><body></body></html>');

describe('[Portal] Testing Pagination Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        questions: [],
        editQuestion: {},
        editPage: {},
        surveyID: '',
        id: 1,
        data: {
            page: 1,
            description: 'I am Page1',
            question: [ {
                id: '1AN2AL0F9BNA7A',
                type: 'rating',
                label: 'Testing question text',
                data: [
                    { value: 1, label: 'Very dissatisfied' },
                    { value: 2, label: 'Very satisfied' }
                ],
                input: 'Tell us the reason why you choose this answe',
                required: false
            },
            {
                id: '1A0F97AN2ABNAL',
                type: 'radio',
                label: 'Testing',
                data: [
                    { value: 1, label: 'Very dissatisfied' },
                    { value: 2, label: 'Very satisfied' }
                ],
                required: false
            } ]
        },
        questionsActions: {
            addQuestion: (idx, que) => {
                props.data.question.push(que);
            },
            saveQuestion: () => {}
        },
        editQuestionActions: () => {},
        editPageActions: () => {},
        orderPageActions: () => {},
        previewActions: () => {},
        moveQuestion: () => {},
        getQuestion: () => {}
    };

    const PaginationContext = wrapInTestContext(Pagination);
    let contentRoot = TestUtils.renderIntoDocument(<PaginationContext {...props} />);

    it('pagination edit: page number and description', () => {
        const page = TestUtils.findRenderedDOMComponentWithClass(contentRoot, 'ut-page');
        expect(page.textContent).toEqual('Page 1:I am Page1');
    });

    it('pagination edit: checked question numbers', () => {
        const item = TestUtils.scryRenderedComponentsWithType(contentRoot, Item);
        expect(item.length).toEqual(2);
    });

    it('pagination edit: add question', () => {
        const btn = TestUtils.findRenderedDOMComponentWithClass(contentRoot, 'ut-btn');
        TestUtils.Simulate.click(btn);

        contentRoot = TestUtils.renderIntoDocument(<PaginationContext {...props} />);
        const item = TestUtils.scryRenderedComponentsWithType(contentRoot, Item);
        expect(item.length).toEqual(3);
    });
});
