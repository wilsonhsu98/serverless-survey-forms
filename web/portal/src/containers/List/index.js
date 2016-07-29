
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as SurveysActions from '../../actions/surveys';
import * as QuestionsActions from '../../actions/questions';
import * as EditSubjectActions from '../../actions/editSubject';

import CreateBtn from '../../components/List/CreateBtn';
import SurveyList from '../../components/List/SurveyList';

class List extends PureComponent {

    constructor(props) {
        super(props);

        const { surveysActions } = props;
        surveysActions.getSurveys();
    }

    render() {
        const { surveys, questionsActions, editSubjectActions } = this.props;

        return (
            <div ref="root">
                <CreateBtn editSubjectActions={editSubjectActions} />
                <SurveyList
                    surveys={surveys}
                    questionsActions={questionsActions}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        surveys: state.surveys
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
