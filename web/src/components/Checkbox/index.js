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

    constructor(props) {
        super(props);
        const state = {};
        props.item.data.forEach((itm, idx) => {
            const inputID = `checkbox_${props.id}_${idx}`;
            state[inputID] = false;
        });
        this.state = state;
        this.state.feedbackObj = {};
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._onChangeInput = this._onChangeInput.bind(this);
    }
    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { id, item } = this.props;
        return (
            <div ref="root" className="question">
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
        const { id, item } = this.props;
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
                        checked={this.state[inputID]}
                        onChange={this._onChangeHandle}
                    />
                    <label htmlFor={inputID}>
                        {label}
                    </label>
                    {
                        input && this.state[inputID] ?
                            <input
                                type="text"
                                placeholder={input}
                                name={val}
                                onChange={this._onChangeInput}
                            /> : ''
                    }
                </div>
            );
        });
        return items;
    }

    _onChangeHandle(e) {
        const state = {};
        const feedbackObj = this.state.feedbackObj;
        state[e.currentTarget.id] = !this.state[e.currentTarget.id];
        feedbackObj[e.currentTarget.getAttribute('value')] = false;
        state.feedbackObj = feedbackObj;
        this.setState(state, () => {
            const feedback = {
                [`Q${this.props.id}`]: feedbackObj
            };
            this.props.onChangeHandle(feedback);
        });
    }

    _onChangeInput(e) {
        const state = {};
        const feedbackObj = this.state.feedbackObj;
        state[e.currentTarget.id] = !this.state[e.currentTarget.id];
        feedbackObj[e.currentTarget.getAttribute('name')] = e.currentTarget.value;
        state.feedbackObj = feedbackObj;
        this.setState(state, () => {
            const feedback = {
                [`Q${this.props.id}`]: feedbackObj
            };
            this.props.onChangeHandle(feedback);
        });
    }

}

Checkbox.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Checkbox.defaultProps = {};

export default Checkbox;
