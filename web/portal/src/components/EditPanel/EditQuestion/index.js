
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class EditQuestion extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
    }

    render() {
        // TODOS: add options item with questions
        const { editQuestion } = this.props;
        return (
            <div className="modalEditPanel">
                <div id="editPanel" className="editpanel">
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

                    <div className="bottom">
                        <button
                            data-type="save"
                            className="actionBtn"
                            onClick={this._btnClickEvent}
                        >
                            Save
                        </button>
                        <button
                            data-type="cancel"
                            className="actionBtn"
                            onClick={this._btnClickEvent}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    _btnClickEvent(e) {
        if (e.target.getAttribute('data-type') === 'cancel') {
            const { editQuestionActions } = this.props;
            editQuestionActions.stopEditQuestion();
        }
    }

    _handleChangeEvent(e) {
        const { editQuestion, questionsActions, editQuestionActions } = this.props;
        const data = { label: e.target.value || 'Untitle Question' };
        questionsActions.editQuestion(editQuestion.id, data);
        editQuestionActions.setEditQuestion(data);
    }
}

export default EditQuestion;
