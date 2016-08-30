
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
    }

    componentDidMount() {
        const { account } = this.props;
        if (account.role === 'Admin') {
            const admin = this.refs.admin;
            admin.addEventListener('click', this._toggleAdminMenu);
        }
    }

    componentWillUnmount() {
        const { account } = this.props;
        if (account.role === 'Admin') {
            const admin = this.refs.admin;
            admin.removeEventListener('click', this._toggleAdminMenu);
        }
    }

    render() {
        const { account, subject, webpage } = this.props;
        const { isMenuOpen } = this.state;
        let content;
        if (webpage === 'create') {
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
        } else {
            let profile;
            let menu;
            if (account.role === 'Admin') {
                profile = (<div ref="admin" className={styles.profile}>
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
                            <li>Administration</li>
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

        return (
            <div
                id="header"
                className={`${styles.header} ${webpage === 'create' ? styles.edit : ''}`}
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
        const { questionsActions } = this.props;
        questionsActions.finishEdit('');
    }

    _toggleAdminMenu() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    }
}

export default Header;
