
// CSS
import styles from './style.css';

import React, { Component } from 'react';

import * as values from '../../../constants/DefaultValues';
import Mixins from '../../../mixins/global';
import Item from '../Item';
import IconButton from '../../IconButton';

class Pagination extends Component {

    constructor() {
        super();
        this._onAddQueClick = this._onAddQueClick.bind(this);
        this._onEditPageClick = this._onEditPageClick.bind(this);
    }

    render() {
        const { id, data, editPage } = this.props;
        const list = [];
        data.question.forEach((question, idx) => {
            list.push(this._renderQuestion(question, idx));
        });
        const description = editPage.page === data.page ? editPage.description : data.description;

        return (
            <div className={styles.page}>
                <div className={styles.header}>
                    <div
                        className={`${styles.title} ut-page`}
                        data-type="text"
                        onClick={this._onEditPageClick}
                    >
                        Page {id}:{description}
                    </div>
                    <div className={styles.control}>
                        <IconButton
                            i18nKey={false}
                            img="preview"
                            onClick={this._onEditPageClick}
                            extraProps={{ 'data-type': 'preview' }}
                        />
                        <IconButton
                            i18nKey={false}
                            img="move"
                            onClick={this._onEditPageClick}
                            extraProps={{ 'data-type': 'order' }}
                        />
                        <IconButton
                            i18nKey={false}
                            img="copy"
                            onClick={this._onEditPageClick}
                            extraProps={{ 'data-type': 'copy' }}
                        />
                        <IconButton
                            i18nKey={false}
                            img="delete"
                            onClick={this._onEditPageClick}
                            extraProps={{ 'data-type': 'delete' }}
                        />
                    </div>
                </div>
                <div className={styles.box}>
                    {list}
                    <button className={`${styles.addBtn} ut-btn`} onClick={this._onAddQueClick}>
                        + Add Question
                    </button>
                </div>
            </div>
        );
    }

    _renderQuestion(question, idx) {
        const { data, editQuestion, questionsActions,
            editQuestionActions, moveQuestion, getQuestion } = this.props;
        const requiredProps = {
            key: idx,
            idx,
            page: data.page,
            data: question,
            editQuestion,
            questionsActions,
            editQuestionActions,
            moveQuestion,
            getQuestion
        };
        return (<Item {...requiredProps} />);
    }

    _onAddQueClick() {
        const { data, questionsActions } = this.props;
        const question = {
            id: Mixins.generateQuestionID(),
            type: 'radio',
            label: values.QUESTION_TITLE,
            data: [
                { value: '1', label: values.OPTION_TITLE }
            ],
            required: true
        };
        questionsActions.addQuestion(data.page, question);
        // save Question
        questionsActions.saveQuestion();
    }

    _onEditPageClick(e) {
        const { surveyID, questions, data,
            questionsActions, editPageActions, orderPageActions, previewActions } = this.props;
        const type = e.currentTarget.getAttribute('data-type');
        const orderPage = [];

        switch (type) {
        case 'order':
            questions.forEach((page) => {
                orderPage.push(page.page);
            });
            orderPageActions.setOrderPage(orderPage);
            break;
        case 'copy':
            questionsActions.copyPage(data.page);
            // save Question
            questionsActions.saveQuestion();
            break;
        case 'text':
            editPageActions.setEditPage({ page: data.page, description: data.description });
            break;
        case 'delete':
            questionsActions.deletePage(data.page);
            // save Question
            questionsActions.saveQuestion();
            break;
        case 'preview':
            previewActions.setPreview('embedded', surveyID);
            break;
        default:
        }
    }

}

export default Pagination;
