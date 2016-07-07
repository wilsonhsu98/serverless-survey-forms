
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class Control extends PureComponent {

    constructor() {
        super();
        this._onAddQueClick = this._onAddQueClick.bind(this);
        this._onAddPageClick = this._onAddPageClick.bind(this);
    }

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        return (
            <div ref="root" className={styles.control}>
                <button data-type="question" onClick={this._onAddQueClick}>
                    Add Question
                </button>
                <button data-type="description" onClick={this._onAddQueClick}>
                    Add Text
                </button>
                <button data-type="page" onClick={this._onAddPageClick}>
                    Add Page
                </button>
            </div>
        );
    }

    _onAddQueClick(e) {
        const { questions, questionsActions } = this.props;
        const addType = $(e.target).data('type');
        const data = {
            order: 1,
            type: addType,
            label: 'default question',
            data: [
                {"value": "1", "label": "default option"}
            ],
            "required": true
        };
        questionsActions.addQuestion(1, data);
    }

    _onAddPageClick(e) {
        const { questions, questionsActions } = this.props;
        const data = {
            order: 1,
            type: 'question',
            label: 'default question',
            data: [
                {"value": "1", "label": "default option"}
            ],
            "required": true
        };
        questionsActions.addQuestion(2, data);
    }
}

export default Control;
