/**
 * @module Radio
 *
 *  {'type': 'radio',
 *   'label': 'I am radio question text',
 *   'data': [
 *       {'value': '1', 'label': 'radio label 1'},
 *       {'value': '2', 'label': 'radio label 2'},
 *       {'value': '3', 'label': 'radio label 3'},
 *       ...
 *   ]
 *  }
 **/

// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import Question from '../Question/index';

class Radio extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            feedback: {}
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._onChangeInput = this._onChangeInput.bind(this);
        this._feedback = this._feedback.bind(this);
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
                <div className={styles.radioGrp}>
                    {this._renderRadioItem()}
                </div>
            </div>
        );
    }

    _renderRadioItem() {
        const { id, item } = this.props;
        const items = item.data.map((itm, idx) => {
            const inputID = `radio_${id}_${idx}`;
            const val = itm.value ? itm.value : itm.label;
            const label = itm.label;
            const input = itm.input;
            return (
                <div
                    className={styles.radioItem}
                    key={idx}
                >
                    <input
                        id={inputID}
                        type="radio"
                        name={id}
                        value={val}
                        data-label={label}
                        checked={this.state.selected === inputID}
                        onChange={this._onChangeHandle}
                    />
                    <label htmlFor={inputID}>
                        {label}
                    </label>
                    {
                        input && this.state.selected === inputID ?
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
        const feedback = {};
        feedback[e.currentTarget.getAttribute('value')] = {};
        if (e.target.checked) {
            feedback[e.currentTarget.getAttribute('value')].label =
            e.currentTarget.getAttribute('data-label');
        } else {
            feedback[e.currentTarget.getAttribute('value')].label = false;
        }

        this.setState({
            selected: e.currentTarget.id,
            feedback
        }, () => {
            this._feedback();
        });
    }

    _onChangeInput(e) {
        const feedback = this.state.feedback;
        feedback[e.currentTarget.getAttribute('name')].input =
            e.currentTarget.value ? e.currentTarget.value : false;

        this.setState({
            feedback
        }, () => {
            this._feedback();
        });
    }

    _feedback() {
        let data = this.props.feedback[`Q${this.props.id}`].data;
        data = data.map((item) => {
            const updatedItem = {};
            // Value will be the same
            updatedItem.value = item.value;
            // Updated Label
            if (this.state.feedback[item.value] && this.state.feedback[item.value].label) {
                updatedItem.label = this.state.feedback[item.value].label;
            } else {
                updatedItem.label = ' ';
            }
            // Updated Input
            if (this.state.feedback[item.value] && this.state.feedback[item.value].input) {
                updatedItem.input = this.state.feedback[item.value].input;
            } else if (item.input) {
                updatedItem.input = ' ';
            }
            return updatedItem;
        });
        const updatedfeedback = {
            [`Q${this.props.id}`]: {
                type: 'radio',
                label: this.props.item.label,
                data: data
            }
        };
        this.props.onChangeHandle(updatedfeedback);
    }
}

Radio.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Radio.defaultProps = {};

export default Radio;
