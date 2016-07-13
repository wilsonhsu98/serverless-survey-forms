
// CSS
import styles from './style.css';

import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import * as types from '../../../constants/DragTypes';
import Question from '../Question';

const dragSource = {
    beginDrag: function(props) {
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
    endDrag: function(props, monitor) {
        // You can check whether the drop was successful
        // or if the drag ended but nobody handled the drop
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            const { id:droppedId, page:droppedPage, originalIndex } = monitor.getItem();
            props.moveQuestion(droppedId, droppedPage, originalIndex);
        }
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Radio extends Component {

    constructor() {
        super();
        this._onClickQuestion = this._onClickQuestion.bind(this);
    }

    render() {
        const { connectDragSource, isDragging, data } = this.props;
        return connectDragSource(
            <div
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move'
                }}
                className="question"
                onClick={this._onClickQuestion}
            >
                <Question
                    text={data.label}
                />
                <div className={styles.radioGrp}>
                    {this._renderRadioItem()}
                </div>
            </div>
        );
    }

    _renderRadioItem() {
        const { data } = this.props;
        const items = data.data.map((itm, idx) => {
            const label = itm.label;
            const input = itm.input;
            return (
                <div
                    className={styles.radioItem}
                    key={idx}
                >
                    <input type="radio" />
                    <label>
                        {label}
                    </label>
                    {
                        input ?
                            <input type="text" placeholder={input} /> :
                            ''
                    }
                </div>
            );
        });
        return items;
    }

    _onClickQuestion() {
        const { data, editQuestionActions } = this.props;
        editQuestionActions.setEditQuestion(data);
    }
}

Radio.PropTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

Radio.defaultProps = {};

export default DragSource(types.DRAG_QUESTION, dragSource, collect)(Radio);
