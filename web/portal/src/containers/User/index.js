
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as UsersActions from '../../actions/users';
import * as WebpageActions from '../../actions/webpage';

import UserList from '../../components/UserList';

class User extends PureComponent {

    componentWillMount() {
        const { usersActions } = this.props;
        usersActions.getUsers();
    }

    render() {
        const { users, usersActions, webpageActions } = this.props;

        return (
            <div ref="root">
                <UserList
                    users={users}
                    usersActions={usersActions}
                    webpageActions={webpageActions}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        usersActions: bindActionCreators(UsersActions, dispatch),
        webpageActions: bindActionCreators(WebpageActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
