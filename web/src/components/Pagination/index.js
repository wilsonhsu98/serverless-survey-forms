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
        return (
            pages > 1 ?
            (
                <div
                    className={classNames({
                        [`${styles.pagination}`]: true,
                        'ut-pagination': true
                    })}
                >
                    <div className={styles.btnWrapper}>
                    {
                        currentPage > 1 ?
                            <button
                                className={classNames({
                                    [`${styles.prev}`]: true,
                                    'ut-prev': true
                                })}
                                onClick={this._prev}
                            >
                            {
                                I18Next.t('prev')
                            }
                            </button> : ''
                    }
                    {
                        currentPage > 1 ?
                            <div
                                className={classNames({
                                    [`${styles.prevMobile}`]: true,
                                    'ut-prev': true
                                })}
                                onClick={this._prev}
                            /> : ''
                    }
                    {
                        currentPage < pages ?
                            <button
                                className={classNames({
                                    [`${styles.next}`]: true,
                                    'ut-next': true
                                })}
                                onClick={this._next}
                            >
                            {
                                I18Next.t('next')
                            }
                            </button> : ''
                    }
                    {
                        currentPage < pages ?
                            <div
                                className={classNames({
                                    [`${styles.nextMobile}`]: true,
                                    'ut-next': true
                                })}
                                onClick={this._next}
                            /> : ''
                    }
                    </div>
                    <div className={styles.progressWrapper}>
                        <span className={styles.progressText}>{`${currentPage} / ${pages}`}</span>
                        <div
                            className={classNames({
                                [`${styles.progress}`]: (currentPage / pages) !== 1,
                                [`${styles.progressComplete}`]: (currentPage / pages) === 1
                            })}
                            style={{
                                width: `${((currentPage / pages) * 100)}%`
                            }}
                        />
                    </div>
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
