/*
 * @Author: 史涛
 * @Date: 2019-01-05 19:31:08
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-09-10 10:35:04
 */

var {
  CHANGE_MAP_VIEW,
  CHANGE_MOUSE_POINTER,
  CHANGE_ZOOM_LVL,
  CHANGE_MAP_CRS,
  CHANGE_MAP_SCALES,
  ZOOM_TO_EXTENT,
  PAN_TO,
  CHANGE_MAP_STYLE,
  CHANGE_ROTATION,
  UPDATE_VERSION,
  ZOOM_TO_POINT,
  CHANGE_MAP_STATICS,
  CHANGE_AREA,
  RESIZE_MAP,
} = require("../actions/map");
const { isArray } = require("lodash");

var assign = require("object-assign");

const initialState = {
  module: "road",
  curarea:null,
};

function map(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MAP_VIEW:
      const { type, ...params } = action;
      return assign({}, state, params);
    case CHANGE_MOUSE_POINTER:
      return assign({}, state, {
        mousePointer: action.pointer,
      });
    case CHANGE_ZOOM_LVL:
      var data = assign({}, state, {
        zoom: action.zoom,
        mapStateSource: action.mapStateSource,
      });
      return data;
    case CHANGE_MAP_CRS:
      return assign({}, state, {
        projection: action.crs,
      });

    case ZOOM_TO_POINT: {
      return assign({}, state, {
        center: action.pos,
        zoom: action.zoom,
        mapStateSource: null,
      });
    }

    case CHANGE_MAP_STATICS: {
      return assign({}, state, {
        staticsmodule: action.module,
      });
    }

    case CHANGE_AREA: {
        return assign({}, state, {
          curarea: action.area,
        });
      }
    case PAN_TO: {
      const center = CoordinatesUtils.reproject(
        action.center,
        action.center.crs,
        "EPSG:4326"
      );
      return assign({}, state, {
        center,
        mapStateSource: null,
      });
    }
    case CHANGE_MAP_STYLE: {
      return assign({}, state, {
        mapStateSource: action.mapStateSource,
        style: action.style,
        resize: state.resize ? state.resize + 1 : 1,
      });
    }
    case RESIZE_MAP: {
      return assign({}, state, { resize: state.resize ? state.resize + 1 : 1 });
    }
    case CHANGE_ROTATION: {
      let newBbox = assign({}, state.bbox, { rotation: action.rotation });
      return assign({}, state, {
        bbox: newBbox,
        mapStateSource: action.mapStateSource,
      });
    }
    case UPDATE_VERSION: {
      return assign({}, state, { version: action.version });
    }
    default:
      return state;
  }
}

export default map;
