
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as QuestionsActions from '../../actions/questions';
import * as EditQuestionActions from '../../actions/editQuestion';

import Design from '../../components/Design';

class Create extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        return (<Design ref="root" {...this.props} />);
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
