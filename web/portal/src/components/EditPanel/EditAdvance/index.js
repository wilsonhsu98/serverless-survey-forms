
// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class EditAdvance extends PureComponent {

    constructor() {
        super();

        this._onChangeHandle = this._onChangeHandle.bind(this);
    }

    render() {
        const { editQuestion, onChangeHandle } = this.props;
        const flag = editQuestion.hasOwnProperty('input');
        const input = flag ? editQuestion.input : 'Placeholder';

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
                    placeholder="Placeholder"
                    onChange={this._onChangeHandle}
                />
            </div>
        );
    }

    _onChangeHandle(e) {
        const { editQuestion, handleChangeEvent, handleDeleteInput } = this.props;
        const flag = $('#chk').is(":checked");
        const input = $('#why').val();
        const newData = {...editQuestion};
        if (flag) {
            newData.input = input || 'Placeholder';
            handleChangeEvent(newData);
        } else {
            delete newData.input;
            handleDeleteInput(newData);
        }
    }
}

export default EditAdvance;
