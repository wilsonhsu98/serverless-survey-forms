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

/* eslint no-unused-vars: 0 */
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
        this.state.feedbackArray = [];
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
                <div className="checkboxGrp">
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
                    className="checkboxItem"
                    key={idx}
                >
                    <input
                        id={inputID}
                        type="checkbox"
                        name={id}
                        value={val}
                        checked={this.state[inputID]}
                        onChange={this._onChangeHandle}
                        data-label={label}
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
        const feedbackArray = this.state.feedbackArray.filter((item) =>
            item.value !== e.currentTarget.getAttribute('value'));

        if (e.target.checked) {
            const feedbackItem = {
                value: e.currentTarget.getAttribute('value'),
                label: e.currentTarget.getAttribute('data-label')
            };
            feedbackArray.push(feedbackItem);
        }

        this.setState({
            [`${e.currentTarget.id}`]: !this.state[e.currentTarget.id],
            feedbackArray
        }, () => {
            const feedback = {
                [`Q${this.props.id}`]: {
                    label: this.props.item.label,
                    type: 'checkbox',
                    data: feedbackArray
                }
            };
            this.props.onChangeHandle(feedback);
        });
    }

    _onChangeInput(e) {
        const feedbackArray = this.state.feedbackArray;
        // Find the item, update the input
        feedbackArray.map((item) => {
            const updatedItem = item;
            if (item.value === e.currentTarget.getAttribute('name')) {
                updatedItem.input = e.currentTarget.value ? e.currentTarget.value : false;
            }
            return updatedItem;
        });
        this.setState({
            feedbackArray
        }, () => {
            const feedback = {
                [`Q${this.props.id}`]: {
                    label: this.props.item.label,
                    type: 'checkbox',
                    data: feedbackArray
                }
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
