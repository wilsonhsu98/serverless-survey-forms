
// CSS
// import styles from './style.css';

import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import * as types from '../../../constants/DragTypes';

const dropTarget = {
    canDrop: function() {
        return true;
    },

    hover: function(props, monitor) {
        const { id:draggedId, page:draggedPage } = monitor.getItem();
        const overId = props.data.id;
        const overPage = props.page;

        if (draggedId !== overId || draggedPage !== overPage) {
            const overIndex = props.getQuestion(overId).index;
            props.moveQuestion(draggedId, overPage, overIndex);
        }
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Item extends Component {
    render() {
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(<div>{this.props.children}</div>);
    }
}

export default DropTarget(types.DRAG_QUESTION, dropTarget, collect)(Item);
