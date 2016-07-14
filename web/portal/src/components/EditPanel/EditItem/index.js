
// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

class EditItem extends PureComponent {

    constructor() {
        super();

        this._renderOption = this._renderOption.bind(this);
        this._renderOptionWithText = this._renderOptionWithText.bind(this);
    }

    render() {
        const { id, data, onDeleteHandle } = this.props;
        return (
            <div className={styles.item}>
                {data.hasOwnProperty('input') ?
                    this._renderOptionWithText() :
                    this._renderOption()}
                <button
                    className="button"
                    onClick={() => onDeleteHandle(id)}
                >Del</button>
                <button className="button">Drag</button>
            </div>
        );
    }

    _renderOption() {
        const { id, data, onChangeHandle } = this.props;
        return (
            <input
                data-id={id}
                type="text"
                className={styles.longText}
                value={data.label}
                placeholder="New Option"
                onChange={onChangeHandle}
            />
        );
    }

    _renderOptionWithText() {
        const { id, data, onChangeHandle } = this.props;
        return (
            <span>
                <input
                    data-id={id}
                    type="text"
                    className={styles.shortText}
                    value={data.label}
                    placeholder="New Option"
                    onChange={onChangeHandle}
                />
                <span> - </span>
                <input
                    data-id={id}
                    type="text"
                    className={styles.shortText}
                    value={data.input}
                    placeholder="New Option"
                    onChange={onChangeHandle}
                />
            </span>
        );
    }
}

EditItem.PropTypes = {
    id: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

EditItem.defaultProps = {};

export default EditItem;
