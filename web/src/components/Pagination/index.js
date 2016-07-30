/**
 * @module Pagination
 * Pagination component, only appeared if paging is more than one
 *
 **/
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';
import classNames from 'classnames';
import Button from '../Button';

class Pagination extends PureComponent {

    constructor() {
        super();
        this._goToPage = this._goToPage.bind(this);
        this._prev = this._prev.bind(this);
        this._next = this._next.bind(this);
        this._done = this._done.bind(this);
    }

    render() {
        const { settings, currentPage, pages } = this.props;
        return (
            pages > 1 ?
            (
                <div
                    className={classNames({
                        [`${styles.pagination}`]: settings.type !== 'preview',
                        [`${styles.paginationPreview}`]: settings.type === 'preview',
                        'ut-pagination': true
                    })}
                >

                    {
                        currentPage > 1 ?
                            <div
                                className={
                                    settings.type === 'preview' ?
                                        styles.btnWrapperPrevPreview : styles.btnWrapperPrev
                                }
                            >
                                <Button
                                    string={'prev'}
                                    onClick={this._prev}
                                    extraClass={{
                                        'ut-prev': true,
                                        [`${styles.pagingBtnPrev}`]: true
                                    }}
                                />
                            </div> : ''
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
                            <div
                                className={
                                    settings.type === 'preview' ?
                                        styles.btnWrapperNextPreview : styles.btnWrapperNext
                                }
                            >
                                <Button
                                    string={'next'}
                                    onClick={this._next}
                                    extraClass={{
                                        'ut-next': true,
                                        [`${styles.pagingBtnNext}`]: true
                                    }}
                                />
                            </div> : ''
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
                    {
                        currentPage === pages ?
                            <div
                                className={
                                    settings.type === 'preview' ?
                                        styles.btnWrapperNextPreview : styles.btnWrapperNext
                                }
                            >
                                <Button
                                    string={'submit'}
                                    onClick={this._done}
                                    extraClass={{
                                        'ut-done': true,
                                        [`${styles.pagingBtnNext}`]: true
                                    }}
                                />
                            </div> : ''
                    }
                    {
                        currentPage === pages ?
                            <div
                                className={classNames({
                                    [`${styles.doneMobile}`]: true,
                                    'ut-done': true
                                })}
                                onClick={this._done}
                            /> : ''
                    }
                    <div
                        className={
                            settings.type === 'preview' ?
                                styles.progressWrapperPreview : styles.progressWrapper
                        }
                    >
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
        if (this.props.settings.type !== 'preview') {
            if (this.props.currentPage === 1) {
                this.props.feedbackActions.saveFeedback();
            } else {
                this.props.feedbackActions.updateFeedback();
            }
        }
        this.props.surveyActions.goToPage(this.props.currentPage + 1);
    }

    _done() {
        if (this.props.settings.type !== 'preview') {
            if (this.props.currentPage === 1) {
                this.props.feedbackActions.saveFeedback();
            } else {
                this.props.feedbackActions.updateFeedback();
            }
        }
        this.props.surveyActions.surveyDone();
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
