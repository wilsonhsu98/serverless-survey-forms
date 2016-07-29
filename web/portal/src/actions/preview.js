
import * as types from '../constants/ActionTypes';


export function setPreview(preview, previewID) {
    return {
        type: types.SET_PREVIEW,
        preview: preview,
        previewID: previewID
    };
}

export function closePreview() {
    return {
        type: types.STOP_PREVIEW
    };
}
