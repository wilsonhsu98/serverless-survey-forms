
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import * as values from '../../../constants/DefaultValues';

class EditAdvance extends PureComponent {

    constructor() {
        super();

        this._onChangeHandle = this._onChangeHandle.bind(this);
    }

    render() {
        const { editQuestion } = this.props;
        const flag = editQuestion.hasOwnProperty('input');
        const input = flag ? editQuestion.input : values.PLACEHOLDER_TITLE;

        return (
            <div className={styles.item}>
                <input
                    id="chk"
                    type="checkbox"
                    checked={flag}
                    onChange={this._onChangeHandle}
                />
                <label>
                    Show "Tell Me Why"<span>&nbsp;-&nbsp;</span>
                </label>
                <input
                    id="why"
                    type="text"
                    value={input}
                    placeholder={values.PLACEHOLDER_TITLE}
                    onChange={this._onChangeHandle}
                />
            </div>
        );
    }

    _onChangeHandle() {
        const { editQuestion, handleChangeEvent, handleDeleteInput } = this.props;
        const flag = $('#chk').is(':checked');
        const input = $('#why').val();
        const newData = Object.assign({}, editQuestion);
        if (flag) {
            newData.input = input || values.PLACEHOLDER_TITLE;
            handleChangeEvent(newData);
        } else {
            delete newData.input;
            handleDeleteInput(newData);
        }
    }
}

export default EditAdvance;
