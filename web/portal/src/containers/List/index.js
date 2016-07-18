
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as SurveysActions from '../../actions/surveys';

import CreateBtn from '../../components/List/CreateBtn';
import SurveyList from '../../components/List/SurveyList';

class List extends PureComponent {

    constructor(props) {
        super(props);

        const { account, surveysActions } = props;
        surveysActions.getSurveys(account.accountid);
    }

    render() {
        const { surveys, surveysActions } = this.props;

        return (
            <div ref="root">
                <CreateBtn surveysActions={surveysActions} />
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
        surveysActions: bindActionCreators(SurveysActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
