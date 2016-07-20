
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class PageBtn extends PureComponent {

    constructor() {
        super();
        this._onAddPageClick = this._onAddPageClick.bind(this);
    }

    render() {
        return (
            <div ref="root" className={styles.control}>
                <button className="button" onClick={this._onAddPageClick}>
                    + Add Page
                </button>
            </div>
        );
    }

    _onAddPageClick() {
        const { questions, questionsActions } = this.props;
        const page = questions.length + 1;
        questionsActions.addPage(page);
        // save Question
        questionsActions.saveQuestion();
    }

    _generateQuestionID() {
        return (Date.now().toString(32) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
}

export default PageBtn;
