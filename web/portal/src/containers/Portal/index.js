
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as EditSubjectActions from '../../actions/editSubject';
import * as SubjectActions from '../../actions/subject';
import * as QuestionsActions from '../../actions/questions';
import * as PreviewActions from '../../actions/preview';
import * as AccountActions from '../../actions/account';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SubjectPop from '../../components/SubjectPop';
import Preview from '../../components/PreviewPop/Preview';
import FBLogin from '../../components/FBLogin';
import Loading from '../../components/Loading';
import Create from '../../containers/Create/';
import List from '../../containers/List/';

class Portal extends PureComponent {

    constructor(props) {
        super(props);

        const { routing, accountActions } = props;
        if (routing.locationBeforeTransitions.query.hasOwnProperty('token')) {
            accountActions.verifyToken(routing.locationBeforeTransitions.query.token);
        }
    }

    render() {
        const { account, loading, subject, surveyID, preview, previewID,
            editSubject, editSubjectActions, subjectActions,
            questionsActions, previewActions } = this.props;
        const headProps = {
            subject,
            surveyID,
            editSubjectActions,
            questionsActions
        };
        const subProps = { subject, surveyID, editSubjectActions, subjectActions };
        const preProps = { account, preview, previewID, previewActions };

        if (loading) {
            return (<Loading />);
        }
        return (
            <div ref="root">
                <div className={styles.wrap}>
                    <Header {...headProps} />
                    {this._checkUserLogin()}
                </div>

                {editSubject ? <SubjectPop {...subProps} /> : ''}
                {preview ? <Preview {...preProps} /> : ''}

                <Footer />
            </div>
        );
    }

    _checkUserLogin() {
        const { account, surveyID } = this.props;
        const body = document.getElementsByTagName('body')[0];

        if (!account || !account.hasOwnProperty('accountid') ||
            (account.role !== 'Designer' && account.role !== 'Admin')) {
            // if user didn't grant FB permission
            body.classList.remove('bg');
            return <FBLogin />;
        }
        // if user has a account and the account role is Designer or Admin
        body.classList.add('bg');


        // TODOS: temporarily remove router
        const children = surveyID ? <Create /> : <List />;
        return (
            <div className={styles.content}>
                <div className={styles.content_bg}></div>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        account: state.account,
        subject: state.subject,
        surveyID: state.surveyID,
        editSubject: state.editSubject,
        preview: state.preview,
        previewID: state.previewID,
        routing: state.routing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editSubjectActions: bindActionCreators(EditSubjectActions, dispatch),
        subjectActions: bindActionCreators(SubjectActions, dispatch),
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        previewActions: bindActionCreators(PreviewActions, dispatch),
        accountActions: bindActionCreators(AccountActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);
