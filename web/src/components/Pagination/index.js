/**
 * @module Pagination
 * Pagination component, only appeared if paging is more than one
 *
 **/
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';
import I18Next from 'i18next';
import classNames from 'classnames';

class Pagination extends PureComponent {

    constructor() {
        super();
        this._goToPage = this._goToPage.bind(this);
        this._prev = this._prev.bind(this);
        this._next = this._next.bind(this);
    }

    render() {
        const { currentPage, pages } = this.props;
        const pageItems = [];
        for (let i = 1; i < pages + 1; i++) {
            pageItems.push((
                <li
                    key={`paging${i}`}
                    className={
                        currentPage === i ?
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
            pages > 1 ?
            (
                <div className="ut-pagination">
                    {
                        currentPage > 1 ?
                            <div
                                className={classNames({
                                    [`${styles.prev}`]: true,
                                    'ut-prev': true
                                })}
                                onClick={this._prev}
                            >
                            {
                                I18Next.t('prev')
                            }
                            </div> : ''
                    }
                    {
                        currentPage < pages ?
                            <div
                                className={classNames({
                                    [`${styles.next}`]: true,
                                    'ut-next': true
                                })}
                                onClick={this._next}
                            >
                            {
                                I18Next.t('next')
                            }
                            </div> : ''
                    }
                    <ul className={styles.paging}>
                        {pageItems}
                    </ul>
                </div>
            ) : <div />
        );
    }

    _goToPage(e) {
        this.props.surveyActions.goToPage($(e.target).data('index'));
    }

    _prev() {
        this.props.surveyActions.goToPage(this.props.currentPage - 1);
    }

    _next() {
        this.props.surveyActions.goToPage(this.props.currentPage + 1);
    }
}

Pagination.PropTypes = {
    pages: PropTypes.number.isRequired,
    currentPage: PropTypes.number
};

Pagination.defaultProps = {
    currentPage: 1
};

export default Pagination;
