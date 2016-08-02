
import * as types from '../constants/ActionTypes';


export function setPreview(preview, previewID) {
    return {
        type: types.SET_PREVIEW,
        preview: preview,
        previewID: previewID
    };
}

export function changePreview(preview) {
    return {
        type: types.SET_CHANGE_PREVIEW,
        preview: preview
    };
}

export function closePreview() {
    return {
        type: types.STOP_PREVIEW
    };
}
