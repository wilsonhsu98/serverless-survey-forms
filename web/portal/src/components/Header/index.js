
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class Header extends PureComponent {

    constructor() {
        super();

        this.state = {
            isMenuOpen: false
        };
        this._onEditSubject = this._onEditSubject.bind(this);
        this._onBackClick = this._onBackClick.bind(this);
        this._toggleAdminMenu = this._toggleAdminMenu.bind(this);
        this._AdminMenuClick = this._AdminMenuClick.bind(this);
    }

    render() {
        const { account, subject, selectedUser, webpage } = this.props;
        const { isMenuOpen } = this.state;
        let content;
        let profile;
        let menu;
        switch (webpage) {
        case 'user':
            content = (
                <div className={`${styles.qustom} ut-qustom`}>
                    <div
                        className={styles.back}
                        onClick={this._onBackClick}
                    ></div>
                    <div className={`${styles.title} ut-title`}>
                        Administration
                    </div>
                </div>
            );
            break;
        case 'userSurvey':
            content = (
                <div className={`${styles.qustom} ut-qustom`}>
                    <div
                        className={styles.back}
                        onClick={this._onBackClick}
                    ></div>
                    <div className={`${styles.title} ut-title`}>
                        {selectedUser.username}'s Survey
                    </div>
                </div>
            );
            break;
        case 'create':
        case 'userCreate':
            content = (
                <div className={`${styles.qustom} ut-qustom`}>
                    <div
                        className={styles.back}
                        onClick={this._onBackClick}
                    ></div>
                    <div
                        id="title"
                        className={`${styles.title} ut-title`}
                        onClick={this._onEditSubject}
                    >
                        {subject}
                    </div>
                    <div className={styles.build}>
                        <div className={styles.status}>Build</div>
                    </div>
                </div>
            );
            break;
        default:
            if (account.role === 'Admin') {
                profile = (
                    <div
                        ref="admin"
                        className={styles.profile}
                        onClick={this._toggleAdminMenu}
                    >
                        <div className={styles.profileImg}></div>
                        <div className={styles.name}>{account.username}</div>
                        <div className={styles.arrow}></div>
                    </div>);
                menu = (
                    <div
                        className={styles.menu}
                        style={{ display: isMenuOpen ? 'block' : 'none' }}
                    >
                        <div className={styles.menuArrow}></div>
                        <ul className={styles.menulist}>
                            <li onClick={this._AdminMenuClick}>Administration</li>
                        </ul>
                    </div>);
            }
            content = (
                <div className={`${styles.trend} ut-trend`}>
                    <div className={styles.logo}></div>
                    <div className={styles.productlogo}></div>
                    {profile}
                    {menu}
                </div>
            );
        }

        const edit = webpage === 'create' || webpage === 'user' ? styles.edit : '';
        return (
            <div
                id="header"
                className={`${styles.header} ${edit}`}
            >
                <div className={styles.container}>
                    {content}
                </div>
            </div>
        );
    }

    _onEditSubject() {
        const { editSubjectActions } = this.props;
        editSubjectActions.openEdit(true);
    }

    _onBackClick() {
        const { webpage, questionsActions, usersActions, webpageActions } = this.props;
        if (webpage === 'create') {
            questionsActions.finishEdit('');
        } else if (webpage === 'userSurvey') {
            usersActions.emptySelectedUser();
            webpageActions.setWebpage('user');
        } else if (webpage === 'userCreate') {
            questionsActions.finishEdit('');
        } else {
            webpageActions.setWebpage('index');
        }
    }

    _toggleAdminMenu() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    }

    _AdminMenuClick() {
        this.props.webpageActions.setWebpage('user');
        this.setState({
            isMenuOpen: false
        });
    }
}

export default Header;
