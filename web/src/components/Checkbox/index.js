/**
 * @module Checkbox
 *
 *  {'type': 'checkbox',
 *   'label': 'I am checkbox question text',
 *   'data': [
 *       {'value': '1', 'label': 'checkbox label 1'},
 *       {'value': '2', 'label': 'checkbox label 2'},
 *       {'value': '3', 'label': 'checkbox label 3'},
 *       ...
 *   ]
 *  }
 **/

// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import Question from '../Question/index';

class Checkbox extends PureComponent {

    componentDidMount() {
        // TODO: i18n
    }

    componentDidUpdate() {
        // TODO: i18n
    }

    render() {
        const { id, item } = this.props;
        return (
            <div>
                <Question
                    id={id}
                    text={item.label}
                />
                <div className={styles.checkboxGrp}>
                    {this._renderCheckboxItem()}
                </div>
            </div>
        );
    }

    _renderCheckboxItem() {
        const { id, item, onChangeHandle } = this.props;
        const items = item.data.map((itm, idx) => {
            const inputID = `checkbox_${id}_${idx}`;
            const val = itm.value ? itm.value : itm.label;
            const label = itm.label;
            return (
                <div
                    className={styles.checkboxItem}
                    key={idx}
                >
                    <input
                        id={inputID}
                        type="checkbox"
                        name={id}
                        value={val}
                        onChange={onChangeHandle}
                    />
                    <label htmlFor={inputID}>
                        {label}
                    </label>
                </div>
            );
        });
        return items;
    }

}

Checkbox.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Checkbox.defaultProps = {};

export default Checkbox;
