
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import IconButton from '../../IconButton';

class ControlBtn extends PureComponent {

    constructor() {
        super();
        this._onDeleteL10nClick = this._onDeleteL10nClick.bind(this);
        this._onExportL10nClick = this._onExportL10nClick.bind(this);
        this._onImportL10nClick = this._onImportL10nClick.bind(this);
    }

    render() {
        const { lang, selectedL10n } = this.props;
        const btnsData = [
            { id: 'exportBtn', string: 'Export', img: 'report', func: this._onExportL10nClick },
            { id: 'importBtn', string: 'Import', img: '', func: this._onImportL10nClick },
            { id: 'delBtn', string: 'Delete', img: 'delete', func: this._onDeleteL10nClick }
        ];
        let btns = [];
        btnsData.forEach((btn, idx) => {
            if (idx === 0 || idx === 1 ||
                (idx === 2 && selectedL10n !== '' && lang !== selectedL10n)) {
                // btn showed conditions:
                // if it is Export or Import
                // if it is Delete, and selectedL10n is not equal to basic lang
                    btns.push(
                        <IconButton
                            key={idx}
                            id={btn.id}
                            string={btn.string}
                            i18nKey={false}
                            img={btn.img}
                            onClick={btn.func}
                        />);
                }
        });

        return (
            <div ref="root" className={styles.control}>
                <div className={styles.wrap}>{btns}</div>
            </div>
        );
    }

    _onImportL10nClick() {

    }

    _onExportL10nClick() {
        const { popupActions } = this.props;
        popupActions.setPopup('ExportL10n');
    }

    _onDeleteL10nClick() {
        const { lang, selectedL10n, questionsActions } = this.props;
        if (lang === selectedL10n) {
            return;
        }
        questionsActions.deleteSelectedL10n();
    }
}

export default ControlBtn;
