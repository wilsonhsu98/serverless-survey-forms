
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as AccountActions from '../../actions/account';
import * as FBIDActions from '../../actions/fbID';

import Design from '../../components/Design';
import FBLogin from '../../components/FBLogin';
import Loading from '../../components/Loading';

class Portal extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { loading } = this.props;

        return (
            <div ref="root">
                {loading
                    ? <Loading />
                    : this._doUserLogin()}
            </div>
        );
    }

    _doUserLogin() {
        const { fbID, account } = this.props;
        if (fbID === '') {
            // if user didn't grant FB permission
            const requiredFBProps = {
                fbIDActions: this.props.fbIDActions
            };
            return <FBLogin {...requiredFBProps} />;
        }
        if (account && account.role && (account.role === 'Designer' || account.role === 'Admin')) {
            // if user had account and account role is Designer or Admin
            const requiredAccProps = {
                account: account
            };
            return <Design {...requiredAccProps} />;
        }
        return <div>You cannot pass!</div>;
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        fbID: state.fbID,
        account: state.account,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        accountActions: bindActionCreators(AccountActions, dispatch),
        fbIDActions: bindActionCreators(FBIDActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);
