
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';

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
        this._changeTabClick = this._changeTabClick.bind(this);
        this._handleDocumentClick = this._handleDocumentClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this._handleDocumentClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._handleDocumentClick);
    }

    render() {
        const { account, subject, surveyVersion, selectedUser, webpage } = this.props;
        const { isMenuOpen } = this.state;
        let content;
        let profile;
        let menu;
        const webpageArray = webpage.split('/');
        switch (webpageArray[0]) {
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
                        className={`${styles.title} ${styles.editable} ut-title`}
                        onClick={this._onEditSubject}
                    >
                        {subject}
                    </div>
                    <div className={styles.tab}>
                        <div className={styles.build}>
                            <div
                                className={classNames(`${styles.status}`,
                                    { [`${styles.current}`]:
                                    webpageArray.length <= 1 || webpageArray[1] === 'build' })}
                                data-type="build"
                                onClick={this._changeTabClick}
                            >Build</div>
                        </div>
                        {
                            surveyVersion !== 'v1' ?
                            (<div className={styles.build}>
                                <div
                                    className={classNames(`${styles.status}`,
                                        { [`${styles.current}`]: webpageArray[1] === 'l10n' })}
                                    data-type="l10n"
                                    onClick={this._changeTabClick}
                                >L10N</div>
                            </div>)
                            : ''
                        }
                    </div>
                </div>
            );
            break;
        default:
            if (account.role === 'Admin') {
                profile = (
                    <div
                        className={`${styles.profile} ut-admin`}
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

        const edit = webpageArray[0] === 'create' || webpageArray[0] === 'userCreate'
            || webpageArray[0] === 'user' ? styles.edit : '';
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
        const webpageArray = webpage.split('/');
        switch (webpageArray[0]) {
        case 'create':
            questionsActions.finishEdit('');
            break;
        case 'userSurvey':
            usersActions.emptySelectedUser();
            webpageActions.setWebpage('user');
            break;
        case 'userCreate':
            questionsActions.finishEdit('');
            break;
        default:
            webpageActions.setWebpage('index');
        }
    }

    _toggleAdminMenu(e) {
        e.stopPropagation();
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    }

    _handleDocumentClick() {
        this.setState({
            isMenuOpen: false
        });
    }

    _AdminMenuClick(e) {
        e.stopPropagation();
        this.props.webpageActions.setWebpage('user');
        this.setState({
            isMenuOpen: false
        });
    }

    _changeTabClick(e) {
        const { webpage, webpageActions } = this.props;
        const type = e.currentTarget.getAttribute('data-type');
        const webpageArray = webpage.split('/');
        webpageActions.setWebpage(`${webpageArray[0]}/${type}`);
        this.setState({
            isMenuOpen: false
        });
    }
}

export default Header;
