
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
import * as AccountActions from '../../actions/account';

import Header from '../../components/Header';
import SubjectPop from '../../components/SubjectPop';
import FBLogin from '../../components/FBLogin';
import Loading from '../../components/Loading';

class Portal extends PureComponent {

    constructor(props) {
        super(props);

        const { routing, accountActions } = props;
        if (routing.locationBeforeTransitions.query.hasOwnProperty('token')) {
            accountActions.verifyToken(routing.locationBeforeTransitions.query.token);
        }
    }

    render() {
        const { loading, subject, surveyID,
            editSubject, editSubjectActions, subjectActions, questionsActions } = this.props;
        const headProps = {
            subject,
            surveyID,
            editSubjectActions,
            questionsActions
        };
        const subProps = {
            subject,
            surveyID,
            editSubjectActions,
            subjectActions
        };

        if (loading) {
            return (<Loading />);
        }
        return (
            <div ref="root" className={styles.wrap}>
                <Header {...headProps} />
                {this._checkUserLogin()}

                {editSubject ? <SubjectPop {...subProps} /> : ''}
            </div>
        );
    }

    _checkUserLogin() {
        const { account } = this.props;
        const body = document.getElementsByTagName('body')[0];

        if (!account || !account.hasOwnProperty('accountid') ||
            (account.role !== 'Designer' && account.role !== 'Admin')) {
            // if user didn't grant FB permission
            body.classList.remove('bg');
            return <FBLogin />;
        }

        // if user has a account and the account role is Designer or Admin
        body.classList.add('bg');
        return (
            <div className={styles.content}>
                <div className={styles.content_bg}></div>
                <div className={styles.content_inner}>
                    {this.props.children}
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
        routing: state.routing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editSubjectActions: bindActionCreators(EditSubjectActions, dispatch),
        subjectActions: bindActionCreators(SubjectActions, dispatch),
        questionsActions: bindActionCreators(QuestionsActions, dispatch),
        accountActions: bindActionCreators(AccountActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);
