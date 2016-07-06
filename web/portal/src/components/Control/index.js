
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class Control extends PureComponent {

    constructor() {
        super();
        this._onAddQueClick = this._onAddQueClick.bind(this);
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
                <button data-type="text" onClick={this._onAddQueClick}>
                    Add Text
                </button>
                <button data-type="page" onClick={this._onAddQueClick}>
                    Add Page
                </button>
            </div>
        );
    }

    _onAddQueClick(e) {
        const { questionsActions } = this.props;
        const addType = $(e.target).data('type');
        const data = {
            page: 1,
            order: 1,
            type: addType,
            label: 'default question',
            data: [
                {"value": "1", "label": "default option"}
            ],
            "required": true
        };
        questionsActions.addQuestion(data);
    }
}

export default Control;
