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
import I18Next from 'i18next';

import Question from '../Question/index';
import Error from '../Error';

class Radio extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._onChangeInput = this._onChangeInput.bind(this);
        this._checkDone = this._checkDone.bind(this);
    }

    render() {
        const { id, itemID, item, feedbackActions, pageDone, l10n } = this.props;
        return (
            <div ref="root" className="question">
                <Question
                    id={id}
                    text={l10n[item.label] || item.label}
                    required={item.required}
                >
                    {!feedbackActions.checkDone(itemID) && pageDone !== 'init' ?
                        <Error msg={I18Next.t('error_required')} /> : ''}
                </Question>
                <div className={styles.radioGrp}>
                    {this._renderRadioItem()}
                </div>
            </div>
        );
    }

    _renderRadioItem() {
        const { id, item, l10n } = this.props;
        const items = item.data.map((itm, idx) => {
            const inputID = `radio_${id}_${idx}`;
            const val = itm.value ? itm.value : itm.label;
            const label = l10n[itm.label] || itm.label;
            const input = l10n[itm.input] || itm.input;
            return (
                <div
                    className="radioItem"
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
        const feedbackArray = [];
        const feedbackItem = {
            value: e.currentTarget.getAttribute('value'),
            label: e.currentTarget.getAttribute('data-label')
        };
        feedbackArray.push(feedbackItem);
        this.setState({
            selected: e.currentTarget.id,
            feedbackArray
        }, () => {
            const feedback = {
                [`Q${this.props.id}`]: {
                    type: 'radio',
                    label: this.props.item.label,
                    data: feedbackArray
                }
            };
            this.props.onChangeHandle(feedback);
            // Update complete status
            const done = this._checkDone();
            this.props.feedbackActions.updateRequired(this.props.id, done);
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
                    type: 'radio',
                    label: this.props.item.label,
                    data: feedbackArray
                }
            };
            this.props.onChangeHandle(feedback);
        });
    }

    _checkDone() {
        if (this.state.selected) {
            return true;
        }
        return false;
    }
}

Radio.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Radio.defaultProps = {};

export default Radio;
