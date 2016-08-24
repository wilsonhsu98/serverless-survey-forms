
// CSS
import styles from './style.css';

import React from 'react';
import $ from 'jquery';

import * as values from '../../../constants/DefaultValues';
import FixComponent from '../../FixComponent';
import Select from '../../Select';
import EditMultiOptions from '../EditMultiOptions';
import Button from '../../Button';

class EditQuestion extends FixComponent {

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
        this._handleFocusEvent = this._handleFocusEvent.bind(this);
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
                        className="ut-editQuestion teaxarea"
                        type="text"
                        value={editQuestion.label}
                        onChange={this._onTitleChange}
                        onFocus={this._handleFocusEvent}
                        rows="2"
                    ></textarea>
                    <div className="input__msg js-title-msg"></div>
                </div>
            </div>
        );
    }

    _renderType() {
        const { editQuestion } = this.props;
        const item = [
            { value: 'radio', label: 'Radio Button' },
            { value: 'checkbox', label: 'Checkbox' },
            { value: 'rating', label: 'Rating (Likert Scale)' }];
        return (
            <div className={styles.editSection}>
                <div className={styles.title}>Question Type</div>
                <div className={styles.select}>
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
        const input = flag ? editQuestion.input : '';

        return (
            <div className={`${styles.editSection} ut-advance`}>
                <div className={styles.title}>Advanced Option Settings</div>

                <div className={`${styles.checkboxItem} checkboxItem`}>
                    <input
                        id="chk"
                        type="checkbox"
                        className={`${styles.input} ut-chk input`}
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
                        className={`${styles.input__why} input input--medium`}
                        placeholder={values.PLACEHOLDER_TITLE}
                        onChange={this._onAdvanceChangeHandle}
                        readOnly={!flag}
                    />
                </div>
            </div>
        );
    }

    _btnClickEvent(e) {
        const { questionsActions, editQuestionActions } = this.props;
        // Clear all error msg
        $('.js-title-msg, .js-opt-msg, .js-optInput-msg').html('');

        if (e.currentTarget.getAttribute('data-type') === 'cancel') {
            editQuestionActions.stopEditQuestion();
        } else if (e.currentTarget.getAttribute('data-type') === 'save') {
            // Error handling
            let flag = false;
            let opt;
            // Check question
            const questionTxt = document.getElementById('editQuestion');
            if (questionTxt.value === '') {
                $('.js-title-msg').html('Please fill question');
                flag = true;
            }
            // Check options
            opt = $('input[type=text].js-opt');
            Object.keys(opt).forEach((key) => {
                if (!isNaN(key) && opt[key].value === '') {
                    $('.js-opt-msg').eq(key).html('Please fill option');
                    flag = true;
                }
            });
            // Check options with inputs
            opt = $('input[type=text].js-optInput');
            const optInput = $('input[type=text].js-optInput-input');
            Object.keys(opt).forEach((key) => {
                if (!isNaN(key) && (opt[key].value === '') || (optInput[key].value === '')) {
                    $('.js-optInput-msg').eq(key).html('Please fill option or input');
                    flag = true;
                }
            });

            if (!flag) {
                // save editQuestion to Question
                questionsActions.updateQuestionItem();
                questionsActions.saveQuestion();
                editQuestionActions.stopEditQuestion();
            }
        }
    }

    _onTitleChange(e) {
        const data = { label: e.target.value };
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
        const newData = Object.assign({}, editQuestion);
        if (flag) {
            newData.input = $('#why').val();
            this._handleChangeEvent(newData);
        } else {
            delete newData.input;
            editQuestionActions.deleteRatingInput();
        }
    }

    _handleFocusEvent(e) {
        const { editQuestion } = this.props;
        const target = e.target;
        if (editQuestion.label === values.QUESTION_TITLE) {
            target.value = '';
        }
    }
}

export default EditQuestion;
