/**
 * @module Rating
 *
 *  {'type': 'rating',
 *   'label': 'I am rating question text',
 *   'data': [
 *       {'value': '1', 'label': 'rating label 1'},
 *       {'value': '2', 'label': 'rating label 2'},
 *       {'value': '3', 'label': 'rating label 3'},
 *       ...
 *   ]
 *  }
 **/

// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';

import Question from '../Question/index';

class Rating extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            rating: undefined,
            reason: ''
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
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
                <div className={styles.ratingWrapper}>
                    <ul className={styles.ratingGrp}>
                        {this._renderLabel(item.data[0])}
                        {this._renderRatingItem()}
                        {this._renderLabel(item.data[item.data.length - 1])}
                    </ul>
                    {
                        item.input ?
                            <input
                                type="text"
                                placeholder={item.input}
                                onChange={this._onChangeInput}
                            /> : ''
                    }
                </div>
            </div>
        );
    }

    _renderRatingItem() {
        const { id, item } = this.props;
        const items = item.data.map((itm, idx) => {
            const inputID = `rating_${id}_${idx}`;
            const val = itm.value ? itm.value : itm.label;
            const label = itm.label;
            return (
                <li
                    id={inputID}
                    className={classNames({
                        [`${styles.ratingItemSelected}`]: this.state.selected === inputID,
                        [`${styles.ratingItem}`]: this.state.selected !== inputID
                    })}
                    key={idx}
                    title={label}
                    data-value={val}
                    onClick={this._onChangeHandle}
                />
            );
        });
        return items;
    }

    _renderLabel(item) {
        return (
            <li className={styles.label}>{item.label}</li>
        );
    }

    _onChangeHandle(e) {
        this.setState({
            selected: e.currentTarget.id,
            rating: e.currentTarget.getAttribute('data-value')
        }, () => {
            const feedbackObj = {
                rating: this.state.rating,
                reason: ''
            };
            const feedback = {
                [`Q${this.props.id}`]: feedbackObj
            };
            this.props.onChangeHandle(feedback);
        });
    }

    _onChangeInput(e) {
        this.setState({
            reason: e.currentTarget.value
        }, () => {
            const feedbackObj = {
                rating: this.state.rating,
                reason: this.state.reason
            };
            const feedback = {
                [`Q${this.props.id}`]: feedbackObj
            };
            this.props.onChangeHandle(feedback);
        });
    }
}

Rating.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Rating.defaultProps = {};

export default Rating;
