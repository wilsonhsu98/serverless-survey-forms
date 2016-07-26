
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as EditSubjectActions from '../../actions/editSubject';
import * as SubjectActions from '../../actions/subject';
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
            editSubject, editSubjectActions, subjectActions } = this.props;
        const headProps = {
            subject,
            surveyID,
            editSubjectActions
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

        if (!account || !account.hasOwnProperty('accountid') ||
            (account.role !== 'Designer' && account.role !== 'Admin')) {
            // if user didn't grant FB permission
            return <FBLogin />;
        }

        // if user has a account and the account role is Designer or Admin
        return (
            <div className={styles.content}>
                {this.props.children}
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
        accountActions: bindActionCreators(AccountActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);
