
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class UserList extends PureComponent {

    constructor() {
        super();
        this._renderList = this._renderList.bind(this);
        this._onNameClick = this._onNameClick.bind(this);
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
        users.forEach((user, idx) => {
            const name = (
                <a
                    className="link ut-name"
                    data-id={user.accountid}
                    onClick={this._onNameClick}
                >{user.username}</a>);
            const tr = (
                <tr key={idx}>
                    <td className={styles.name}>
                        {name}
                    </td>
                    <td className={`${styles.role} ut-role`}>
                        <div className={styles.roleBtn}>
                            <span className={user.role === 'Admin' ? styles.active : ''}>
                                admin
                            </span>
                            <span className={user.role === 'Designer' ? styles.active : ''}>
                                designer
                            </span>
                            <span className={user.role === 'User' ? styles.active : ''}>
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

    _onNameClick(e) {
        console.log(e.currentTarget.getAttribute('data-id'));
    }
}

export default UserList;
