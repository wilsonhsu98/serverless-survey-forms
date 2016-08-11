
// CSS
import styles from './style.css';

import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import * as types from '../../../constants/DragTypes';

import Item from '../Item';
import IconButton from '../../IconButton';

const dropTarget = {
    canDrop: function canDrop() {
        return true;
    },

    hover: function hover(props, monitor) {
        const { id: draggedId, page: draggedPage } = monitor.getItem();
        const overId = 0;
        const overPage = props.data.page;

        if (draggedId !== overId || draggedPage !== overPage) {
            const overIndex = props.getQuestion(overId).index || props.data.question.length;
            props.moveQuestion(draggedId, overPage, overIndex);
        }
    }
};

function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Pagination extends Component {

    constructor() {
        super();
        this._onAddQueClick = this._onAddQueClick.bind(this);
        this._onEditPageClick = this._onEditPageClick.bind(this);
    }

    render() {
        const { id, data, editPage, connectDropTarget } = this.props;
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
                    {connectDropTarget(
                        <button
                            className={`${styles.addBtn} ut-btn`}
                            onClick={this._onAddQueClick}
                        >
                            + Add Question
                        </button>
                    )}
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
