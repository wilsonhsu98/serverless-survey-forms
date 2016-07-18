
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as QuestionsActions from '../../actions/questions';
import * as EditQuestionActions from '../../actions/editQuestion';
import * as EditPageActions from '../../actions/editPage';
import * as OrderPageActions from '../../actions/orderPage';

import Design from '../../components/Design';

class Create extends PureComponent {

    render() {
        return (<Design ref="root" {...this.props} />);
    }
}

function mapStateToProps(state) {
    return {
        fbID: state.fbID,
        account: state.account,
        questions: state.questions,
        editQuestion: state.editQuestion,
        editPage: state.editPage,
        orderPage: state.orderPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        editQuestionActions: bindActionCreators(EditQuestionActions, dispatch),
        editPageActions: bindActionCreators(EditPageActions, dispatch),
        orderPageActions: bindActionCreators(OrderPageActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
