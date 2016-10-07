
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import Question from '../Question';

class Text extends PureComponent {

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
                <div className={`${styles.inputItem} inputItem`}>
                    <input
                        type="text"
                        className="input input--medium ut-input"
                        placeholder={data.data}
                    />
                </div>
            </div>
        );
    }
}

export default Text;
