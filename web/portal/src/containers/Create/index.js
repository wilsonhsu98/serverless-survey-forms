
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

// Actions
import * as QuestionsActions from '../../actions/questions';
import * as EditQuestionActions from '../../actions/editQuestion';
import * as EditPageActions from '../../actions/editPage';
import * as OrderPageActions from '../../actions/orderPage';
import * as PreviewActions from '../../actions/preview';

import Design from '../../components/Design';

class Create extends PureComponent {
    // componentDidMount() {
        // TODOS: temporarily remove router
        // const { surveyID, pushActions } = this.props;
        // // if there is no surveyID, go back
        // if (!surveyID) pushActions('/');
    // }

    render() {
        return (<Design ref="root" {...this.props} />);
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
        surveyID: state.surveyID,
        questions: state.questions,
        editQuestion: state.editQuestion,
        editPage: state.editPage,
        orderPage: state.orderPage,
        surveyPolicy: state.surveyPolicy
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        editQuestionActions: bindActionCreators(EditQuestionActions, dispatch),
        editPageActions: bindActionCreators(EditPageActions, dispatch),
        orderPageActions: bindActionCreators(OrderPageActions, dispatch),
        previewActions: bindActionCreators(PreviewActions, dispatch)
        // pushActions: bindActionCreators(push, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
