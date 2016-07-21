/**
 * @module Feedback
 * Feedback form component
 * Will handle form components render according to data
 *
 **/
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import I18Next from 'i18next';

import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Select from '../Select';
import Text from '../Text';
import Textarea from '../Textarea';
import Rating from '../Rating';
import Privacy from '../Privacy';
import Pagination from '../Pagination';

class Feedback extends PureComponent {

    constructor(props) {
        super(props);
        this._renderSurvey = this._renderSurvey.bind(this);
        this._renderThankyou = this._renderThankyou.bind(this);
        this._onChangeHandle = this._onChangeHandle.bind(this);
    }

    render() {
        return (
            <div ref="root" className={styles.wrap}>
                {this.props.done ? this._renderThankyou() : this._renderSurvey()}
            </div>
        );
    }

    _renderSurvey() {
        const { paging, surveyActions, feedbackActions } = this.props;
        const { content } = this.props.survey;

        const currentPageContent = content[paging - 1];
        const { description, question } = currentPageContent;
        const list = question.map(
            (itm, idx) => this._renderQuestion(itm, idx));
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                {I18Next.t(this.props.survey.title)}
                </div>
                <div className={styles.contentScroll}>
                    <div className={styles.content}>
                    {
                        description ?
                            <div className={styles.description}>{description}</div> :
                            ''
                    }
                        <div>{list}</div>
                    </div>
                </div>
                {
                content.length > 1 ?
                    <Pagination
                        pages={content.length}
                        currentPage={paging}
                        surveyActions={surveyActions}
                        feedbackActions={feedbackActions}
                    /> :
                    ''
                }
            </div>
        );
    }

    _renderQuestion(item, idx) {
        const requiredProps = {
            id: item.order,
            key: idx,
            item: item,
            onChangeHandle: this._onChangeHandle
        };
        switch (item.type) {
        case 'radio':
            return (<Radio {...requiredProps} />);
        case 'checkbox':
            return (<Checkbox {...requiredProps} />);
        case 'text':
            return (<Text {...requiredProps} />);
        case 'textarea':
            return (<Textarea {...requiredProps} />);
        case 'select':
            return (<Select {...requiredProps} />);
        case 'scale':
            return (<Rating {...requiredProps} />);
        default:
            return (<div key={idx + 1}>Can't find the survey component: {item.type}</div>);
        }
    }

    _renderThankyou() {
        const { description, privacy } = this.props.survey.thankyou;
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                {I18Next.t(this.props.survey.title)}
                </div>
                <div className={styles.contentScroll}>
                    <div className={styles.content}>
                    {
                        description ?
                            <div className={styles.description}>{description}</div> :
                            ''
                    }
                        <Privacy info={privacy} />
                    </div>
                </div>
            </div>

        );
    }

    _onChangeHandle(feedback) {
        // Add feedback to store
        this.props.feedbackActions.recordFeedback(feedback);
    }
}

export default Feedback;
