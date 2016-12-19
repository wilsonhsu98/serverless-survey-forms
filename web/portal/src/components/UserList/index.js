
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';

class UserList extends PureComponent {

    constructor() {
        super();
        this._renderList = this._renderList.bind(this);
        this._onNameClick = this._onNameClick.bind(this);
        this._onChangeRoleClick = this._onChangeRoleClick.bind(this);
    }

    render() {
        return (
            <div ref="root" className={styles.wrap}>
                <div className={styles.bird}></div>
                <div className={styles.list}>
                    {this._renderList()}
                </div>
            </div>
        );
    }

    _renderList() {
        const { users } = this.props;
        let list = [];
        users.sort((a, b) => {
            if (a.username > b.username) {
                return 1;
            }
            if (a.username < b.username) {
                return -1;
            }
            return 0;
        })
        .forEach((user, idx) => {
            const name = (
                <a
                    className="link ut-name"
                    data-id={idx}
                    onClick={this._onNameClick}
                >{user.username}</a>);
            const role = [
                this._generateClass('Admin', user.role),
                this._generateClass('Designer', user.role),
                this._generateClass('User', user.role)
            ];
            const tr = (
                <tr key={idx}>
                    <td className={styles.name}>
                        {name}
                    </td>
                    <td className={`${styles.role} ut-role`}>
                        <div
                            className={styles.roleBtn}
                            onClick={this._onChangeRoleClick}
                            data-id={idx}
                        >
                            <span className={classNames(role[0])}>
                                admin
                            </span>
                            <span
                                className={classNames(role[1])}
                            >
                                designer
                            </span>
                            <span className={classNames(role[2])}>
                                user
                            </span>
                        </div>
                    </td>
                </tr>
            );
            list.push(tr);
        });
        return (
            <table className={styles.listTb}>
                <thead>
                    <tr>
                        <th className={styles.name}>
                            <span>Name</span>
                        </th>
                        <th className={styles.role}>
                            <span>Role</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        );
    }

    _generateClass(_role, _userRole) {
        return {
            [`ut-${_role.toLowerCase()}`]: true,
            [`${styles.active}`]: _userRole === _role
        };
    }

    _onNameClick(e) {
        const { users, usersActions, webpageActions } = this.props;
        usersActions.setSelectedUser(users[e.currentTarget.getAttribute('data-id')]);
        webpageActions.setWebpage('userSurvey');
    }

    _onChangeRoleClick(e) {
        const idx = e.currentTarget.getAttribute('data-id');
        const role = e.target.innerHTML.replace(/[a-z]/, (a) => a.toUpperCase());
        this.props.usersActions.changeUserRole(idx, role);
    }
}

export default UserList;
