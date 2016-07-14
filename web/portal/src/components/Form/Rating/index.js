
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
                <div className={styles.radioGrp}>
                    rating
                    {this._renderRadioItem()}
                </div>
            </div>
        );
    }

    _renderRadioItem() {
        const { data } = this.props;
        const items = data.data.map((itm, idx) => {
            const label = itm.label;
            const input = itm.input;
            return (
                <div
                    className={styles.radioItem}
                    key={idx}
                >
                    <input type="radio" />
                    <label>
                        {label}
                    </label>
                    {
                        input ?
                            <input type="text" placeholder={input} /> :
                            ''
                    }
                </div>
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
