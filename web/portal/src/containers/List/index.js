
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as SurveysActions from '../../actions/surveys';
import * as EditSubjectActions from '../../actions/editSubject';

import CreateBtn from '../../components/List/CreateBtn';
import SurveyList from '../../components/List/SurveyList';

class List extends PureComponent {

    constructor(props) {
        super(props);

        const { account, surveysActions } = props;
        surveysActions.getSurveys(account.accountid);
    }

    render() {
        const { surveys, editSubjectActions } = this.props;

        return (
            <div ref="root">
                <CreateBtn editSubjectActions={editSubjectActions} />
                <SurveyList surveys={surveys} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
        surveys: state.surveys
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveysActions: bindActionCreators(SurveysActions, dispatch),
        editSubjectActions: bindActionCreators(EditSubjectActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
