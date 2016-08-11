
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as SurveysActions from '../../actions/surveys';
import * as QuestionsActions from '../../actions/questions';
import * as EditSubjectActions from '../../actions/editSubject';

import ControlBtn from '../../components/List/ControlBtn';
import SurveyList from '../../components/List/SurveyList';

class List extends PureComponent {

    componentWillMount() {
        const { surveysActions } = this.props;
        surveysActions.getSurveys();
    }

    render() {
        const { account, surveys, selectedSurveys,
            surveysActions, questionsActions, editSubjectActions } = this.props;

        return (
            <div ref="root">
                <ControlBtn
                    account={account}
                    selectedSurveys={selectedSurveys}
                    editSubjectActions={editSubjectActions}
                    surveysActions={surveysActions}
                />
                <SurveyList
                    surveys={surveys}
                    selectedSurveys={selectedSurveys}
                    questionsActions={questionsActions}
                    surveysActions={surveysActions}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
        surveys: state.surveys,
        selectedSurveys: state.selectedSurveys
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveysActions: bindActionCreators(SurveysActions, dispatch),
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        editSubjectActions: bindActionCreators(EditSubjectActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
