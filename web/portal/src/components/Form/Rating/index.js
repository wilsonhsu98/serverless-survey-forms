
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
                    id={data.order}
                    text={data.label}
                    required={data.required}
                />
                <div className={styles.ratingWrapper}>
                    <ul className={styles.ratingGrp}>
                        {this._renderRatingItem()}
                    </ul>
                    {
                        data.hasOwnProperty('input') ?
                            <input
                                type="text"
                                className="input input--medium ut-input"
                                placeholder={data.input}
                            /> : ''
                    }
                </div>
            </div>
        );
    }

    _renderRatingItem() {
        const { data: item } = this.props;
        const items = item.data.map((itm, idx) => {
            const label = itm.label;
            return (
                <li
                    key={idx}
                    className={`${styles.ratingItem} ut-rating`}
                >
                    <div className={`${styles.label}`}>{label}</div>
                    <div className={`${styles.radio} radioItem`}>
                        <input type="radio" />
                        <label />
                    </div>
                </li>
            );
        });
        return items;
    }
}

export default Rating;
