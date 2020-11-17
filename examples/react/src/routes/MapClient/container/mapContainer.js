

import { connect } from 'react-redux';
import mapApp from '../components/mapApp';
import { changeMapView,mouseDownOnMap,zoomToPoint} from '../actions/map';
import {zoomToPoint3D,loadStyle,updateLayer,changStyle,updateSource,addLayers,addSources} from '../components/MapBoxGL/actions';
import {endDrawing} from '../actions/draw';
import { switchLayers }  from '../actions/layers';
import {resetQuery}  from '../actions/query';
import {configureMap} from '../actions/config';

export default connect((state) => {
  return {
    mapConfig: state.mapConfig,
    map: state.map || state.mapConfig && state.mapConfig.map,
    mapStateSource: state.map && state.map.mapStateSource,
    layers: state.layers,
    query: state.query,
    arealocation: state.arealocation,
    routing:state.routing,
    draw:state.draw,
    sidebar:state.sidebar,
    panoramic:state.panoramic,
    thematic:state.thematic,
    toolbar:state.toolbar,
    thematics:state.thematics,
    map3d:state.map3d
  };
}, {
  onMapViewChanges: changeMapView,
    onSwitchLayer: switchLayers,
    updateLayer,
    updateSource,
    configureMap,
    loadStyle,
    changStyle,
    endDrawing,
    resetQuery,
    mouseDownOnMap,
    addSources,
    addLayers,
    zoomToPoint
  })(mapApp);








