/**
 *  Mixin for some shared methods between components
 **/

function generateRow(colArray) {
    // Temporary delimiter characters unlikely to be typed by keyboard
    // This is to avoid accidentally splitting the actual contents
    const tmpColDelim = String.fromCharCode(11); // vertical tab character
    const tmpRowDelim = String.fromCharCode(0); // null character
    // actual delimiter characters for CSV format
    const colDelim = '","';
    const rowDelim = '"\r\n"';
    return colArray.map((row) =>
            row.map((col) => col.replace(/"/g, '""'))
                .join(tmpColDelim)
        )
        .join(tmpRowDelim).split(tmpRowDelim)
        .join(rowDelim)
        .split(tmpColDelim)
        .join(colDelim);
}

const mixins = {
    generateQuestionID() {
        return (Date.now().toString(32) + Math.random().toString(36).substr(2, 12)).toUpperCase();
    },

    getParameterByName(name) {
        const url = window.location.href;
        const rename = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${rename}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

    exportCSV(filename = 'Qustom', v = 'v1', header, content) {
        const rowDelim = '"\r\n"';
        const headerCSV = generateRow(header);
        const contentCSV = generateRow(content);

        const csv = `"${headerCSV}${rowDelim}${contentCSV}"`;
        // For IE (tested 10+)
        if (window.navigator.msSaveOrOpenBlob) {
            const blob = new Blob([decodeURIComponent(encodeURI(csv))], {
                type: 'text/csv;charset=utf-8;'
            });
            window.navigator.msSaveBlob(blob, filename);
        } else {
            const downloadLink = document.createElement('a');
            downloadLink.href = `data:application/csv;charset=utf-8,${encodeURIComponent(csv)}`;
            downloadLink.target = '_blank';
            downloadLink.download = `${filename}.csv`;
            downloadLink.click();
        }
    }
};

export default mixins;
