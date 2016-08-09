import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Rating from '../../../portal/src/components/Form/Rating';
import Question from '../../../portal/src/components/Form/Question';

DomMock('<html><body></body></html>');

describe('[Portal] Testing Form Rating Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        data: {
            id: '97AN2A1A0FBNAL',
            type: 'rating',
            label: 'Question title',
            data: [
                { value: '1A0F97AN2ABAGR', label: 'Very dissatisfied' },
                { value: '1A0F97AN2A3FEF', label: 'Dissatisfied' },
                { value: '1A0F97AN2A6E3V', label: 'Satisfied' },
                { value: '1A0F97AN25H69O', label: 'Very satisfied' }
            ],
            input: 'Tell me the reason.',
            required: false
        },
        onClick: () => {}
    };
    const content = TestUtils.renderIntoDocument(
        <Rating {...props} />
    );

    it('rating: question type', () => {
        const que = TestUtils.scryRenderedComponentsWithType(content, Question);
        expect(que.length).toEqual(1);
        expect(que[0].props.text).toEqual(props.data.label);
    });

    it('rating: option numbers', () => {
        const opt = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-rating');
        expect(opt.length).toEqual(4);
    });

    it('rating: option label numbers', () => {
        const opt = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-label');
        expect(opt.length).toEqual(2);
    });

    it('rating: question input', () => {
        const input = TestUtils.findRenderedDOMComponentWithClass(content, 'ut-input');
        expect(input.getAttribute('placeholder')).toEqual(props.data.input);
    });
});
