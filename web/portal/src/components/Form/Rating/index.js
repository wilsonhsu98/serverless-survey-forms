
// CSS
import styles from './style.css';

import React, { Component } from 'react';

import Question from '../Question';

class Rating extends Component {

    render() {
        const { data, onClick } = this.props;
        return (
            <div
                className="question"
                onClick={onClick}
            >
                <Question
                    text={data.label}
                />
                <div className={styles.ratingWrapper}>
                    <ul className={styles.ratingGrp}>
                        {this._renderLabel(data.data[0])}
                        {this._renderRatingItem()}
                        {this._renderLabel(data.data[data.data.length - 1])}
                    </ul>
                    {
                        data.input ?
                            <input
                                type="text"
                                value={data.input}
                                readonly
                            /> : ''
                    }
                </div>
            </div>
        );
    }

    _renderLabel(item) {
        return (
            <li className={styles.label}>{item.label}</li>
        );
    }

    _renderRatingItem() {
        const { data:item } = this.props;
        const items = item.data.map((itm, idx) => {
            const val = itm.value ? itm.value : itm.label;
            const label = itm.label;
            return (
                <li
                    key={idx}
                    title={label}
                    className={styles.ratingItem}
                />
            );
        });
        return items;
    }
}

export default Rating;
