
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

import * as types from '../../../constants/DragTypes';

import Item from '../Item';
import IconButton from '../../IconButton';

const dropTarget = {
    drop: function drop(props) {
        return {
            id: '',
            page: props.data.page,
            originalIndex: props.data.question.length
        };
    },
    canDrop: function canDrop() {
        return true;
    },
    hover: function hover(props, monitor, component) {
        const { data, dropQuestion } = props;
        const overPage = data.page;
        const overIndex = data.question.length;
        if (dropQuestion.page !== overPage || dropQuestion.index !== overIndex) {
            component.props.questionsActions.setDropQuestion({ page: overPage, index: overIndex });
        }
    }
};

function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class DropQuestion extends PureComponent {
    render() {
        // empty item for drop position hint
        return (
            <div className="questionGrp ut-dropped">
                <div
                    className="questionItem edit"
                    style={{ height: 200 }}
                >
                    <div
                        className="question"
                        style={{ height: 200 }}
                    ></div>
                </div>
                <div className="questionLine"></div>
            </div>
        );
    }
}

class Pagination extends PureComponent {

    constructor() {
        super();
        this._onAddQueClick = this._onAddQueClick.bind(this);
        this._onEditPageClick = this._onEditPageClick.bind(this);
    }

    render() {
        const { id, data, dropQuestion, editPage, surveyEditable, connectDropTarget } = this.props;
        const list = [];
        data.question.forEach((question, idx) => {
            list.push(this._renderQuestion(question, idx));
        });
        if (dropQuestion.hasOwnProperty('index') && dropQuestion.page === data.page) {
            // add empty item for drop position hint
            list.splice(dropQuestion.index, 0,
                <DropQuestion key={data.question.length} />);
        }
        const description = editPage.page === data.page ? editPage.description : data.description;
        const btnClass = {
            [styles.addBtn]: true,
            'ut-btn': true,
            [styles.disabled]: !surveyEditable
        };

        return (
            <div className={styles.page}>
                <div className={styles.header}>
                    <div
                        className={`${styles.title} ${styles.editable} ut-page`}
                        data-type="text"
                        onClick={this._onEditPageClick}
                    >
                        Page {id}:{description}
                        <div className={styles.line}></div>
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
                            onClick={surveyEditable ? this._onEditPageClick : () => {}}
                            extraProps={{ 'data-type': 'order' }}
                            disabled={!surveyEditable}
                        />
                        <IconButton
                            i18nKey={false}
                            img="copy"
                            onClick={surveyEditable ? this._onEditPageClick : () => {}}
                            extraProps={{ 'data-type': 'copy' }}
                            disabled={!surveyEditable}
                        />
                        <IconButton
                            i18nKey={false}
                            img="delete"
                            onClick={surveyEditable ? this._onEditPageClick : () => {}}
                            extraProps={{ 'data-type': 'delete' }}
                            disabled={!surveyEditable}
                        />
                    </div>
                </div>
                <div className={`${styles.box} ut-box`}>
                    {list}
                    {connectDropTarget(
                        <button
                            className={classNames(btnClass)}
                            onClick={surveyEditable ? this._onAddQueClick : () => {}}
                        >+ Add Question</button>
                    )}
                </div>
            </div>
        );
    }

    _renderQuestion(question, idx) {
        const { data, dropQuestion, editQuestion, surveyEditable, questionsActions,
            editQuestionActions, moveQuestion, getQuestion } = this.props;
        const requiredProps = {
            key: idx,
            idx,
            page: data.page,
            data: question,
            dropQuestion,
            editQuestion,
            surveyEditable,
            questionsActions,
            editQuestionActions,
            moveQuestion,
            getQuestion
        };
        return (<Item {...requiredProps} />);
    }

    _onAddQueClick() {
        const { data, questionsActions } = this.props;
        questionsActions.addQuestion(data.page);
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

export default DropTarget(types.DRAG_QUESTION, dropTarget, dropCollect)(Pagination);
