
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class EditPanel extends PureComponent {

    componentDidMount() {
        this._mouseClickEvent = this._mouseClickEvent.bind(this);
        this._panelClickEvent = this._panelClickEvent.bind(this);
        this._keyUpEvent = this._keyUpEvent.bind(this);
        window.addEventListener('click', this._mouseClickEvent);
        $('#editPanel').on('click', this._panelClickEvent);
        $('#editQuestion').on('keyup', this._keyUpEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._mouseClickEvent);
        $('#editPanel').off('click', this._panelClickEvent);
        $('#editQuestion').off('keyup', this._keyUpEvent);
    }

    render() {
        // TODOS: add options item with questions
        return (
            <div id="editPanel" className={styles.editpanel}>
                <div>Question: {this.props.editQuestionID}</div>
                <div>Please fill your question:</div>
                <div><input id="editQuestion" type="text" /></div>
                <div>Please choose question type:</div>
                <div>
                    <select name="questionOpt" id="questionOpt">
                        <option>Radio</option>
                        <option>Checkbox</option>
                        <option>Radio with one input</option>
                    </select>
                </div>
                <div>Please choose options:</div>
            </div>
        );
    }

    _mouseClickEvent(e) {
        const { editQuestionIDActions } = this.props;
        if (e.target.id !== 'editPanel') {
            editQuestionIDActions.setEditQuestionID('');
        }
    }

    _panelClickEvent(e) {
        e.stopPropagation();
    }

    _keyUpEvent(e) {
        const { editQuestionID, questionsActions } = this.props;
        const data = { label: e.target.value || 'Untitle Question' };
        questionsActions.editQuestion(editQuestionID, data);
    }
}

export default EditPanel;
