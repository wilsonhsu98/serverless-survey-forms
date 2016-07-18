
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import FBLogin from '../../components/FBLogin';
import Loading from '../../components/Loading';

class Portal extends PureComponent {

    render() {
        const { loading } = this.props;

        if (loading) {
            return (<Loading />);
        }
        return (
            <div ref="root" className={styles.wrap}>
                <Header />
                {this._checkUserLogin()}
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
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);
