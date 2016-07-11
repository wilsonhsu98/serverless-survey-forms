
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as QuestionsActions from '../../actions/questions';
import * as EditQuestionActions from '../../actions/editQuestion';

import Design from '../../components/Design';
import PageBtn from '../../components/PageBtn';
import Pagination from '../../components/Form/Pagination';
import EditPanel from '../../components/EditPanel';

class Create extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
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
                <Design />
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
                editQuestionActions
            };
            pageList.push(<Pagination {...pros} />);
        });
        return pageList;
    }
}

function mapStateToProps(state) {
    return {
        fbID: state.fbID,
        account: state.account,
        questions: state.questions,
        editQuestion: state.editQuestion
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        editQuestionActions: bindActionCreators(EditQuestionActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
