
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as QuestionsActions from '../../actions/questions';
import * as EditQuestionIDActions from '../../actions/editQuestionID';

import Design from '../../components/Design';
import Control from '../../components/Control';
import Page from '../../components/Form/Page';

class Create extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { questions, questionsActions, editQuestionIDActions } = this.props;
        const ctrlProps = {
            questions,
            questionsActions
        };
        const list = [];
        questions.forEach((page, idx) => {
            const pros = {
                key: idx,
                data: page,
                editQuestionIDActions
            };
            list.push(<Page {...pros} />);
        });

        return (
            <div ref="root">
                Create
                <Design />
                <Control {...ctrlProps} />
                {list}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fbID: state.fbID,
        account: state.account,
        questions: state.questions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        editQuestionIDActions: bindActionCreators(EditQuestionIDActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
