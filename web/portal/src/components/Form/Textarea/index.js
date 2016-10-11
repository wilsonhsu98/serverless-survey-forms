
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import Question from '../Question';

class Textarea extends PureComponent {

    render() {
        const { data, onClick } = this.props;
        const rows = data.rows ? data.rows : 3;
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
                <div className={styles.textareaItem}>
                    <textarea
                        rows={rows}
                        className="textarea"
                        placeholder={data.input}
                    />
                </div>
            </div>
        );
    }
}

export default Textarea;
