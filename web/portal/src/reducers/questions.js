
import * as types from '../constants/ActionTypes';

export default function questions(state = [], action) {
    switch (action.type) {
    case types.ADD_QUESTION:
        const len = state.length;
        const idx = action.page - 1;
        let survey = {};
        if (len >= action.page) {
            // if this page already existed
            // edit this page content
            survey = state[idx];
            survey.question = [
                ...survey.question,
                action.questions
            ];
            return [
                ...state.slice(0, idx),
                survey,
                ...state.slice(idx + 1)
            ];
        }
        // if this page didn't exist
        survey = {
            page: action.page,
            description: 'Untitle Page',
            question: [action.questions]
        };
        return [
            ...state,
            survey
        ];
    case types.EDIT_QUESTION:
        findObject:
        for (let obj of state) {
            for (let que of obj.question) {
                if (que.id === action.id) {
                    Object.assign(que, action.questions);
                    break findObject;
                }
            }
        }
        return [...state];
    case types.EXCHANGE_QUESTION:
        const { afPage, afIdx, bfPage, bfIdx, questions } = action;
        if (bfPage !== afPage) {
            for (let obj of state) {
                if (obj.page === bfPage) {
                    obj.question.splice(bfIdx, 1);
                } else if (obj.page === afPage) {
                    obj.question.splice(afIdx, 0, questions);
                }
            }
        } else {
            for (let obj of state) {
                if (obj.page === afPage) {
                    obj.question.splice(bfIdx, 1);
                    obj.question.splice(afIdx, 0, questions);
                }
            }
        }
        return [...state];
    case types.ADD_PAGE:
        const page = {
            page: action.page,
            description: 'Untitle Page',
            question: []
        };
        return [
            ...state,
            page
        ];
    case types.EXCHANGE_PAGE:
        const { bfIdx:bfPageIdx, afIdx:afPageIdx } = action;
        const movePage = state[bfPageIdx];
        state.splice(bfPageIdx, 1);
        state.splice(afPageIdx, 0, movePage);
        state.forEach((page, idx) => {
            page.page = idx + 1;
        });
        return [...state];
    default:
        return state;
    }
}
