/*
 * @Author: 史涛 
 * @Date: 2019-01-05 19:33:20 
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-02-11 18:18:25
 */
const CHANGE_DRAWING_STATUS = 'CHANGE_DRAWING_STATUS';
const END_DRAWING = 'DRAW:END_DRAWING';
const SET_CURRENT_STYLE = 'DRAW:SET_CURRENT_STYLE';
const GEOMETRY_CHANGED = 'DRAW:GEOMETRY_CHANGED';
const DRAW_SUPPORT_STOPPED = 'DRAW:DRAW_SUPPORT_STOPPED';
const DRAW_ENABLE = 'DRAW:DRAW_ENABLE';

import {showErrorPanel} from '../modules/ToolBar/actions'

function geometryChanged(features, owner, enableEdit) {
    return {
        type: GEOMETRY_CHANGED,
        features,
        owner,
        enableEdit
    };
}
function drawStopped() {
    return {
        type: DRAW_SUPPORT_STOPPED
    };
}

function drawEnable(enable) {
    return {
        type: DRAW_ENABLE,
        enable
    };
}

function changeDrawingStatus(status, method, owner, features, options, style) {
    return {
        type: CHANGE_DRAWING_STATUS,
        status,
        method,
        owner,
        features,
        options,
        style
    };
}


function endDrawing(geometry, owner) {

    return (dispatch,getState) => {
        dispatch({
            type: END_DRAWING,
            geometry,
            owner
        });
        if(owner==='error'){
            dispatch(showErrorPanel(true))
        }

    }
}

function setCurrentStyle(style) {
    return {
        type: SET_CURRENT_STYLE,
        currentStyle: style
    };
}

const drawSupportReset = (owner) => changeDrawingStatus("clean", "", owner, [], {});

export {
    CHANGE_DRAWING_STATUS, changeDrawingStatus, drawSupportReset,
    END_DRAWING, endDrawing,DRAW_ENABLE,drawEnable,
    SET_CURRENT_STYLE, setCurrentStyle,
    DRAW_SUPPORT_STOPPED, drawStopped,
    GEOMETRY_CHANGED, geometryChanged
};
