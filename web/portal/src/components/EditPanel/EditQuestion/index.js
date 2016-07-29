
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import * as values from '../../../constants/DefaultValues';
import Select from '../../Select';
import EditMultiOptions from '../EditMultiOptions';
import Button from '../../Button';

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
        this._onAdvanceChangeHandle = this._onAdvanceChangeHandle.bind(this);
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
                        <Button
                            string="Save"
                            i18nKey={false}
                            color="ruby"
                            onClick={this._btnClickEvent}
                            extraProps={{ 'data-type': 'save' }}
                        />
                        <Button
                            string="Cancel"
                            i18nKey={false}
                            onClick={this._btnClickEvent}
                            extraProps={{ 'data-type': 'cancel' }}
                        />
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
        const flag = editQuestion.hasOwnProperty('input');
        const input = flag ? editQuestion.input : values.PLACEHOLDER_TITLE;

        return (
            <div className={`${styles.editSection} ut-advance`}>
                <div className={styles.title}>Advanced Option Settings</div>

                <div className={styles.item}>
                    <input
                        id="chk"
                        type="checkbox"
                        className="ut-chk"
                        checked={flag}
                        onChange={this._onAdvanceChangeHandle}
                    />
                    <label>
                        Show "Tell Me Why"<span>&nbsp;-&nbsp;</span>
                    </label>
                    <input
                        id="why"
                        type="text"
                        value={input}
                        placeholder={values.PLACEHOLDER_TITLE}
                        onChange={this._onAdvanceChangeHandle}
                    />
                </div>
            </div>
        );
    }

    _btnClickEvent(e) {
        const { questionsActions, editQuestionActions } = this.props;
        if (e.currentTarget.getAttribute('data-type') === 'cancel') {
            editQuestionActions.stopEditQuestion();
        } else if (e.currentTarget.getAttribute('data-type') === 'save') {
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

    _onAdvanceChangeHandle() {
        const { editQuestion, editQuestionActions } = this.props;
        const flag = $('#chk').is(':checked');
        const input = $('#why').val();
        const newData = Object.assign({}, editQuestion);
        if (flag) {
            newData.input = input || values.PLACEHOLDER_TITLE;
            this._handleChangeEvent(newData);
        } else {
            delete newData.input;
            editQuestionActions.deleteRatingInput();
        }
    }
}

export default EditQuestion;
