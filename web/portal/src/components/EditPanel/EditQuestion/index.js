
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import * as values from '../../../constants/DefaultValues';
import Select from '../../Select';
import EditMultiOptions from '../EditMultiOptions';
import EditAdvance from '../EditAdvance';

class EditQuestion extends PureComponent {

    constructor() {
        super();

        this._renderType = this._renderType.bind(this);
        this._renderTitle = this._renderTitle.bind(this);
        this._renderOptions = this._renderOptions.bind(this);
        this._renderAdvance = this._renderAdvance.bind(this);
        this._onTitleChange = this._onTitleChange.bind(this);
        this._onTypeChange = this._onTypeChange.bind(this);
        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
        this._handleDeleteInput = this._handleDeleteInput.bind(this);
    }

    render() {
        const { editQuestion } = this.props;

        return (
            <div className="modalEditPanel">
                <div id="editPanel" className="editpanel">
                    <div className="edit">
                        <div className="editContent">
                            {this._renderType()}
                            {this._renderTitle()}
                            {this._renderOptions()}
                            {editQuestion.type === 'rating' ? this._renderAdvance() : ''}
                        </div>
                    </div>
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

    _renderTitle() {
        const { editQuestion } = this.props;
        return (
            <div className={styles.editSection}>
                <div className={styles.title}>What question do you want to ask?</div>
                <div>
                    <textarea
                        id="editQuestion"
                        className="ut-editQuestion"
                        type="text"
                        value={editQuestion.label}
                        onChange={this._onTitleChange}
                        rows="2"
                    ></textarea>
                </div>
            </div>
        );
    }

    _renderType() {
        const { editQuestion } = this.props;
        const item = [
            { value: 'radio', label: 'Radio Button' },
            { value: 'checkbox', label: 'Checkbox' },
            { value: 'rating', label: 'Rating (Liert Scale)' }];
        return (
            <div className={styles.editSection}>
                <div className={styles.title}>Question Type</div>
                <div>
                    <Select
                        id="editSelect"
                        item={item}
                        selectedItem={editQuestion.type}
                        onChangeHandle={this._onTypeChange}
                    />
                </div>
            </div>
        );
    }

    _renderOptions() {
        const { editQuestion } = this.props;
        const props = {
            editQuestion,
            handleChangeEvent: this._handleChangeEvent
        };

        return (
            <div className={styles.editSection}>
                <div className={styles.title}>Multiple Choice Options</div>
                {<EditMultiOptions {...props} />}
            </div>
        );
    }

    _renderAdvance() {
        const { editQuestion } = this.props;
        const props = {
            editQuestion,
            handleChangeEvent: this._handleChangeEvent,
            handleDeleteInput: this._handleDeleteInput
        };

        return (
            <div className={`${styles.editSection} ut-advance`}>
                <div className={styles.title}>Advanced Option Settings</div>
                {<EditAdvance {...props} />}
            </div>
        );
    }

    _btnClickEvent(e) {
        const { questionsActions, editQuestionActions } = this.props;
        if (e.target.getAttribute('data-type') === 'cancel') {
            editQuestionActions.stopEditQuestion();
        } else if (e.target.getAttribute('data-type') === 'save') {
            // save editQuestion to Question
            questionsActions.updateQuestionItem();
            questionsActions.saveQuestion();
            editQuestionActions.stopEditQuestion();
        }
    }

    _onTitleChange(e) {
        const data = { label: e.target.value || values.QUESTION_TITLE };
        this._handleChangeEvent(data);
    }

    _onTypeChange(e) {
        const data = { type: e.currentTarget.getAttribute('data-value') || 'radio' };
        this._handleChangeEvent(data);
    }

    _handleChangeEvent(data) {
        const { editQuestionActions } = this.props;
        editQuestionActions.setEditQuestion(data);
    }

    _handleDeleteInput() {
        const { editQuestionActions } = this.props;
        editQuestionActions.deleteRatingInput();
    }
}

export default EditQuestion;
