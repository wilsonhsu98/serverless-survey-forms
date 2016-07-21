/**
 *  Mixin for some shared methods between components
 **/

const mixins = {
    generateQuestionID() {
        return (Date.now().toString(32) + Math.random().toString(36).substr(2, 12)).toUpperCase();
    }
};

export default mixins;
