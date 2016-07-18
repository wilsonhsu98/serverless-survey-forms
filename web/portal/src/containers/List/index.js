
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class List extends PureComponent {

    render() {
        return (
            <div ref="root">
                List
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
