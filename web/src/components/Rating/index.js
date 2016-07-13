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
            selected: false
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
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
                            <input type="text" placeholder={item.input} /> : ''
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
        console.log(e.target.id);
        this.setState({
            selected: e.target.id
        });
        // TODO onChangeHandle
    }
}

Rating.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Rating.defaultProps = {};

export default Rating;
