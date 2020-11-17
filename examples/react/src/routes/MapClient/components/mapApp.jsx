/*
 * @Author: 史涛
 * @Date: 2019-01-05 17:40:59
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-11-17 11:40:20
 */


import "../../../themes/iconfont/iconfont.css";
import { Layout, Row, Col } from "antd";
const { Header, Content } = Layout;
import PropTypes from "prop-types";
import React from "react";
import MapBoxMap from "./MapBoxGL/map";
import {
  // defaultMapStyle,
  // ROADMapStyle,
  MapBlueStyle,
  MapDarkStyle,
} from "./MapBoxGL/mapstyle";
import "../components/MapBoxGL/assest/mapiconfont/iconfont.css";
import {TimeControl} from '../modules/TimeControl/index';


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
    console.log(JSON.stringify(MapBlueStyle))
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
            <Row className="left_buttongroup">
              <Col xs={2} sm={2} md={2} lg={4} xl={6}>
                <div
                  className={
                    "header_button_left " +
                    (curmode === "OverallInfo" && "selected")
                  }
                >
                  <a onClick={() => this.setState({ curmode: "OverallInfo" })}>
                    整体信息
                  </a>
                </div>
              </Col>
              <Col xs={2} sm={2} md={2} lg={4} xl={6}>
                <div
                  className={
                    "header_button_left " +
                    (curmode === "GeoInfo" && "selected")
                  }
                >
                  <a onClick={() => this.setState({ curmode: "GeoInfo" })}>
                    地理专辑
                  </a>
                </div>
              </Col>
              <Col xs={20} sm={2} md={2} lg={4} xl={6}>
                <div
                  className={
                    "header_button_left " +
                    (curmode === "PublicService" && "selected")
                  }
                >
                  <a onClick={() => this.setState({ curmode: "PublicService" })}>
                  公共服务
                  </a>
                </div>
              </Col>
              <Col xs={2} sm={2} md={2} lg={4} xl={6}>
                <div
                  className={
                    "header_button_left " +
                    (curmode === "CityPopulation" && "selected")
                  }
                >
                  <a
                    onClick={() => this.setState({ curmode: "CityPopulation" })}
                  >
                    人口专辑
                  </a>
                </div>
              </Col>
             
            </Row>
            <div className="logo-label">时空大数据运营监测中心</div>
            <div className="datetime-label"><TimeControl></TimeControl></div>

            <Row className="right_buttongroup">
              <Col xs={2} sm={2} md={2} lg={4} xl={6}>
                <div  className={
                    "header_button_right " +
                    (curmode === "Economy" && "selected")
                  }>
                  <div onClick={() => this.setState({ curmode: "Economy" })}>经济专辑</div>
                </div>
              </Col>
              <Col xs={20} sm={2} md={2} lg={4} xl={6}>
                <div className={
                    "header_button_right " +
                    (curmode === "Corporation" && "selected")
                  }>
                  <div onClick={() => this.setState({ curmode: "Corporation" })}>法人专辑</div>
                </div>
              </Col>
              <Col xs={2} sm={2} md={2} lg={4} xl={6}>
                <div className={
                    "header_button_right " +
                    (curmode === "DevOps" && "selected")
                  }>
                  <div onClick={() => this.setState({ curmode: "DevOps" })}>运维专辑</div>
                </div>
              </Col>
              <Col xs={2} sm={2} md={2} lg={4} xl={6}>
                <div className={
                    "header_button_right " +
                    (curmode === "IntelliSense" && "selected")
                  }>
                  <div onClick={() => this.setState({ curmode: "IntelliSense" })}>智能感知</div>
                </div>
              </Col>
            </Row>
          </Header>
          <div className="bk_top"></div>
          <div className="bk_top_coner"></div>
          <div className="bk_top_dark"></div>
          <div className="bk_left"></div>
          <div className="bk_left_dark"></div>
          <div className="bk_right"></div>
          <div className="bk_right_dark"></div>
          <div className="bk_bottom"></div>
          <div className="bk_bottom_dark"></div>
          <Content>
         { curmode !== "DevOps" &&<MapBoxMap showmode={curmode} onMapViewChanges={this.props.onMapViewChanges} />}
          </Content>
        </Layout>
      );
    }
    return null;
  }
}

export default mapApp;
