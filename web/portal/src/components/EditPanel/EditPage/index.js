
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class EditPage extends PureComponent {

    constructor() {
        super();

        this._mouseClickEvent = this._mouseClickEvent.bind(this);
        this._panelClickEvent = this._panelClickEvent.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this._mouseClickEvent);
        $('#editPanel').on('click', this._panelClickEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._mouseClickEvent);
        $('#editPanel').off('click', this._panelClickEvent);
    }

    render() {
        const { questions, editPage } = this.props;
        const page = questions[editPage - 1];

        return (
            <div id="editPanel" className="editpanel">
                <div>Edit Page</div>
                <div className={styles.item}>
                    Page #{page.page}:&nbsp;
                    <input
                        type="text"
                        value={page.description}
                        onChange={this._handleChangeEvent}
                    />
                </div>

                <div className="bottom">
                    <button
                        data-type="save"
                        className="actionBtn"
                    >
                        Save
                    </button>
                    <button
                        data-type="cancel"
                        className="actionBtn"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    _mouseClickEvent(e) {
        const { editPageActions } = this.props;
        if (e.target.id !== 'editPanel') {
            editPageActions.stopEditPage();
        }
    }

    _panelClickEvent(e) {
        e.stopPropagation();

        if (e.target.getAttribute('data-type') === 'cancel') {
            const { editPageActions } = this.props;
            editPageActions.stopEditPage();
        }
    }

    _handleChangeEvent(e) {
        const { editPage, questionsActions } = this.props;
        const data = { description: e.target.value || 'Untitle Page' };
        questionsActions.editPageTitle(editPage, data);
    }
}

export default EditPage;
