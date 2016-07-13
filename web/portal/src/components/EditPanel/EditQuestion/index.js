
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
                    <div>Question Type</div>
                    <div>
                        <select name="questionOpt" id="questionOpt">
                            <option>Radio Buttons</option>
                            <option>Checkboxes</option>
                            <option>Rating(Liert Scale)</option>
                        </select>
                    </div>

                    <div>What question do you want to ask?</div>
                    <div><input
                            id="editQuestion"
                            type="text"
                            value={editQuestion.label}
                            onChange={this._handleChangeEvent}
                        /></div>

                    <div>Multiple Choice Options</div>

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
