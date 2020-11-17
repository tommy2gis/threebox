/*
 * @Author: 史涛
 * @Date: 2019-01-05 19:33:28
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-08-27 16:15:07
 */

const CHANGE_MAP3D_VIEW = "CHANGE_MAP3D_VIEW";
const ZOOM_TO_POINT3D = "ZOOM_TO_POINT3D";
const LOAD_STYLE="LOAD_STYLE";
const ADD_SOURCEANDLAYERS="ADD_SOURCEANDLAYERS";
const REMOVE_SOURCEANDLAYERS="REMOVE_SOURCEANDLAYERS";
const UPDATE_SOURCE="UPDATE_SOURCE";
const UPDATE_LAYER="UPDATE_LAYER";
const CHANGE_STYLE='CHANGE_STYLE';
const UPDATE_BOUNDS='UPDATE_BOUNDS';
const HIGHLIGHT_POINT='HIGHLIGHT_POINT';
const ADD_SOURCES='ADD_SOURCES';
const ADD_LAYERS='ADD_LAYERS';


function zoomToPoint3D(pos, zoom) {
  return {
    type: ZOOM_TO_POINT3D,
    pos,
    zoom
  };
}



function highlightPoint(pos) {
  return {
    type: HIGHLIGHT_POINT,
    pos
  };
}


function updateBounds(bounds) {
  return {
    type: UPDATE_BOUNDS,
    bounds
  };
}

function loadStyle(mapstyle) {
  return {
    type: LOAD_STYLE,
    mapstyle
  };
}

function changStyle(mapstyle){
  return {
    type: CHANGE_STYLE,
    mapstyle
  };
}

function updateSource(sourcename,source){
  
  return {
    type: UPDATE_SOURCE,
    sourcename,
    source
  };
}

function updateLayer(layerid,{filter,paint,layout}){
  
  return {
    type: UPDATE_LAYER,
    layerid,
    filter,
    paint,
    layout
  };
}


function addSources(results){
  return {
    type: ADD_SOURCES,
    results
  };
}


function addLayers(results){
  return {
    type: ADD_LAYERS,
    results
  };
}


function addSourceAndLayers(sourcename,source,layers){
  return {
    type: ADD_SOURCEANDLAYERS,
    sourcename,
    source,
    layers
  };
}


function removeSourceAndLayers(sourcename){
  return {
    type: REMOVE_SOURCEANDLAYERS,
    sourcename
  };
}




function changeMap3DView(latitude, longitude, zoom, maxZoom,minZoom, bearing, pitch,heading) {
  return {
    type: CHANGE_MAP3D_VIEW,
    latitude,
    longitude,
    center:[longitude,latitude],
    zoom,
    maxZoom,
    minZoom,
    // bearing, 
    // pitch
  };
}



export {
  CHANGE_MAP3D_VIEW,
  changeMap3DView,
  ZOOM_TO_POINT3D,
  zoomToPoint3D,
  loadStyle,
  ADD_SOURCEANDLAYERS,
  REMOVE_SOURCEANDLAYERS,
  removeSourceAndLayers,
  addSourceAndLayers,
  addSources,
  ADD_SOURCES,
  ADD_LAYERS,
  addLayers,
  UPDATE_SOURCE,
  updateSource,
  updateLayer,
  HIGHLIGHT_POINT,
  highlightPoint,
  UPDATE_LAYER,
  CHANGE_STYLE,
  changStyle,
  LOAD_STYLE,
  updateBounds,
  UPDATE_BOUNDS
};
