
// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import * as values from '../../../constants/DefaultValues';
import EditItem from '../EditItem';

class EditMultiOptions extends PureComponent {

    constructor() {
        super();

        this._addOption = this._addOption.bind(this);
        this._onDeleteHandle = this._onDeleteHandle.bind(this);
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._moveItem = this._moveItem.bind(this);
    }

    render() {
        const { editQuestion } = this.props;
        const data = editQuestion.data;
        const optList = [];
        let otherBtn;
        let advance;

        data.forEach((opt, idx) => {
            const pros = {
                key: idx,
                data: opt,
                onChangeHandle: this._onChangeHandle,
                onDeleteHandle: this._onDeleteHandle,
                moveItem: this._moveItem
            };
            optList.push(
                <EditItem
                    id={idx}
                    {...pros}
                />
            );
        });

        if (editQuestion.type !== 'rating') {
            // radio/checkbox have this button
            otherBtn = (
                <button
                    className={`${styles.otherBtn} button`}
                    onClick={this._addOption}
                >Add "Other"</button>
            );
        }

        return (
            <div className={styles.item}>
                {optList}

                <button
                    data-type="other"
                    className={`${styles.addBtn} button`}
                    onClick={this._addOption}
                >+ Add Option</button>

                {otherBtn}
                {advance}
            </div>
        );
    }

    _onChangeHandle(e) {
        const { editQuestion, handleChangeEvent } = this.props;
        const idx = e.target.getAttribute('data-id');
        const type = e.target.getAttribute('data-type');
        const newData = [...editQuestion.data];
        const data = {
            [type]: e.target.value || (type === 'label' ? values.OPTION_TITLE : values.PLACEHOLDER_TITLE)
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
                label: values.OPTION_TITLE
            };
        } else {
            opt = {
                value: editQuestion.data.length + 1,
                label: values.OPTION_TITLE,
                input: values.PLACEHOLDER_TITLE
            };
        }

        const newData = [...editQuestion.data, opt];
        handleChangeEvent({data: newData});
    }

    _moveItem(dragIndex, hoverIndex) {
        const { editQuestion, handleChangeEvent } = this.props;
        if (dragIndex !== hoverIndex) {
            const newData = [...editQuestion.data];
            const moveOpt = newData[dragIndex];
            newData.splice(dragIndex, 1);
            newData.splice(hoverIndex, 0, moveOpt);
            handleChangeEvent({data: newData});
        }
    }
}

export default EditMultiOptions;
