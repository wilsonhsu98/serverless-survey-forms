
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as SurveysActions from '../../actions/surveys';
import * as QuestionsActions from '../../actions/questions';
import * as EditSubjectActions from '../../actions/editSubject';
import * as PopupActions from '../../actions/popup';

import ControlBtn from '../../components/List/ControlBtn';
import SurveyList from '../../components/List/SurveyList';

class List extends PureComponent {

    componentWillMount() {
        const { surveysActions } = this.props;
        surveysActions.getSurveys();
    }

    render() {
        const { account, surveys, selectedSurveys, selectedUser,
            surveysActions, questionsActions, editSubjectActions, popupActions } = this.props;

        return (
            <div ref="root">
                <ControlBtn
                    account={account}
                    selectedSurveys={selectedSurveys}
                    selectedUser={selectedUser}
                    editSubjectActions={editSubjectActions}
                    surveysActions={surveysActions}
                    popupActions={popupActions}
                />
                <SurveyList
                    surveys={surveys}
                    selectedSurveys={selectedSurveys}
                    selectedUser={selectedUser}
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
        selectedSurveys: state.selectedSurveys,
        selectedUser: state.selectedUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveysActions: bindActionCreators(SurveysActions, dispatch),
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        editSubjectActions: bindActionCreators(EditSubjectActions, dispatch),
        popupActions: bindActionCreators(PopupActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
