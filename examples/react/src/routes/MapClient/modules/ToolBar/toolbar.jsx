/*
 * @Author: 史涛
 * @Date: 2019-01-05 19:30:28
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-07-23 10:59:04
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeZoomLevel } from "../../actions/map";
import { changeDrawingStatus } from "../../actions/draw";
import { selectAreaLocation } from "../AreaLocation/actions";
import { updateLayer } from "../../components/MapBoxGL/actions";
import { Card, Menu, Icon, Modal, Dropdown, message, Divider } from "antd";
import ConfigUtils from "../../../../utils/ConfigUtils";
//import AreaLocation from "../AreaLocation/arealocation";
import { showSpatialQuery } from "../ThematicList/actions";
import SetLocation from "./setlocation";
import MapExport from "../MapExport/mapexport";
import LayerCompare from "../LayerCompare/layercompare";
import "./toolbar.less";

import * as screenfull from "screenfull";

class ToolBar extends Component {
  static propTypes = {
    step: PropTypes.number,
    mapStateSource: PropTypes.string,
    currentZoom: PropTypes.number,
    changeZoomLevel: PropTypes.func,
    map: PropTypes.object,
    mapConfig: PropTypes.object,
  };

  static defaultProps = {
    step: 1,
    currentZoom: 3,
    changeZoomLevel: () => {},
  };

  state = {
    juanModalVisible: false,
    screemModalVisible: false,
    isFullscreen: false,
    mesurevisable: false,
    showLayerCompare: false,
    showMapExport: false,
  };

  setJuanModalVisible(juanModalVisible) {
    this.setState({ juanModalVisible });
  }

  setScreemModalVisible(screemModalVisible) {
    this.setState({ screemModalVisible });
  }

  setMeasureVisible(mesurevisable) {
    this.setState({ mesurevisable });
  }

  onVisibleChange = (e) => {
    this.setMeasureVisible(false);
  };

  onDisMeasure = () => {
    if (this.props.map.module === "cesium") {
      this.props.changeDrawingStatus(
        "start",
        "measure_polyline_3d",
        "measure",
        [],
        {}
      );
    } else {
      message.info("双击结束测量");
      //this.props.changeDrawingStatus('clean', '', "measure", [], {});
      this.props.changeDrawingStatus("start", "polyline", "measure", [], {});
    }
  };

  onRreaMeasure = () => {
    if (this.props.map.module === "cesium") {
      this.props.changeDrawingStatus(
        "start",
        "measure_polygon_3d",
        "measure",
        [],
        {}
      );
    } else {
      message.info("双击结束测量");
      //this.props.changeDrawingStatus('clean', '', "measure", [], {});
      this.props.changeDrawingStatus("start", "polygon", "measure", [], {});
    }
  };

  onLocClose = () => {
    this.setState({ locationshow: false });
  };


  handlePrint = () => {
    this.props.changeDrawingStatus("print", "", "toolbar", [], {});
  };
  handleClear = () => {
    this.props.changeDrawingStatus("clean", "", "measure", [], {});
  };

  handleSpatialQuery = () => {
    this.props.showSpatialQuery(true);
  };
  handleErrorDraw = () => {
    message.info("请点击纠正位置");
    this.props.changeDrawingStatus("start", "point", "error", [], {});
  };
  handleScreenfull = () => {
    if (ConfigUtils.getBrowserProperties().ie) {
      message.info("ie模式下请使用键盘的F11键");
      return;
    }
    if (screenfull.enabled) {
      if (this.state.isFullscreen) {
        this.setState({ isFullscreen: false });
        screenfull.exit();
      } else {
        screenfull.request();
        this.setState({ isFullscreen: true });
      }
    }
  };

  showHistoryImage = () => {
    this.setState({ showHistoryImage: true });
  };

  hideHistoryImage = () => {
    this.setState({ showHistoryImage: false });
  };

  showLayerCompare = () => {
    this.setState({ showLayerCompare: true });
  };

  hideLayerCompare = () => {
    this.setState({ showLayerCompare: false });
  };

  showMapExport = () => {
    this.setState({ showMapExport: true });
  };

  hideMapExport = () => {
    this.setState({ showMapExport: false });
  };

  render() {
    const { themlist } = this.props.thematics;
    const sourcedata =
      themlist.length > 0
        ? themlist.map((e) => {
            e.pId = e.pid;
            e.title = e.name;
            e.value = e.name;
            e.layerid = e.layers;
            e.selectable = e.pid === 1 ? false : true;
            return e;
          })
        : [];

    const toolmenu = (
      <Menu
        className={
          this.state.mesurevisable
            ? "toolbar_measure_list"
            : "toolbar_measure_list ant-dropdown-hidden"
        }
      >
        <Menu.Item>
          <a id="toolbar_measure_dis" onClick={this.onDisMeasure}>
            <i className="iconfont icon-ceju" style={{ marginRight: -5 }} />{" "}
            测距
          </a>
        </Menu.Item>
        <Menu.Item>
          <a id="toolbar_measure_area" onClick={this.onRreaMeasure}>
            <i className="iconfont icon-cemian" /> 测面
          </a>
        </Menu.Item>

        <Menu.Item>
          <a onClick={this.handleClear} id="">
            <i className="iconfont icon-shanchulaji-xianxing" /> 清除
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => this.setState({ locationshow: true })} id="">
            <i className="iconfont icon-location-ok-copy" /> 坐标定位
          </a>
        </Menu.Item>
        {/* <Menu.Item>
        <a onClick={() => this.showHistoryImage()} id="">
          <i className="iconfont icon-fenpingduibi" /> 历史影像
        </a>
      </Menu.Item> */}
        <Menu.Item>
          <a onClick={this.showLayerCompare} id="">
            <i className="iconfont icon-fenpingduibi" /> 分屏对比
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.handlePrint} id="">
            <i className="iconfont icon-ditudaochu" /> 地图导出
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.props.showFileUpload} id="">
            <i className="iconfont icon-wenjianshangchuan" /> 数据加载
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Card className="toolbar_card" id="toolbar_card" bordered={false}>
          {/* <AreaLocation />
          <Divider type="vertical" /> */}
          <button
            type="button"
            className="ant-btn toolbar_btn"
            onClick={this.handleSpatialQuery}
          >
            <i className="iconfont icon-dituchaxun"></i>
            <span>空间查询</span>
          </button>
          <Divider type="vertical" />
          <Dropdown
            overlay={toolmenu}
            visible={true}
            onVisibleChange={this.onVisibleChange}
          >
            <button
              type="button"
              className="ant-btn toolbar_btn"
              onMouseMove={() => this.setMeasureVisible(true)}
            >
              <i className="iconfont icon-gongjuxiang"></i>
              <span>工具箱</span>
              <Icon type="down" />
            </button>
          </Dropdown>

          <Divider type="vertical" />
          <button
            type="button"
            className="ant-btn toolbar_btn"
            onClick={this.handleScreenfull}
          >
            <i className="iconfont icon-quanping"></i>
            <span>全屏</span>
          </button>
        </Card>
        {this.state.locationshow && (
          <SetLocation onClose={this.onLocClose}></SetLocation>
        )}
        {/* <Modal
          title="地图导出"
          style={{ top: 80, height: 'calc(100vh - 20px)' }}
          visible={this.state.showMapExport}
          footer={null}
          width="90%"
          zIndex={2001}
          onCancel={this.hideMapExport}
        >
          <MapExport></MapExport>
        </Modal> */}
        {/* <MapExport onClose={this.hideMapExport} visible={this.state.showMapExport}></MapExport> */}

        <Modal
          title="分屏对比"
          style={{ top: 80, height: "calc(100vh - 20px)" }}
          visible={this.state.showLayerCompare}
          footer={null}
          
          width="90%"
          zIndex={2001}
          onCancel={this.hideLayerCompare}
        >
          <LayerCompare
            sourcedata={sourcedata}
            map3d={this.props.map3d}
          ></LayerCompare>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      map: state.map || (state.mapConfig && state.mapConfig.map),
      draw: state.draw,
      map3d: state.map3d,
      thematics: state.thematics,
    };
  },
  {
    changeZoomLevel,
    changeDrawingStatus,
    showSpatialQuery,
    selectAreaLocation,
    updateLayer,
  }
)(ToolBar);
