
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
// import * as AccountActions from '../../actions/account';
// import * as FBIDActions from '../../actions/fbID';

import Design from '../../components/Design';

class Create extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { account } = this.props;
        const requiredAccProps = {
            account: account
        };
        return (
            <div ref="root">
                Create
                <Design {...requiredAccProps} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fbID: state.fbID,
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // accountActions: bindActionCreators(AccountActions, dispatch),
        // fbIDActions: bindActionCreators(FBIDActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
