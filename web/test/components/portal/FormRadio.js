import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Radio from '../../../portal/src/components/Form/Radio';
import Question from '../../../portal/src/components/Form/Question';

DomMock('<html><body></body></html>');

describe('[Portal] Testing Form Radio Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        data: {
            id: '97AN2A1A0FBNAL',
            type: 'radio',
            label: 'Question title',
            data: [
                { value: '1A0F97AN2ABAGR', label: 'Option A' },
                { value: '1A0F97AN2A6E3V', label: 'Option B' },
                { value: '1A0F97AN2AO03T', label: 'Option C', input: 'Why' }
            ],
            required: false
        },
        onClick: () => {}
    };
    const content = TestUtils.renderIntoDocument(
        <Radio {...props} />
    );

    it('radio: question type', () => {
        const que = TestUtils.scryRenderedComponentsWithType(content, Question);
        expect(que.length).toEqual(1);
        expect(que[0].props.text).toEqual(props.data.label);
    });

    it('radio: option numbers', () => {
        const opt = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-radio');
        expect(opt.length).toEqual(3);
    });

    it('radio: option input', () => {
        const input = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-input');
        expect(input.length).toEqual(1);
        expect(input[0].getAttribute('placeholder')).toEqual(props.data.data[2].input);
    });
});
