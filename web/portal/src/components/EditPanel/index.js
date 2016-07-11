
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class EditPanel extends PureComponent {

    constructor() {
        super();

        this._mouseClickEvent = this._mouseClickEvent.bind(this);
        this._panelClickEvent = this._panelClickEvent.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this._mouseClickEvent);
        $('#editPanel').on('click', this._panelClickEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._mouseClickEvent);
        $('#editPanel').off('click', this._panelClickEvent);
    }

    render() {
        // TODOS: add options item with questions
        const { editQuestion } = this.props;
        return (
            <div id="editPanel" className={styles.editpanel}>
                <div>Question: {editQuestion.id}</div>
                <div>Please fill your question:</div>
                <div><input
                        id="editQuestion"
                        type="text"
                        value={editQuestion.label}
                        onChange={this._handleChangeEvent}
                    /></div>
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
        const { editQuestionActions } = this.props;
        if (e.target.id !== 'editPanel') {
            editQuestionActions.stopEditQuestion();
        }
    }

    _panelClickEvent(e) {
        e.stopPropagation();
    }

    _handleChangeEvent(e) {
        const { editQuestion, questionsActions, editQuestionActions } = this.props;
        const data = { label: e.target.value || 'Untitle Question' };
        questionsActions.editQuestion(editQuestion.id, data);
        editQuestionActions.setEditQuestion(data);
    }
}

export default EditPanel;
