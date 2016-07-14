
// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import EditItem from '../EditItem';

class EditMultiOptions extends PureComponent {

    constructor() {
        super();

        this._addOption = this._addOption.bind(this);
        this._onDeleteHandle = this._onDeleteHandle.bind(this);
        this._onChangeHandle = this._onChangeHandle.bind(this);
    }

    render() {
        const { editQuestion } = this.props;
        const data = editQuestion.data;
        const optList = [];

        data.forEach((opt, idx) => {
            const pros = {
                key: idx,
                data: opt,
                onChangeHandle: this._onChangeHandle,
                onDeleteHandle: this._onDeleteHandle
            };
            optList.push(
                <EditItem
                    id={idx}
                    {...pros}
                />
            );
        });

        return (
            <div className={styles.item}>
                {optList}

                <button
                    data-type="other"
                    className={`${styles.addBtn} button`}
                    onClick={this._addOption}
                >+ Add Option</button>
                <button
                    className={`${styles.otherBtn} button`}
                    onClick={this._addOption}
                >Add "Other"</button>
            </div>
        );
    }

    _onChangeHandle(e) {
        const { editQuestion, handleChangeEvent } = this.props;
        const idx = e.target.getAttribute('data-id');
        const type = e.target.getAttribute('data-type');
        const newData = [...editQuestion.data];
        const data = {
            [type]: e.target.value || (type === 'label' ? 'New Option' : 'Placeholder')
        };
        newData[idx] = Object.assign({}, newData[idx], data);
        handleChangeEvent({data: newData});
    }

    _onDeleteHandle(idx) {
        const { editQuestion, handleChangeEvent } = this.props;
        const newData = [...editQuestion.data];
        newData.splice(idx, 1);
        handleChangeEvent({data: newData});
    }

    _addOption(e) {
        const { editQuestion, handleChangeEvent } = this.props;
        let opt;
        if (e.target.getAttribute('data-type') === 'other') {
            opt = {
                value: editQuestion.data.length + 1,
                label: 'New Option'
            };
        } else {
            opt = {
                value: editQuestion.data.length + 1,
                label: 'New Option',
                input: 'Placeholder'
            };
        }

        const newData = [...editQuestion.data, opt];
        handleChangeEvent({data: newData});
    }
}

export default EditMultiOptions;
