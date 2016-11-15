
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
import * as PopupActions from '../../actions/popup';

import Design from '../../components/Design';
import ControlBtn from '../../components/L10n/ControlBtn';
import L10nList from '../../components/L10n/L10nList';

class Create extends PureComponent {
    // componentDidMount() {
        // TODOS: temporarily remove router
        // const { surveyID, pushActions } = this.props;
        // // if there is no surveyID, go back
        // if (!surveyID) pushActions('/');
    // }

    render() {
        const { surveyID, lang, questions, dropQuestion, editQuestion, editPage, orderPage,
            selectedUser, surveyPolicy, surveyEditable, surveyL10n, selectedL10n, webpage,
            questionsActions, editQuestionActions, editPageActions,
            orderPageActions, previewActions, popupActions } = this.props;
        const webpageArray = webpage.split('/');
        const designProps = {
            questions,
            dropQuestion,
            editQuestion,
            editPage,
            orderPage,
            surveyID,
            selectedUser,
            surveyPolicy,
            surveyEditable,
            questionsActions,
            editQuestionActions,
            editPageActions,
            orderPageActions,
            previewActions,
            popupActions };

        if (webpageArray[1] && webpageArray[1] === 'l10n') {
            return (
                <div ref="root">
                    <ControlBtn
                        lang={lang}
                        selectedL10n={selectedL10n}
                        questionsActions={questionsActions}
                        popupActions={popupActions}
                    />
                    <L10nList
                        lang={lang}
                        surveyL10n={surveyL10n}
                        selectedL10n={selectedL10n}
                        questionsActions={questionsActions}
                        popupActions={popupActions}
                    />
                </div>
            );
        }
        return (<Design ref="root" {...designProps} />);
    }
}

function mapStateToProps(state) {
    return {
        surveyID: state.surveyID,
        lang: state.lang,
        questions: state.questions,
        surveyL10n: state.surveyL10n,
        dropQuestion: state.dropQuestion,
        editQuestion: state.editQuestion,
        editPage: state.editPage,
        orderPage: state.orderPage,
        surveyEditable: state.surveyEditable,
        surveyPolicy: state.surveyPolicy,
        selectedL10n: state.selectedL10n,
        selectedUser: state.selectedUser,
        webpage: state.webpage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        editQuestionActions: bindActionCreators(EditQuestionActions, dispatch),
        editPageActions: bindActionCreators(EditPageActions, dispatch),
        orderPageActions: bindActionCreators(OrderPageActions, dispatch),
        previewActions: bindActionCreators(PreviewActions, dispatch),
        popupActions: bindActionCreators(PopupActions, dispatch)
        // pushActions: bindActionCreators(push, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
