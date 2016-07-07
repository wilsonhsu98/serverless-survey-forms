/**
 * @module Pagination
 * Pagination component, only appeared if paging is more than one
 *
 **/
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class Pagination extends PureComponent {

    constructor() {
        super();
        this._goToPage = this._goToPage.bind(this);
    }

    render() {
        const pages = [];
        for (let i = 1; i < this.props.pages + 1; i++) {
            pages.push((
                <li
                    key={`paging${i}`}
                    className={
                        this.props.currentPage === i ?
                        styles.pagingItemActive :
                        styles.pagingItem
                    }
                    data-index={i}
                    onClick={this._goToPage}
                >
                    {i}
                </li>
            ));
        }
        return (
            <div>
                <ul className={styles.paging}>
                    {pages}
                </ul>
            </div>
        );
    }

    _goToPage(e) {
        this.props.surveyActions.goToPage($(e.target).data('index'));
    }
}

export default Pagination;
