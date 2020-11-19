/*
 * @Author: 史涛
 * @Date: 2019-01-05 17:40:59
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-11-19 17:03:16
 */


import "../../../themes/iconfont/iconfont.css";
import { Layout, Row, Col } from "antd";
const { Header, Content } = Layout;
import PropTypes from "prop-types";
import React from "react";
import MapBoxMap from "./MapBoxGL/map";
import {
  MapBlueStyle,
} from "./MapBoxGL/mapstyle";
import "../components/MapBoxGL/assest/mapiconfont/iconfont.css";
import {TimeControl} from '../modules/TimeControl/index';
import Panels from '../modules/Panels/panels'


class mapApp extends React.Component {
  static propTypes = {
    // redux store slice with map configuration (bound through connect to store at the end of the file)
    mapConfig: PropTypes.object,
    map: PropTypes.object,
    layers: PropTypes.object,
    step: PropTypes.number,
    mapStateSource: PropTypes.string,
    currentZoom: PropTypes.number,
    changeZoomLevel: PropTypes.func,
    mapOnClick: PropTypes.func,
    showsidebar: PropTypes.bool,
    drawStatus: PropTypes.string,
    drawOwner: PropTypes.string,
    drawMethod: PropTypes.string,
    features: PropTypes.array,
    query: PropTypes.object,
  };

  static defaultProps = {
    step: 1,
    currentZoom: 3,
    showsidebar: false,
    drawStatus: null,
    drawOwner: null,
    drawMethod: null,
    features: [],
    changeZoomLevel: () => {},
    style: {
      radius: 5,
      color: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0,
    },
    arealocationstyle: {
      dashArray: "6",
      radius: 5,
      color: "red",
      weight: 2,
      opacity: 0.4,
      fillOpacity: 0.2,
      fillColor: "#1890ff",
    },
  };

  state = {
    model3d: "mapbox",
    StreetViewVisible: false,
    uploadvisiable: false,
    resize: 0,
    filelist: [],
    curmode: "OverallInfo",
  };

  componentDidMount() {
    this.props.loadStyle(MapBlueStyle);
    this.props.configureMap(mapConfigJson);
   
  }

  


  render() {
    const { mapConfig, map3d } = this.props;
    const { curmode } = this.state;
    // wait for loaded configuration before rendering
    if (mapConfig && map3d) {
      return (
        <Layout>
          <Header className="mapheader">
            <div className="logo-label">如皋</div>
            <div className="datetime-label"><TimeControl></TimeControl></div>
          </Header>
          <Content>
            <Panels></Panels>
         { curmode !== "DevOps" &&<MapBoxMap showmode={curmode} onMapViewChanges={this.props.onMapViewChanges} />}
          </Content>
        </Layout>
      );
    }
    return null;
  }
}

export default mapApp;
