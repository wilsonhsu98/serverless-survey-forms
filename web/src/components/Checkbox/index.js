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
import $ from 'jquery';

import Question from '../Question/index';

class Checkbox extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { id, item, className } = this.props;
        return (
            <div ref="root" className={className}>
                <Question
                    id={id}
                    text={item.label}
                    required={item.required}
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
            const input = itm.input;
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
                    {
                        input ?
                            <input type="text" placeholder={input} /> :
                            ''
                    }
                </div>
            );
        });
        return items;
    }

}

Checkbox.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired,
    className: PropTypes.string
};

Checkbox.defaultProps = {};

export default Checkbox;
