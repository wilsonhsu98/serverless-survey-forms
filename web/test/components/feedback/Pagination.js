import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Pagination from '../../../src/components/Pagination';

DomMock('<html><body></body></html>');

describe('Testing Pagination Component', () => {
    jsdom({ skipWindowCheck: true });

    it('check total pages < 1: No pagination', () => {
        const content = TestUtils.renderIntoDocument(
            <Pagination pages={1} currentPage={1} />
        );
        const component = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-pagination');

        // Expect no component
        expect(component).toEqual([]);
    });

    it('check page one scenario: No prev button', () => {
        const content = TestUtils.renderIntoDocument(
            <Pagination pages={4} currentPage={1} />
        );
        const prevBtn = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-prev');

        // Expect no prev button
        expect(prevBtn).toEqual([]);

    });

    it('check page one scenario: Has next button', () => {
        const content = TestUtils.renderIntoDocument(
            <Pagination pages={4} currentPage={1} />
        );
        const nextBtn = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-next');

        expect(nextBtn[0].textContent).toEqual('Next');
    });

    it('check last page scenario: No next button', () => {
        const content = TestUtils.renderIntoDocument(
            <Pagination pages={4} currentPage={4} />
        );
        const NextBtn = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-next');

        // Expect no prev button
        expect(NextBtn).toEqual([]);
    });

    it('check last page scenario: Has prev button', () => {
        const content = TestUtils.renderIntoDocument(
            <Pagination pages={4} currentPage={4} />
        );
        const PrevBtn = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-prev');

        // Expect no prev button
        expect(PrevBtn[0].textContent).toEqual('Prev');
    });
});
