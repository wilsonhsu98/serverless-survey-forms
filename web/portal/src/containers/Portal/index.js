
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as EditSubjectActions from '../../actions/editSubject';
import * as SubjectActions from '../../actions/subject';

import Header from '../../components/Header';
import SubjectPop from '../../components/SubjectPop';
import FBLogin from '../../components/FBLogin';
import Loading from '../../components/Loading';

class Portal extends PureComponent {

    render() {
        const { loading, account, token, editSubject, editSubjectActions, subjectActions } = this.props;
        const requiredProps = {
            account,
            token,
            editSubjectActions,
            subjectActions
        };

        if (loading) {
            return (<Loading />);
        }
        return (
            <div ref="root" className={styles.wrap}>
                <Header />
                {this._checkUserLogin()}

                {editSubject ? <SubjectPop {...requiredProps} /> : ''}
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
        editSubject: state.editSubject,
        token: state.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editSubjectActions: bindActionCreators(EditSubjectActions, dispatch),
        subjectActions: bindActionCreators(SubjectActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);
