/**
 *  Mixin for some shared methods between components
 **/

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
    }
};

export default mixins;
