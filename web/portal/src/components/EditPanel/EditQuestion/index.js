
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import Select from '../../Select';
import EditMultiOptions from '../EditMultiOptions';

class EditQuestion extends PureComponent {

    constructor() {
        super();

        this._renderType = this._renderType.bind(this);
        this._renderTitle = this._renderTitle.bind(this);
        this._renderOptions = this._renderOptions.bind(this);
        this._onTitleChange = this._onTitleChange.bind(this);
        this._onTypeChange = this._onTypeChange.bind(this);
        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
    }

    render() {
        const { editQuestion } = this.props;
        return (
            <div className="modalEditPanel">
                <div id="editPanel" className="editpanel">
                    {this._renderType()}
                    {this._renderTitle()}
                    {this._renderOptions()}
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
        const item = [
            {'value': 'radio', 'label': 'Radio Buttons'},
            {'value': 'checkbox', 'label': 'Checkboxes'},
            {'value': 'rating', 'label': 'Rating(Liert Scale)'}];
        return (
            <div className={styles.editSection}>
                <div className={styles.title}>Question Type</div>
                <div>
                    <Select
                        id="editSelect"
                        item={item}
                        selectedItem="radio"
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
        let editComponent;
        switch(editQuestion.type) {
            case 'radio':
            case 'checkbox':
                editComponent = <EditMultiOptions {...props} />;
                break;
            case 'rating':
                editComponent = '';
                break;
            default:
        }

        return (
            <div className={styles.editSection}>
                <div className={styles.title}>Multiple Choice Options</div>
                {editComponent}
            </div>
        );
    }

    _btnClickEvent(e) {
        if (e.target.getAttribute('data-type') === 'cancel') {
            const { editQuestionActions } = this.props;
            editQuestionActions.stopEditQuestion();
        }
    }

    _onTitleChange(e) {
        const data = { label: e.target.value || 'Untitle Question' };
        this._handleChangeEvent(data);
    }

    _onTypeChange(e) {
        const data = { type: e.currentTarget.getAttribute('data-value') || 'radio' };
        this._handleChangeEvent(data);
    }

    _handleChangeEvent(data) {
        const { editQuestion, questionsActions, editQuestionActions } = this.props;
        questionsActions.editQuestion(editQuestion.id, data);
        editQuestionActions.setEditQuestion(data);
    }
}

export default EditQuestion;
