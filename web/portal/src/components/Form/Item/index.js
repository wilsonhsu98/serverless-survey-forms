
import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import * as types from '../../../constants/DragTypes';

import Radio from '../Radio';
import Checkbox from '../Checkbox';
import Rating from '../Rating';

const dragSource = {
    beginDrag: function beginDrag(props) {
        // What you return is the only information available
        // to the drop targets about the drag source
        // so it's important to pick the minimal data they need to know.
        // You may be tempted to put a reference to the component into it,
        // but you should try very hard to avoid doing this
        // because it couples the drag sources and drop targets.
        return {
            id: props.data.id,
            page: props.page,
            originalIndex: props.getQuestion(props.data.id).index
        };
    },
    endDrag: function endDrag(props, monitor) {
        // You can check whether the drop was successful
        // or if the drag ended but nobody handled the drop
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            const { id: droppedId, page: droppedPage, originalIndex } = monitor.getItem();
            props.moveQuestion(droppedId, droppedPage, originalIndex);
        }
        // save Question
        props.questionsActions.saveQuestion();
    }
};

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

const dropTarget = {
    canDrop: function canDrop() {
        return true;
    },

    hover: function hover(props, monitor) {
        const { id: draggedId, page: draggedPage } = monitor.getItem();
        const overId = props.data.id;
        const overPage = props.page;

        if (draggedId !== overId || draggedPage !== overPage) {
            const overIndex = props.getQuestion(overId).index;
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

class Item extends Component {

    constructor() {
        super();
        this._renderQuestion = this._renderQuestion.bind(this);
        this._onClickItem = this._onClickItem.bind(this);
        this._onCopyHandle = this._onCopyHandle.bind(this);
        this._onDeleteHandle = this._onDeleteHandle.bind(this);
    }

    render() {
        const { data, editQuestion, isOver,
            connectDragPreview, connectDragSource, connectDropTarget } = this.props;

        return connectDragPreview(connectDropTarget(
            <div
                className={`questionItem ${data.id === editQuestion.id ? 'edit' : ''}`}
                style={{
                    opacity: isOver ? 0.1 : 1
                }}
            >
                {this._renderQuestion()}
                <div className="control">
                    {connectDragSource(
                        <button
                            className="button"
                            style={{ cursor: 'move' }}
                        >
                            Move
                        </button>
                    )}
                    <button
                        className="button"
                        onClick={this._onCopyHandle}
                    >Copy</button>
                    <button
                        className="button"
                        onClick={this._onDeleteHandle}
                    >Remove</button>
                </div>
            </div>
        ));
    }

    _renderQuestion() {
        const { data, editQuestion } = this.props;
        const itemData = data.id === editQuestion.id ? editQuestion : data;
        let obj;
        switch (itemData.type) {
        case 'radio':
            obj = (<Radio data={itemData} onClick={this._onClickItem} />);
            break;
        case 'checkbox':
            obj = (<Checkbox data={itemData} onClick={this._onClickItem} />);
            break;
        case 'rating':
            obj = (<Rating data={itemData} onClick={this._onClickItem} />);
            break;
        default:
            obj = (<div>{JSON.stringify(itemData)}</div>);
        }
        return obj;
    }

    _onClickItem() {
        const { data, editQuestionActions } = this.props;
        editQuestionActions.setEditQuestion(data);
    }

    _onCopyHandle() {
        const { idx, page, questionsActions } = this.props;
        questionsActions.copyQuestion(page, idx);
        // save Question
        questionsActions.saveQuestion();
    }

    _onDeleteHandle() {
        const { idx, page, questionsActions } = this.props;
        questionsActions.deleteQuestion(page, idx);
        // save Question
        questionsActions.saveQuestion();
    }
}

export default DragSource(types.DRAG_QUESTION, dragSource, dragCollect)(
    DropTarget(types.DRAG_QUESTION, dropTarget, dropCollect)(Item)
);
