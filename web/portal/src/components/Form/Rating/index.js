
// CSS
import styles from './style.css';

import React, { Component } from 'react';

import Question from '../Question';

class Rating extends Component {

    constructor() {
        super();
        this._onClickQuestion = this._onClickQuestion.bind(this);
    }

    render() {
        const { data } = this.props;
        return (
            <div
                className="question"
                onClick={this._onClickQuestion}
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

    _onClickQuestion() {
        const { data, editQuestionActions } = this.props;
        editQuestionActions.setEditQuestion(data);
    }
}

export default Rating;
