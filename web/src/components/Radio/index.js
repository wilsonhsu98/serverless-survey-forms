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
            selected: false
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._onChangeInput = this._onChangeInput.bind(this);
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
        this.setState({
            selected: e.target.id
        });
        const feedbackObj = {};
        feedbackObj[e.currentTarget.getAttribute('value')] = '';
        const feedback = {
            [`Q${this.props.id}`]: feedbackObj
        };
        this.props.onChangeHandle(feedback);
    }

    _onChangeInput(e) {
        const feedbackObj = {};
        feedbackObj[e.currentTarget.getAttribute('name')] = e.currentTarget.value;
        const feedback = {
            [`Q${this.props.id}`]: feedbackObj
        };
        this.props.onChangeHandle(feedback);
    }
}

Radio.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Radio.defaultProps = {};

export default Radio;
