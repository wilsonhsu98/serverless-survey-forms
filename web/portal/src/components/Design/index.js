
// CSS
// import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import EditPanel from '../EditPanel';
import PageBtn from '../PageBtn';
import Pagination from '../Form/Pagination';

class Design extends PureComponent {

    constructor() {
        super();
        this._moveQuestion = this._moveQuestion.bind(this);
        this._getQuestion = this._getQuestion.bind(this);
    }

    render() {
        const { questions, editQuestion, editQuestionActions, questionsActions } = this.props;
        const ctrlProps = {
            questions,
            questionsActions
        };
        const editProps = {
            editQuestion,
            editQuestionActions,
            questionsActions
        };
        return (
            <div ref="root">
                <p>Gogo Design! Drag and click.</p>

                <PageBtn {...ctrlProps} />
                {editQuestion.hasOwnProperty('id') && editQuestion.id !== '' ?
                    <EditPanel {...editProps} /> :
                    ''}
                {this._renderPage()}
            </div>
        );
    }

    _renderPage() {
        const { questions, questionsActions, editQuestionActions } = this.props;
        const pageList = [];
        questions.forEach((page, idx) => {
            const pros = {
                key: idx,
                data: page,
                questionsActions,
                editQuestionActions,
                moveQuestion: this._moveQuestion,
                getQuestion: this._getQuestion
            };
            pageList.push(<Pagination {...pros} />);
        });
        return pageList;
    }

    _moveQuestion(id, atPage, atIndex) {
        const { questionsActions } = this.props;
        const { question, page, index } = this._getQuestion(id);
        console.log(id);
        if (index !== atIndex || page !== atPage) {
            questionsActions.exchangeQuestion(atPage, atIndex, page, index, question);
        }
    }

    _getQuestion(id) {
        const { questions } = this.props;
        let page;
        let index;
        let question;
        findObject:
        for (let obj of questions) {
            for (let que of obj.question) {
                if (que.id === id) {
                    question = que;
                    page = obj.page;
                    index = obj.question.indexOf(question);
                    break findObject;
                }
            }
        }
        return {
            question,
            page,
            index
        };
    }
}

export default DragDropContext(HTML5Backend)(Design);
