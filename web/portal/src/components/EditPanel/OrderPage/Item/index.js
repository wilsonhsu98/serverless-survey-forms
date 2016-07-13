
// CSS
import styles from './../style.css';

import React from 'react';
import { findDOMNode } from 'react-dom';
import PureComponent from 'react-pure-render/component';
import { DragSource, DropTarget } from 'react-dnd';

import * as types from '../../../../constants/DragTypes';

const dragSource = {
    beginDrag: function(props) {
        return {
            index: props.id
        };
    }
};

const dropTarget = {
    hover: function(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.id;

        if (dragIndex === hoverIndex) return;

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        // Time to actually perform the action
        props.moveItem(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Item extends PureComponent {
    render() {
        const { page, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0.5 : 1;

        return connectDragSource(connectDropTarget(
            <div className={styles.item} style={{ opacity }}>
                Page #{page.page}:&nbsp;
                <span className={styles.title}>{page.description}</span>
                <button className="button">Drag</button>
            </div>
        ));
    }
}

export default DragSource(types.DRAG_PAGE, dragSource, dragCollect)(
    DropTarget(types.DRAG_PAGE, dropTarget, dropCollect)(Item)
);
