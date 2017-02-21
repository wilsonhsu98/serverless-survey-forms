
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import IconButton from '../IconButton';

class SubscriberList extends PureComponent {

    constructor() {
        super();
        this._renderList = this._renderList.bind(this);
        this._onAddSubscriberClick = this._onAddSubscriberClick.bind(this);
        this._onDeleteSubscriberClick = this._onDeleteSubscriberClick.bind(this);
    }

    componentWillMount() {
        const { subscribersActions } = this.props;
        subscribersActions.getSubscribers();
    }

    render() {
        const { subscribers } = this.props;
        return (
            <div ref="root" className={styles.wrap}>
                <div className={styles.control}>
                    <IconButton
                        id="addBtn"
                        string="Add Subscriber"
                        i18nKey={false}
                        img=""
                        onClick={this._onAddSubscriberClick}
                    />
                </div>
                <div className={styles.wrap}>
                    <div className={styles.bird}></div>
                    <div
                        className={`${styles.list}
                        ${subscribers.length === 0 ? styles.nodata : ''}`}
                    >
                        {subscribers.length > 0 ?
                            this._renderList() :
                            <div className={styles.description}>No subscribers.</div>}
                    </div>
                </div>
            </div>
        );
    }

    _renderList() {
        const { subscribers } = this.props;
        let list = [];
        subscribers.sort()
        .forEach((email, idx) => {
            const tr = (
                <tr key={idx}>
                    <td className={styles.name}>
                        <a
                            className="link ut-email"
                            data-id={idx}
                        >{email}</a>
                    </td>
                    <td>
                        <IconButton
                            i18nKey={false}
                            img="delete"
                            onClick={this._onDeleteSubscriberClick}
                            extraProps={{ 'data-email': email }}
                        />
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
                            <span>Subscriber Email</span>
                        </th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        );
    }

    _onAddSubscriberClick() {
        const { popupActions } = this.props;
        popupActions.setPopup('addSubscriber');
    }

    _onDeleteSubscriberClick(e) {
        const { subscribersActions } = this.props;
        subscribersActions.deleteSubscriber(e.currentTarget.getAttribute('data-email'));
    }
}

export default SubscriberList;
