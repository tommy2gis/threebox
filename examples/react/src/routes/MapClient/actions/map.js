/*
 * @Author: 史涛 
 * @Date: 2019-01-05 19:33:28 
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-09-10 10:33:55
 */
const CHANGE_MAP_VIEW = 'CHANGE_MAP_VIEW';
const CLICK_ON_MAP = 'CLICK_ON_MAP';
const MOUSEDOWN_ON_MAP = 'MOUSEDOWN_ON_MAP';
const CHANGE_MOUSE_POINTER = 'CHANGE_MOUSE_POINTER';
const CHANGE_ZOOM_LVL = 'CHANGE_ZOOM_LVL';
const PAN_TO = 'PAN_TO';
const ZOOM_TO_EXTENT = 'ZOOM_TO_EXTENT';
const ZOOM_TO_POINT = 'ZOOM_TO_POINT';
const CHANGE_MAP_CRS = 'CHANGE_MAP_CRS';
const CHANGE_MAP_SCALES = 'CHANGE_MAP_SCALES';
const CHANGE_MAP_STYLE = 'CHANGE_MAP_STYLE';
const CHANGE_ROTATION = 'CHANGE_ROTATION';
const CREATION_ERROR_LAYER = 'CREATION_ERROR_LAYER';
const UPDATE_VERSION = 'UPDATE_VERSION';
const INIT_MAP = 'INIT_MAP';
const RESIZE_MAP = 'RESIZE_MAP';
const CHANGE_MAP_STATICS='CHANGE_MAP_STATICS';
const CHANGE_AREA='CHANGE_AREA';

import {collapseResult} from './query'
function creationError(options) {
    return {
        type: CREATION_ERROR_LAYER,
        options
    };
}
function zoomToPoint(pos, zoom) {
    return {
        type: ZOOM_TO_POINT,
        pos,
        zoom
    };
}

function changeMapStatics(module) {
    return {
        type: CHANGE_MAP_STATICS,
        module
    };
}

function changeArea(area) {
    return {
        type: CHANGE_AREA,
        area
    };
    
}

function changeMapView(center, zoom, bbox, size, mapStateSource, projection, viewerOptions) {
    return {
        type: CHANGE_MAP_VIEW,
        center,
        zoom,
        bbox,
        size,
        mapStateSource,
        projection,
        viewerOptions
    };
}

function changeMapCrs(crs) {
    return {
        type: CHANGE_MAP_CRS,
        crs: crs
    };
}

function changeMapScales(scales) {
    return {
        type: CHANGE_MAP_SCALES,
        scales: scales
    };
}

function clickOnMap(point, layer) {
    return {
        type: CLICK_ON_MAP,
        point: point,
        layer
    };
}

function mouseDownOnMap() {
    return (dispatch,getState) => {
        const state = getState();
        (!state.query.resultcollapsed) && dispatch(collapseResult(true));
    }
}



function changeMousePointer(pointerType) {
    return {
        type: CHANGE_MOUSE_POINTER,
        pointer: pointerType
    };
}

function changeZoomLevel(zoomLvl, mapStateSource) {
    return {
        type: CHANGE_ZOOM_LVL,
        zoom: zoomLvl,
        mapStateSource: mapStateSource
    };
}

function panTo(center) {
    return {
        type: PAN_TO,
        center
    };
}

function zoomToExtent(extent, crs, maxZoom) {
    return {
        type: ZOOM_TO_EXTENT,
        extent,
        crs,
        maxZoom
    };
}

function changeRotation(rotation, mapStateSource) {
    return {
        type: CHANGE_ROTATION,
        rotation,
        mapStateSource
    };
}

function changeMapStyle(style, mapStateSource) {
    return {
        type: CHANGE_MAP_STYLE,
        style,
        mapStateSource
    };
}
function updateVersion(version) {
    return {
        type: UPDATE_VERSION,
        version
    };
}

function initMap() {
    return {
        type: INIT_MAP
    };
}

function resizeMap() {
    return {
        type: RESIZE_MAP
    };
}

export {
    CHANGE_MAP_VIEW,
    CLICK_ON_MAP,
    CHANGE_MOUSE_POINTER,
    CHANGE_ZOOM_LVL,
    PAN_TO,
    changeMapStatics,
    CHANGE_MAP_STATICS,
    changeArea,
    CHANGE_AREA,
    ZOOM_TO_EXTENT,
    CHANGE_MAP_CRS,
    CHANGE_MAP_SCALES,
    CHANGE_MAP_STYLE,
    CHANGE_ROTATION,
    ZOOM_TO_POINT,
    CREATION_ERROR_LAYER,
    UPDATE_VERSION,
    INIT_MAP,
    mouseDownOnMap,
    RESIZE_MAP,
    changeMapView,
    clickOnMap,
    changeMousePointer,
    changeZoomLevel,
    changeMapCrs,
    changeMapScales,
    zoomToExtent,
    panTo,
    changeMapStyle,
    changeRotation,
    zoomToPoint,
    creationError,
    updateVersion,
    initMap,
    resizeMap
};
