
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as TokenActions from '../../actions/token';

import Menu from '../../components/Menu';
import FBLogin from '../../components/FBLogin';
import Loading from '../../components/Loading';

class Portal extends PureComponent {

    render() {
        const { loading } = this.props;

        return (
            <div ref="root">
                {loading
                    ? <Loading />
                    : this._checkUserLogin()}
            </div>
        );
    }

    _checkUserLogin() {
        const { account } = this.props;

        if (!account || !account.hasOwnProperty('accountid') || (account.role !== 'Designer' && account.role !== 'Admin')) {
            // if user didn't grant FB permission
            const requiredProps = {
                tokenActions: this.props.tokenActions
            };
            return <FBLogin {...requiredProps} />;
        }

        // if user has a account and the account role is Designer or Admin
        return (
            <div>
                <Menu />
                <div className={styles.wrap}>
                    {this.props.children}
                </div>
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
    return {
        tokenActions: bindActionCreators(TokenActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);
