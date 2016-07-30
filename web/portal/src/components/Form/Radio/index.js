
// CSS
import styles from './style.css';

import React, { Component } from 'react';

import Question from '../Question';

class Radio extends Component {

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
                <div className={styles.radioGrp}>
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
                            <input
                                type="text"
                                className="input input--small"
                                placeholder={input}
                            /> :
                            ''
                    }
                </div>
            );
        });
        return items;
    }
}

export default Radio;
