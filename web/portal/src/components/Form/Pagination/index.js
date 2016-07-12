
// CSS
import styles from './style.css';

import React, { Component } from 'react';

import Description from '../Description';
import Item from '../Item';
import Radio from '../Radio';


class Pagination extends Component {

    constructor() {
        super();
        this._onAddQueClick = this._onAddQueClick.bind(this);
    }

    render() {
        const { data } = this.props;
        const list = [];
        data.question.forEach((question, idx) => {
            list.push(this._renderQuestion(question, idx));
        });
        return (
            <div className={styles.wrap}>
                <div>{data.page} {data.description}</div>
                {list}

                <button onClick={this._onAddQueClick}>
                    Add Question
                </button>
            </div>
        );
    }

    _renderQuestion(question, idx) {
        const { data, editQuestionActions, moveQuestion, getQuestion } = this.props;
        let obj;
        // TODOS: define components
        const requiredProps = {
            key: idx,
            id: idx,
            page: data.page,
            data: question,
            editQuestionActions,
            moveQuestion,
            getQuestion
        };
        switch (question.type) {
        case 'radio':
            obj = (<Radio {...requiredProps} />);
            break;
        case 'description':
            obj = (<Description {...requiredProps} />);
            break;
        default:
            obj = (<div>{JSON.stringify(question)}</div>);
        }

        return (<Item {...requiredProps}>{obj}</Item>);
    }

    _onAddQueClick() {
        const { data, questionsActions } = this.props;
        const question = {
            id: this._generateQuestionID(),
            order: 1,
            type: 'radio',
            label: 'Untitle Question',
            data: [
                { value: '1', label: 'default option' }
            ],
            required: true
        };
        questionsActions.addQuestion(data.page, question);
    }

    _generateQuestionID() {
        return (Date.now().toString(32) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }

}

export default Pagination;
