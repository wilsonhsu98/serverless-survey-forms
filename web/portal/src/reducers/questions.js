
import * as types from '../constants/ActionTypes';
import * as values from '../constants/DefaultValues';
import Mixins from '../mixins/global';

export default function questions(state = [], action) {
    let originQue = [...state];
    switch (action.type) {
    case types.ADD_QUESTION:
        const len = originQue.length;
        const idx = action.page - 1;
        let survey = {};
        if (len >= action.page) {
            // if this page already existed
            // edit this page content
            survey = originQue[idx];
            survey.question = [
                ...survey.question,
                action.questions
            ];
            return [
                ...originQue.slice(0, idx),
                survey,
                ...originQue.slice(idx + 1)
            ];
        }
        // if this page didn't exist
        survey = {
            page: action.page,
            description: values.PAGE_TITLE,
            question: [action.questions]
        };
        return [
            ...originQue,
            survey
        ];

    case types.EDIT_QUESTION:
        findObject:
        for (let obj of originQue) {
            for (let que of obj.question) {
                if (que.id === action.que_id) {
                    Object.assign(que, action.questions);
                    break findObject;
                }
            }
        }
        return [...originQue];

    case types.COPY_QUESTION:
        const duplicateQue = Object.assign({}, originQue[action.page - 1].question[action.que_id], { id: Mixins.generateQuestionID() });
        originQue[action.page - 1].question.splice(action.que_id, 0, duplicateQue);
        return [...originQue];

    case types.DELETE_QUESTION:
        originQue[action.page - 1].question.splice(action.que_id, 1);
        return [...originQue];

    case types.EXCHANGE_QUESTION:
        const { bfPage, bfIdx, afPage, afIdx, questions } = action;
        if (bfPage !== afPage) {
            for (let obj of originQue) {
                if (obj.page === bfPage) {
                    obj.question.splice(bfIdx, 1);
                } else if (obj.page === afPage) {
                    obj.question.splice(afIdx, 0, questions);
                }
            }
        } else {
            for (let obj of originQue) {
                if (obj.page === afPage) {
                    obj.question.splice(bfIdx, 1);
                    obj.question.splice(afIdx, 0, questions);
                }
            }
        }
        return [...originQue];

    case types.DELETE_RATING_INPUT:
        findObject:
        for (let obj of originQue) {
            for (let que of obj.question) {
                if (que.id === action.que_id) {
                    delete que.input;
                    break findObject;
                }
            }
        }
        return [...originQue];

    case types.ADD_PAGE:
        const newPage = {
            page: action.page,
            description: values.PAGE_TITLE,
            question: []
        };
        return [
            ...originQue,
            newPage
        ];

    case types.EDIT_PAGE_TITLE:
        const editPage = originQue[action.page_id - 1];
        Object.assign(editPage, action.data);
        return [...originQue];

    case types.DELETE_PAGE:
        originQue.splice(action.page_id - 1, 1);
        originQue.forEach((page, idx) => {
            page.page = idx + 1;
        });
        return [...originQue];

    case types.EXCHANGE_PAGE:
        const { bfIdx:bfPageIdx, afIdx:afPageIdx } = action;
        const movePage = originQue[bfPageIdx];
        originQue.splice(bfPageIdx, 1);
        originQue.splice(afPageIdx, 0, movePage);
        originQue.forEach((page, idx) => {
            page.page = idx + 1;
        });
        return [...originQue];

    default:
        return state;
    }
}
