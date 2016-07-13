
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PageBtn from '../PageBtn';
import EditQuestion from '../EditPanel/EditQuestion';
import OrderPage from '../EditPanel/OrderPage';
import EditPage from '../EditPanel/EditPage';
import Pagination from '../Form/Pagination';

class Design extends PureComponent {

    constructor() {
        super();
        this._moveQuestion = this._moveQuestion.bind(this);
        this._getQuestion = this._getQuestion.bind(this);
    }

    render() {
        const { questions, questionsActions } = this.props;
        const ctrlProps = {
            questions,
            questionsActions
        };

        return (
            <div ref="root">
                {this._renderEdit()}
                {this._renderPage()}
                <PageBtn {...ctrlProps} />

                <div style={{width:'500px',margin:'10px auto',textAlign:'center'}}>Thank you page</div>
            </div>
        );
    }

    _renderPage() {
        const { questions, questionsActions, editQuestionActions, editPageActions, orderPageActions } = this.props;
        const pageList = [];
        questions.forEach((page, idx) => {
            const pros = {
                key: idx,
                data: page,
                questionsActions,
                editQuestionActions,
                editPageActions,
                orderPageActions,
                moveQuestion: this._moveQuestion,
                getQuestion: this._getQuestion
            };
            pageList.push(<Pagination {...pros} />);
        });
        return pageList;
    }

    _renderEdit() {
        const { questions,
                editQuestion,
                editPage,
                orderPage,
                questionsActions,
                editQuestionActions,
                editPageActions,
                orderPageActions } = this.props;

        if (editQuestion.hasOwnProperty('id') && editQuestion.id !== '') {
            const editProps = {
                editQuestion,
                editQuestionActions,
                questionsActions
            };
            return (<EditQuestion {...editProps} />);
        } else if (orderPage) {
            const editProps = {
                questions,
                orderPageActions,
                questionsActions
            };
            return (<OrderPage {...editProps} />);
        } else if (editPage) {
            const editProps = {
                questions,
                editPage,
                editPageActions,
                questionsActions
            };
            return (<EditPage {...editProps} />);
        }
        return '';
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
