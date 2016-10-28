
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
        const { selectedL10n } = this.props;
        const btnsData = [
            { id: 'importBtn', string: 'Import', img: '', func: this._onImportL10nClick },
            { id: 'exportBtn', string: 'Export', img: 'report', func: this._onExportL10nClick },
            { id: 'delBtn', string: 'Delete', img: 'delete', func: this._onDeleteL10nClick }
        ];
        let btns = [];
        btnsData.forEach((btn, idx) => {
            if (idx === 0 || (idx !== 0 && selectedL10n !== '')) {
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

    }

    _onDeleteL10nClick() {
        const { lang, selectedL10n } = this.props;
        if (lang === selectedL10n) {
            console.log('You can\'t delete basic language.');
            return;
        }
    }
}

export default ControlBtn;
