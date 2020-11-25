/*
 * @Author: 史涛
 * @Date: 2020-02-14 16:57:11
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-11-25 10:00:14
 */
import ReactMapboxGl, {
  Layer,
  GeoJSONLayer,
  Feature,
  Popup,
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl,
  MapContext,
} from "@shitao1988/swsk-react-mapbox-gl";

import {
  addTripLayer,
  addlinagc3,
  addlinagc2,
  addlinagc,
  addludeng,
  addTree,
  addFire,
  addWall,
  addLine,
  addRoads,
  addCircle,
  addCone,
} from "./layers";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import DrawControl from "@shitao1988/swsk-react-mapbox-gl-draw";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import moment, { Moment } from "moment";
import {
  Menu,
  Table,
  Tabs,
  Icon,
  Dropdown,
  Row,
  Col,
  Statistic,
  Modal,
  Timeline,
  Carousel,
} from "antd";
import { MarkerPin, SmallPin } from "./markerpin";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import pointOnFeature from "@turf/point-on-feature";
import turfarea from "@turf/area";
import turflength from "@turf/length";
import turfbuffer from "@turf/buffer";
import { setSelectFaRenItem } from "../../actions/query";
import wkt from "terraformer-wkt-parser";
import { routes } from "./route";
import Building from "./ThreeBuilding";
import {
  changeMap3DView,
  zoomToPoint3D,
  loadStyle,
  updateLayer,
  updateBounds,
} from "../MapBoxGL/actions";
import {
  geojsonToArcGIS,
  arcgisToGeoJSON,
} from "@esri/arcgis-to-geojson-utils";

import {
  endDrawing,
  drawEnable,
  changeDrawingStatus,
} from "../../actions/draw";
import "./style.less";

import { DashboardOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const Map = ReactMapboxGl({
  isIntScrollZoom: true,
  preserveDrawingBuffer: true, //允许保存图片
  //crs: "EPSG:4490",
  maxZoom: 19.5,
  minZoom: 10,
  accessToken:
    "pk.eyJ1Ijoic2hpdGFvMTk4OCIsImEiOiJjaWc3eDJ2eHowMjA5dGpsdzZlcG5uNWQ5In0.nQQjb4DrqnZtY68rOQIjJA",
});

const modes = MapboxDraw.modes;
modes.draw_rectangle = DrawRectangle;

class MapBoxMap extends PureComponent {
  constructor(props) {
    super(props);
    this.DrawControl = React.createRef();
  }

  state = {
    menushow: false,
    buildingInfo: null,
    buildinglngLat: null,
    imagevisible: false,
    images: [],
    menupoint: { x: 0, y: 0 },
  };

  componentDidMount() {
    const ele = document.getElementById("loading");
    ele.style.display = "none";
    const { latitude, longitude, zoom, maxZoom, minZoom, bearing, pitch } = this
      .props.map3d.zoom
      ? this.props.map3d
      : this.props.mapConfig.map3d.viewport;
    this.props.changeMap3DView(
      latitude,
      longitude,
      zoom,
      maxZoom || 19,
      minZoom || 10,
      bearing,
      pitch,
      0
    );
  }

  /**
   *右键菜单点击
   *
   * @param {*} e
   */
  handleMenuClick = (e) => {
    const { menulnglat } = this.state;
    switch (e.key) {
      case "3":
        break;
      case "4":
        break;
      case "5":
        this.props.zoomToPoint3D(
          { x: menulnglat.lng, y: menulnglat.lat },
          this.props.map3d.zoom
        );
        break;
      case "6":
        this.props.changeDrawingStatus("clean", "", "measure", [], {});
        this.props.setSelectFaRenItem(null);
        break;
      default:
        break;
    }

    this.setState({
      menushow: false,
    });
  };

  /**
   *显示右键菜单
   *
   * @param {*} map
   * @param {*} evt
   */
  _showContextMenu = (map, evt) => {
    if (this.state.rotateend) return;
    evt.preventDefault();
    this.setState({
      menulnglat: evt.lngLat,
      menupoint: evt.point,
      menushow: true,
    });
  };

  /**
   *隐藏右键菜单
   *
   * @param {*} map
   * @param {*} evt
   */
  _hideContextMenu = (map, evt) => {
    this.setState({
      menulnglat: evt.lngLat,
      menupoint: evt.point,
      menushow: false,
    });
  };

  onMouseUp = (map, evt) => {
    this.setState({
      rotateend: false,
    });
  };

  /**
   *地图点击
   *
   * @param {*} map
   * @param {*} event
   */
  onMapClick = (map, evt) => {
    this.setState({
      selectedobj: null,
    });
  };

  objSelected = (e) => {
    this.setState({ selectedobj: e.detail });
  };

  addThreeModels = (map) => {
    map.addLayer(
      {
        id: "custom_layer",
        type: "custom",
        onAdd: (map, mbxContext) => {
          window.tb = new Threebox(map, mbxContext, {
            defaultLights: true,
            enableSelectingObjects: true,
            enableSelectingFeatures: true,
            enableTooltips: false,
          }); //初始化
          map.doorobjs=[]

          
          
           
          


 

          
          var lineMaterial = new THREE.LineBasicMaterial({
            // 线的颜色
            color: "#57d8ff",
            transparent: true,
            linewidth: 5,
            opacity: 1,
            //depthTest: true,
          });
          lineMaterial.polygonOffset = true;
          lineMaterial.depthTest = true;
          lineMaterial.polygonOffsetFactor = 1;
          lineMaterial.polygonOffsetUnits = 1.0;
          // var options = {
          //   type: "mtl",
          //   obj: "models/building.obj",
          //   scale: 1,
          //   anchor: "center",
          //   units: "meters",
          //   rotation: { x: 90, y: 180, z: 0 },
          // };

          // let lineS;
          // tb.loadObj(options, function (model) {
          //   let mesh = model.children[0].children[0];
          //   let edges = new THREE.EdgesGeometry(mesh.geometry, 1);
          //   edges.scale(0.035, 0.035, 0.035);
          //   // edges.rotation.x = Math.PI / 2;
          //   //  lineS.rotation.z = Math.PI / 2;
          //   lineS = new THREE.LineSegments(edges, lineMaterial);
          //   // lineS.rotation.y = Math.PI;
          //   lineS.rotation.x = Math.PI / 2;
          //   lineS.rotation.y = Math.PI * 1.15;

          //   let obj = tb
          //     .Object3D({ obj: lineS, adjustment: { x: -0.2, y: 0, z: -0.3 } })
          //     .setCoords([120.56642, 32.38535]);
          //   obj.hoverable = false;
          //   tb.add(obj);
          // });
          const basematerial = new THREE.MeshPhongMaterial({
            color: 0x63a3,
            map: new THREE.TextureLoader().load("images/building2.png"),
            specular: 0x20202,
            //wireframe:true,
            shininess: 20,
          });

          const overmaterial = new THREE.MeshLambertMaterial({
            color: 0x660000,
            side: THREE.DoubleSide,
          });

          function getFloorOption(floor) {
            return {
              type: "dae",
              obj: "models/" + floor + ".DAE",
              material: basematerial,
              scale: 1.15,
              units: "meters",
              anchor: "center",
              rotation: { x: 90, y: 207.1, z: 0 },
            };
          }
          let floorselected = false;
          function onFloorSelect(e) {
            lineS.material.opacity = 0;
            floorselected = e.detail.selected;
            if (floorselected) {
              // floors.forEach((fl, index) => {
              //   var c = tb.utils.projectToWorld([120.56656, 32.38536, index * 10-3]);
              //   new TWEEN.Tween(fl.position)
              // .to(
              //   {
              //     z: c.z,
              //   },
              //   500
              // )
              // .onComplete(function () {
              // })
              // .start();
              // });
            } else {
              // floors.forEach((fl, index) => {
              //   var c = tb.utils.projectToWorld([120.56656, 32.38536, index * 5-3]);
              //   new TWEEN.Tween(fl.position)
              // .to(
              //   {
              //     z: c.z,
              //   },
              //   500
              // )
              // .onComplete(function () {
              // })
              // .start();
              // });
            }
          }

          function onFloorOver(obj) {
            if (!floorselected) {
              lineS.material.opacity = 0.1;
            }
            obj.detail.children[0].children[0].children.forEach(
              (e) => (e.material = overmaterial)
            );
          }

          function onFloorOut(obj) {
            if (!floorselected) {
              lineS.material.opacity = 1;
            }
            obj.detail.children[0].children[0].children.forEach(
              (e) => (e.material = basematerial)
            );
          }

          var floors = [];
          // ["floor1","floor2", "floor3", "floor4", "floor5"].forEach(
          //   (fl, index) => {
          //     tb.loadObj(getFloorOption(fl), function (model) {
          //       let floor = model.setCoords([120.56656, 32.38536, index * 5-3]);
          //       floor.addEventListener(
          //         "SelectedChange",
          //         onFloorSelect,
          //         false
          //       );
          //       floor.addEventListener(
          //         "ObjectMouseOver",
          //         onFloorOver,
          //         false
          //       );

          //       floor.addEventListener(
          //         "ObjectMouseOut",
          //         onFloorOut,
          //         false
          //       );

          //       floors.push(floor);
          //       floor.hoverable=true;
          //       floor.selectable=true
          //       tb.add(floor);
          //     });
          //   }
          // );

          const el = document.getElementById("app");
          let resolution = new THREE.Vector2(el.offsetWidth, el.offsetHeight);
          addTree();
          addludeng();
          var points = [
            [120.56556344032288, 32.387096457015545],
            [120.5657511949539, 32.38677029821425],
            [120.56590139865875, 32.386480378291076],
          ];
          addlinagc(points, this.objSelected);
          points = [
            [120.5671191215515, 32.387363725155375],
            [120.56676506996156, 32.38722329623135],
            [120.56643784046172, 32.387096457015566],
            [120.56605696678162, 32.386965087640014],
          ];
          addlinagc2(points, this.objSelected);

          points = [
            [120.56687504053114, 32.3869741476031],
            [120.56631714105605, 32.38677935819685],
            [120.56647807359694, 32.3864713182785],
            [120.56701987981796, 32.386670638345606],
          ];
          addlinagc3(points, this.objSelected);

          var roads = [
            [
              [120.5615186691284, 32.38396618993527],
              [120.56115388870238, 32.385198377476435],
              [120.56441545486449, 32.386629868367656],
              [120.56355714797974, 32.38797073799289],
              [120.56312799453734, 32.389655856727444],
              [120.56392192840576, 32.389764572985584],
            ],
            [
              [120.55293560028075, 32.38845996925133],
              [120.55224895477294, 32.39039874854987],
              [120.56177616119385, 32.39313471207973],
              [120.56229114532472, 32.39291728754617],
              [120.56313872337343, 32.38959243884977],
              [120.56387901306152, 32.38973739393332],
            ],
          ];

          var roadmeshs = addRoads(resolution, roads);

          //var linemeshs = addLine(resolution);

          //var fire = addFire([120.56687504053114, 32.3869741476031]);
          var circlemesh = addCircle([120.55259227752686, 32.388151935064236]);
          //var wallmesh = addWall();
          var conepoints = [
            [120.56514501571654, 32.3897192745606],
            [120.56062817573546, 32.3841564552852],
            [120.55259227752686, 32.388151935064236],
            [120.54374098777771, 32.3888042415114],
            [120.55318236351012, 32.36818183094668],
          ];
          var conemeshs = conepoints.map((point) => {
            return addCone(point);
          });

          var _quat = new THREE.Quaternion();
          var _quat2 = new THREE.Quaternion();
          var _x = new THREE.Vector3(1, 0, 0);
          var _y = new THREE.Vector3(0, 1, 0);
          var _z = new THREE.Vector3(0, 0, 1);
          function random(min, max, precision) {
            var p = Math.pow(10, precision);
            return Math.round((min + Math.random() * (max - min)) * p) / p;
          }

          function animate(e) {
            //火焰动画
            // fire.mesh.material.uniforms.uTime.value = e * 0.001;
            // var life = fire.geometry.attributes.life;
            // var orientation = fire.geometry.attributes.orientation;
            // var scale = fire.geometry.attributes.scale;
            // var randoms = fire.geometry.attributes.random;
            // for (let i = 0; i < 12; i++) {
            //   var value = life.array[i];
            //   value += 0.04;
            //   if (value > 1) {
            //     value -= 1;
            //     _quat.setFromAxisAngle(_y, random(0, 3.14, 3));
            //     _quat2.setFromAxisAngle(_x, random(-1, 1, 2) * 0.1);
            //     _quat.multiply(_quat2);
            //     _quat2.setFromAxisAngle(_z, random(-1, 1, 2) * 0.3);
            //     _quat.multiply(_quat2);
            //     orientation.setXYZW(i, _quat.x, _quat.y, _quat.z, _quat.w);
            //     scale.setXY(i, random(0.8, 1.2, 3), random(0.8, 1.2, 3));
            //     randoms.setX(i, random(0, 1, 3));
            //   }
            //   life.setX(i, value);
            // }
            // life.needsUpdate = true;
            // orientation.needsUpdate = true;
            // scale.needsUpdate = true;
            // randoms.needsUpdate = true;

            //wallmesh.material.uniforms.time.value += 0.008;

            conemeshs.forEach((conemesh) => {
              conemesh.material.uniforms.time.value += 0.05;
              conemesh.rotation.y += 0.02;
            });

            circlemesh.rotation.z += 0.02;
            // linemeshs.forEach((linemesh) => {
            //   linemesh.material.uniforms.dashOffset.value -= 0.01;
            // });

            roadmeshs.forEach((linemesh) => {
              linemesh.material.uniforms.dashOffset.value -= 0.01;
            });

            requestAnimationFrame(animate);
            map.triggerRepaint();
          }
          animate();
        },

        render: function (gl, matrix) {
          window.tb.update();
        },
      },
      "兴趣点-level-towm"
    ); //添加到建筑物图层之后
  };

  
  PrefixZero=(num, n)=>{
    return (Array(n).join(0) + num).slice(-n);
  }

  onDoorOver=()=>{
    this.setState({roomover:true})
  }

  onDoorOut=()=>{
    this.setState({roomover:false})
  }

  onSelectedFeatureChange = (e) => {
    let feature = e.detail;
    if (feature &&feature.sourceLayer=='floorbuilding'&& feature.state && feature.state.select) {
      this._map.doorobjs.map(obj => {
        tb.remove(obj);
      });
      this._map.doorobjs=[];
      var coords=[[ 120.56790500879288,32.38476688724421,(feature.properties.height-1)*6+3],[120.56777156889439,32.38471592369487,(feature.properties.height-1)*6+3]]

      var textureDoor = new THREE.TextureLoader().load("models/door.png");
          var doorMaterial = new THREE.SpriteMaterial({
            map: textureDoor,
            transparent:true,
          });

          var doorsprite = new THREE.Sprite(doorMaterial);
           doorsprite.scale.set(0.1, 0.1, 0.1);
           coords.forEach((point,index) => {
            var doorobj= tb
            .Object3D({ obj: doorsprite.clone(), adjustment: { x: 0, y: -1, z: 1 } })
            .setCoords(point);
            doorobj.coordinates=point;
            doorobj.hoverable = true;
            doorobj.selectable=true;
            doorobj.highlightable=true;

            doorobj.addEventListener(
                  "ObjectMouseOver",
                  this.onDoorOver,
                  false
                );
                doorobj.addEventListener(
                  "ObjectMouseOut",
                  this.onDoorOut,
                  false
                );
            tb.add(doorobj)
            doorobj.addLabel(`<div class="blue_popup"><div class="roominfo mapboxgl-popup-content">
              <div class="roomtitle">${this.PrefixZero(feature.properties.height-1,2)}${this.PrefixZero(index+1,2)}<div>
              <div class="roomcontain">
             <p> 居  室: 4室2厅2卫1厨 </p>
             <p>建筑面积: 约168.00㎡ </p>
             <p>朝  向: 朝南 </p>
             <p>层  高: 3.00m</p>
             <p>户型描述:客厅：朝南客厅连接阳台，采光通风较好。卫生间：双卫生间，方便使用。卧室：主卧拥有独立卫生间，私密性较高。</p>
              </div>
              </div></div>`);
              this._map.doorobjs.push(doorobj);
           
           });
      
      this.setState({
        fheight: feature.properties.height,
        fbheight: feature.properties.baseheight,
      });
      this.props.updateLayer("楼栋2", {
        filter: ["all", ["<", "height", feature.properties.height]],
      });
      this.props.updateLayer("楼栋1", {
        filter: ["all", ["<", "height", feature.properties.height]],
      });
      this.props.updateLayer("楼栋", {layout:{visibility: 'none'}});
    }
  };

  onStyleLoad = (map) => {
    console.log("b");
    this._map = map;

    map.on("SelectedFeatureChange", this.onSelectedFeatureChange);

    // const outletlayers = ["楼栋"];

    // outletlayers.forEach((outlet) => {
    //   map.on("click", outlet, (e) => {
    //     // let coordinates = e.features[0].geometry.coordinates.slice();
    //     let description = e.features[0].properties;

    //     description.coordinates = [e.lngLat.lng, e.lngLat.lat];

    //     // for (var key in description){
    //     //   description[key.toLowerCase()] = description[key];
    //     //   delete(description[key]);
    //     // }

    //     switch (outlet) {
    //       case "outlet_南京长江入河排污口":
    //       case "outlet_hedao":
    //         this.setState({ selectoutlet: description });
    //         break;
    //       // case "outlet_江北入河排污口":
    //       //   this.props.setSelectedFeature(description);
    //       //   break;

    //       default:
    //         break;
    //     }
    //   });

    //   // Change the cursor to a pointer when the mouse is over the places layer.
    //   map.on("mouseenter", outlet, function() {
    //     map.getCanvas().style.cursor = "pointer";
    //   });

    //   // Change it back to a pointer when it leaves.
    //   map.on("mouseleave", outlet, function() {
    //     map.getCanvas().style.cursor = "";
    //   });
    // });

    map.jumpTo({
      pitch: 60,
      bearing: 30,
    });
    this.addThreeModels(map);
    let tripLayer = addTripLayer(map, routes);

    function animate() {
      //车辆轨迹动画
      var loopLength = 300; // unit corresponds to the timestamp in source data
      var animationSpeed = 30; // unit time per second
      var timestamp = Date.now() / 1000;
      var loopTime = loopLength / animationSpeed;
      let curtime = ((timestamp % loopTime) / loopTime) * loopLength;
      if (tripLayer.setProps) {
        try {
          tripLayer.setProps({ currentTime: curtime });
        } catch (error) {}
      }

      requestAnimationFrame(animate);
      map.triggerRepaint();
    }
    animate();

    let bounds = this._map.getBounds();
    this.props.updateBounds(bounds);
    let size = 100;
    let pulsingDot = {
      width: size,
      height: size,
      color: "#CC00FF",
      rangecolor: "255, 100, 100",
      data: new Uint8Array(size * size * 4),

      onAdd: function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      render: function () {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = "rgba(" + this.rangecolor + "," + (1 - t) + ")";
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // keep the map repainting
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
      },
    };

    map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
    map.addImage(
      "pulsing-dot-blue",
      { ...pulsingDot, color: "#03A9F4", rangecolor: "3,169,244" },
      { pixelRatio: 1 }
    );
  };

  /**
   *监听mapview
   *
   * @param {*} map
   */
  mapviewchange = (map, evt) => {
    if (evt.type === "rotateend") {
      this.setState({
        rotateend: true,
      });
    }

    this.props.changeMap3DView(
      map.getCenter().lat,
      map.getCenter().lng,
      map.getZoom(),
      map.getMaxZoom || 19,
      map.getMinZoom || 10,
      map.getBearing(),
      map.getPitch(),
      0
    );
  };

  renderObjPopup() {
    const obj = this.state.selectedobj;
    if (obj) {
      return (
        <Popup
          className="custom_popup blue_popup"
          coordinates={obj.coordinates}
          offset={{
            bottom: [0, -38],
          }}
        >
          <div class="title">
            <b>{obj.attributes.name}</b>
          </div>
          <div class="content">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="存储量"
                  value={128}
                  prefix={<DashboardOutlined />}
                  suffix="吨"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="温度"
                  value={20}
                  prefix={<i className="iconfont icon-wendu" />}
                  suffix="℃"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="湿度"
                  value={40}
                  prefix={<i className="iconfont icon-shidu" />}
                  suffix="%"
                />
              </Col>
            </Row>
          </div>
        </Popup>
      );
    }
    return null;
  }

  renderEmergencyPopup() {
    return (
      <Popup
        className="custom_popup blue_popup"
        coordinates={[120.56514501571654, 32.3897192745606]}
        offset={{
          bottom: [0, -38],
        }}
      >
        <div class="title">
          <b>新冠疫情</b>
        </div>
        <div class="content"></div>
      </Popup>
    );
  }

  _renderXiaoFangPopup() {
    const datas = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "市公安消防大队",
          },
          geometry: {
            type: "Point",
            coordinates: [120.54374098777771, 32.3888042415114],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "消防大队",
          },
          geometry: {
            type: "Point",
            coordinates: [120.55345058441162, 32.36803684127861],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "高新区专职消防队",
          },
          geometry: {
            type: "Point",
            coordinates: [120.59675216674805, 32.37503232765891],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "经济开发区消防站",
          },
          geometry: {
            type: "Point",
            coordinates: [120.54162740707397, 32.418442973316466],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "市人民医院",
          },
          geometry: {
            type: "Point",
            coordinates: [120.56062817573546, 32.3841564552852],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "市第四人民医院",
          },
          geometry: {
            type: "Point",
            coordinates: [120.55259227752686, 32.388151935064236],
          },
        },
      ],
    };

    return datas.features.map((e) => {
      return (
        <Popup
          className="custom_popup red_popup_small"
          coordinates={e.geometry.coordinates}
          anchor="bottom-left"
          offset={{
            bottom: [0, -38],
          }}
        >
          <div class="title">
            <b>{e.properties.name}</b>
          </div>
        </Popup>
      );
    });
  }

  /**
   *渲染查询结果
   *
   * @returns
   */
  renderQueryContent = () => {
    if (this.props.query.result) {
      return this.props.query.result.docs.map((item, index) => {
        return (
          <Marker
            key={`mainmarker-${index}`}
            coordinates={[Number(item.x), Number(item.y)]}
            anchor="bottom"
            title={item.name}
          >
            <MarkerPin
              size={30}
              text={index + 1}
              color={
                this.props.query.hoverid == item.id ? "#3FB1CE" : "#ff4d4f"
              }
              title={item.name}
              hover={this.state.hover}
              onClick={() =>
                this.setState({ popupInfo: item, smallinfo: false })
              }
            />
          </Marker>
        );
      });
    }
    return null;
  };

  /**
   *空间查询结果点击
   *
   * @param {*} e
   */
  onGeojsonLayerClick = (e) => {
    if (e.features) {
      this.props.setSelectedFeature(e.features[0]);
    }
  };

  /**
   *渲染专题空间查询结果
   *
   * @returns
   */
  renderThematicBufferContent = () => {
    const { querygeometry, bufferdistance } = this.props.thematics;
    if (querygeometry && bufferdistance) {
      const geojsongeom = arcgisToGeoJSON(JSON.parse(querygeometry));
      let layeroptions = {
        fillPaint: { "fill-color": "#6157cc", "fill-opacity": 0.3 },
        linePaint: { "line-color": "#1890ff", "line-opacity": 0 },
        circlePaint: {
          "circle-radius": 10,
          "circle-color": "#E54E52",
          "circle-opacity": 0,
        },
      };
      return <GeoJSONLayer {...layeroptions} data={geojsongeom}></GeoJSONLayer>;
    }
    return null;
  };

  _renderXZQContent = () => {
    const { curarea } = this.props.map;
    let filter = ["all"];
    if (curarea) {
      filter.push(["==", "NAME", curarea]);
    }
    return [
      <GeoJSONLayer
        id="xzq_polygon"
        fillPaint={{ "fill-color": "#DCEAF0", "fill-opacity": 0 }}
        linePaint={{
          "line-color": "rgba(3, 172, 208, 1)",
          "line-width": 3,
          "line-dasharray": [1, 2, 4, 2],
        }}
        data={mapConfigJson.dataurl + "/xzq_s.json"}
        layerOptions={{
          filter,
        }}
      ></GeoJSONLayer>,
      // <GeoJSONLayer
      //   id="xzq_point"
      //   symbolLayout={{
      //     "text-padding": 2,
      //     "text-font": ["Microsoft YaHei Regular"],
      //     "text-anchor": "right",
      //     "text-field": "{NAME}",
      //     "text-offset": [0.6, 0],
      //     "text-size": 16,
      //     "text-max-width": 6,
      //     visibility: "visible",
      //     "icon-offset": [6, 0],
      //     "icon-anchor": "right",
      //   }}
      //   symbolPaint={{
      //     "icon-opacity": 1,
      //     "text-halo-blur": 0.5,
      //     "text-color": "rgba(3, 172, 208, 1)",
      //     "text-halo-width": 1,
      //     "text-halo-color": "#0A141C",
      //   }}
      //   data={mapConfigJson.dataurl+"/zxqpoint.json"}
      //   layerOptions={{
      //     filter
      //   }}
      // ></GeoJSONLayer>
    ];
  };
  /**
   *渲染专题空间查询结果
   *
   * @returns
   */
  renderGeoJsonContent = () => {
    const { geojsonlist } = this.props;
    if (geojsonlist) {
      return geojsonlist.map((geojson) => {
        return [
          <GeoJSONLayer
            circlePaint={{
              "circle-radius": 6,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            }}
            data={geojson}
            layerOptions={{
              filter: ["all", ["==", "$type", "Point"]],
            }}
          ></GeoJSONLayer>,
          <GeoJSONLayer
            fillPaint={{ "fill-color": "#DCEAF0", "fill-opacity": 0.6 }}
            linePaint={{ "line-color": "#1890ff", "line-width": 4 }}
            data={geojson}
            layerOptions={{
              filter: ["all", ["==", "$type", "Polygon"]],
            }}
          ></GeoJSONLayer>,
          <GeoJSONLayer
            fillPaint={{ "fill-color": "#DCEAF0", "fill-opacity": 0 }}
            linePaint={{ "line-color": "#1890ff", "line-width": 4 }}
            data={geojson}
            layerOptions={{
              filter: ["all", ["==", "$type", "LineString"]],
            }}
          ></GeoJSONLayer>,
        ];
      });
    }
    return null;
  };

  /**
   *渲染专题空间查询结果
   *
   * @returns
   */
  renderThematicQueryContent = () => {
    const { themresult, querygeometry } = this.props.thematics;
    if (themresult) {
      let jsonfeas = [];
      themresult.features.forEach((fea) => {
        jsonfeas.push(arcgisToGeoJSON(fea));
      });
      let layeroptions;
      switch (themresult.geometryType) {
        case "esriGeometryPolygon":
          layeroptions = {
            fillOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0.6 },
            linePaint: { "line-color": "#1890ff", "line-width": 4 },
            circlePaint: {
              "circle-radius": 10,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            },
          };
          break;
        case "esriGeometryPoint":
          layeroptions = {
            circleOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0 },
            linePaint: { "line-color": "#1890ff", "line-opacity": 0 },
            circlePaint: {
              "circle-radius": 10,
              "circle-color": "#E54E52",
              "circle-opacity": 0.8,
            },
          };
          break;
        case "esriGeometryPolyline":
          layeroptions = {
            lineOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0 },
            linePaint: { "line-color": "#1890ff", "line-width": 4 },
            circlePaint: {
              "circle-radius": 5,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            },
          };
          break;
        default:
          break;
      }
      let data = {
        type: "FeatureCollection",
        features: jsonfeas,
      };
      return <GeoJSONLayer {...layeroptions} data={data}></GeoJSONLayer>;
    }
    return null;
  };

  /**
   *渲染专题查询结果
   *
   * @returns
   */
  renderThematicPOIPolygon = () => {
    const { thematicresult } = this.props.query;
    if (thematicresult && thematicresult.length > 0) {
      let data = {
        type: "FeatureCollection",
        features: thematicresult,
      };
      return [
        <GeoJSONLayer
          fillPaint={{ "fill-color": "#DCEAF0", "fill-opacity": 0.6 }}
          linePaint={{ "line-color": "#1890ff", "line-width": 4 }}
          data={data}
          layerOptions={{
            filter: [
              "all",
              ["==", "highlight", false],
              ["==", "$type", "Polygon"],
            ],
          }}
        ></GeoJSONLayer>,
        <GeoJSONLayer
          fillPaint={{ "fill-color": "#DCEAF0", "fill-opacity": 0.6 }}
          linePaint={{ "line-color": "#F44336", "line-width": 4 }}
          data={data}
          layerOptions={{
            filter: [
              "all",
              ["==", "highlight", true],
              ["==", "$type", "Polygon"],
            ],
          }}
        ></GeoJSONLayer>,
        <GeoJSONLayer
          fillPaint={{ "fill-color": "#DCEAF0", "fill-opacity": 0 }}
          linePaint={{ "line-color": "#1890ff", "line-width": 4 }}
          data={data}
          layerOptions={{
            filter: [
              "all",
              ["==", "highlight", false],
              ["==", "$type", "LineString"],
            ],
          }}
        ></GeoJSONLayer>,
        <GeoJSONLayer
          fillPaint={{ "fill-color": "#DCEAF0", "fill-opacity": 0 }}
          linePaint={{ "line-color": "#F44336", "line-width": 4 }}
          data={data}
          layerOptions={{
            filter: [
              "all",
              ["==", "highlight", true],
              ["==", "$type", "LineString"],
            ],
          }}
        ></GeoJSONLayer>,
      ];
    }
    return null;
  };

  renderThematicPOIPoint = () => {
    const { thematicresult } = this.props.query;
    if (thematicresult && thematicresult.length > 0) {
      let data = {
        type: "FeatureCollection",
        features: thematicresult,
      };
      return (
        <GeoJSONLayer
          circlePaint={{
            "circle-radius": 4,
            "circle-color": "#E54E52",
            "circle-opacity": 0.8,
          }}
          data={data}
          layerOptions={{ filter: ["==", "$type", "Point"] }}
        ></GeoJSONLayer>
      );
    }
    return null;
  };

  renderThematicHighLightPoint = () => {
    const { selectedfeature } = this.props.thematics;
    const point = selectedfeature && pointOnFeature(selectedfeature);
    return (
      selectedfeature && (
        <GeoJSONLayer
          symbolLayout={{
            "icon-image": "pulsing-dot",
          }}
          data={point}
          layerOptions={{ filter: ["==", "$type", "Point"] }}
        ></GeoJSONLayer>
      )
    );

    return null;
  };

  renderHighLight = () => {
    const { intelldatas } = this.props.intellisense;
    return intelldatas ? (
      <GeoJSONLayer
        symbolLayout={{
          "icon-image": "pulsing-dot-blue",
        }}
        data={{
          type: "FeatureCollection",
          features: intelldatas,
        }}
        layerOptions={{ filter: ["==", "$type", "Point"] }}
      ></GeoJSONLayer>
    ) : null;
  };

  /**
   *渲染专题数据气泡框
   *
   * @returns
   * @memberof MapBoxMap
   */
  _renderThematicPopup() {
    const { selectedfeature } = this.props.thematics;
    const point =
      selectedfeature && pointOnFeature(selectedfeature).geometry.coordinates;
    return (
      selectedfeature && (
        <Popup
          coordinates={[Number(point[0]), Number(point[1])]}
          offset={{
            bottom: [0, -38],
          }}
        >
          <div className="title">
            <Icon
              style={{ float: "right", marginTop: 8 }}
              onClick={() => this.props.setSelectedFeature(null)}
              type="close"
            />
          </div>
          <div className="content">
            {this.renderThematicContent(
              selectedfeature.attributes || selectedfeature.properties,
              selectedfeature.attributes ? themresult.fieldAliases : null
            )}
          </div>
        </Popup>
      )
    );
  }

  renderErrorResult = () => {
    if (
      this.props.toolbar.errorlist &&
      this.props.toolbar.errorlist.list.length > 0
    ) {
      return this.props.toolbar.errorlist.list.map((item, index) => {
        return (
          <Marker
            key={`errormarker-${index}`}
            coordinates={[Number(item.x), Number(item.y)]}
          >
            <MarkerPin
              size={30}
              text={index + 1}
              color={
                this.props.toolbar.errorhoverid == item.id
                  ? "#3FB1CE"
                  : "#ff4d4f"
              }
              title={item.name}
              hover={this.state.hover}
              onClick={() => this.setState({ errorpopupInfo: item })}
            />
          </Marker>
        );
      });
    }
  };

  _renderErrorPopup() {
    const { errorpopupInfo } = this.state;
    return (
      errorpopupInfo && (
        <Popup
          coordinates={[Number(errorpopupInfo.x), Number(errorpopupInfo.y)]}
          offset={{
            bottom: [0, -38],
          }}
        >
          <div className="title">
            <b>{errorpopupInfo.name}</b>
            <Icon
              style={{ float: "right", marginTop: 8 }}
              onClick={() => this.setState({ errorpopupInfo: null })}
              type="close"
            />
          </div>
          <div className="content">
            <div>
              <span>纠错类型:</span>
              <span>{errorpopupInfo.typename}</span>
            </div>
            <div>
              <span>处理状态:</span>
              <span>{errorpopupInfo.state ? "已处理" : "未处理"}</span>
            </div>
            <div>
              <span>描述:</span>
              <span>{errorpopupInfo.describes}</span>
            </div>
            <div>
              <span>回复:</span>
              <span>{errorpopupInfo.message}</span>
            </div>
          </div>
        </Popup>
      )
    );
  }

  renderMeasureContent = () => {
    const { drawStatus, drawOwner, geometry } = this.props.draw;
    let contents = [];
    if (geometry && drawStatus !== "clean" && drawOwner == "measure") {
      contents.push(this.renderMeasureTitle(geometry));
      contents.push(this.renderMeasureFeature(geometry));
      return contents;
    }
    return null;
  };

  renderMeasureFeature(geometry) {
    return (
      <GeoJSONLayer
        data={geometry}
        lineLayout={{ "line-join": "round", "line-cap": "round" }}
        linePaint={{ "line-color": "#FF0000", "line-width": 2 }}
      ></GeoJSONLayer>
    );
  }

  renderMeasureTitle(geometry) {
    if (geometry.type == "Polygon") {
      const polygonArea = turfarea(geometry);
      const point = pointOnFeature(geometry).geometry.coordinates;
      return (
        <Marker
          key={`measurePolygonMarker`}
          title={polygonArea}
          coordinates={[point[0], point[1]]}
        >
          <div className="measureresultlabel">
            {polygonArea.toFixed(2)}平方米
          </div>
        </Marker>
      );
    } else {
      const polylinelength = turflength(geometry) * 1000;
      const point = geometry.coordinates[geometry.coordinates.length - 1];
      return (
        <Marker
          key={`measureLengthMarker`}
          title={polylinelength}
          coordinates={[point[0], point[1]]}
        >
          <div className="measureresultlabel">
            {polylinelength.toFixed(2)}米
          </div>
        </Marker>
      );
    }
  }

  /**
   *绘制要素
   *
   * @param {*} e
   */
  onDrawCreate = (e) => {
    const { drawOwner, drawMethod } = this.props.draw;
    const { querylayerid, bufferdistance } = this.props.thematics;
    let geometry = e.features[0].geometry;

    if (drawOwner === "spatial") {
      this.props.endDrawing(geometry, drawOwner);
      geometry = bufferdistance
        ? turfbuffer(geometry, bufferdistance / 1000).geometry
        : geometry;
      const arcgisgeo = geojsonToArcGIS(geometry);
      const selectedThematic = this.props.thematics.themlist.filter(
        (e) => e.id === querylayerid
      );

      if (selectedThematic.length > 0) {
        switch (drawMethod) {
          case "point":
            this.props.queryThematic(
              selectedThematic[0].url,
              selectedThematic[0].layers,
              JSON.stringify(arcgisgeo),
              bufferdistance ? "esriGeometryPolygon" : "esriGeometryPoint"
            );
            break;
          case "polygon":
          case "rectangle":
            this.props.queryThematic(
              selectedThematic[0].url,
              selectedThematic[0].layers,
              JSON.stringify(arcgisgeo),
              "esriGeometryPolygon"
            );
            break;
          case "polyline":
            this.props.queryThematic(
              selectedThematic[0].url,
              selectedThematic[0].layers,
              JSON.stringify(arcgisgeo),
              bufferdistance ? "esriGeometryPolygon" : "esriGeometryPolyline"
            );
            break;
          default:
            break;
        }
      }
    } else if (drawOwner === "measure") {
      this.props.endDrawing(geometry, drawOwner);
      this.drawControl.draw.deleteAll();
    }
  };

  printMap() {
    var url = this._map.getCanvas().toDataURL("image/png");
    var a = document.createElement("a");
    var event = new MouseEvent("click");
    a.download = "map";
    a.href = url;
    a.dispatchEvent(event);
    // this._map.getCanvas().toBlob(function(blob) {
    //   saveAs(blob, 'map.png');
    // });
  }

  /**
   *渲染专题要素信息
   *
   * @param {*} feas
   * @returns
   * @memberof MapBoxMap
   */
  renderThematicContent(feas, fields) {
    let list = [];
    let imgs = [];
    for (const key in feas) {
      if (
        key.indexOf("OBJECTID") == -1 &&
        key.toUpperCase().indexOf("SHAPE") == -1 &&
        key.toUpperCase().indexOf("IMAGES") == -1
      ) {
        list.push(
          <p>
            {fields ? fields[key] : key}: {feas[key] ? feas[key] : "空"}
          </p>
        );
      }

      if (key.toUpperCase() === "IMAGES") {
        const images = feas[key].split(",");
        list.push(
          images.length > 0 ? (
            <a onClick={() => this.showImages(images)}>查看图片</a>
          ) : (
            <a>暂无图片</a>
          )
        );
      }
    }
    return list;
  }

  showImages = (images) => {
    this.setState({ imagevisible: true, images: images });
  };

  hideImages = (e) => {
    console.log(e);
    this.setState({
      imagevisible: false,
    });
  };

  _updateMapPositionFromNewProps = (newProps) => {
    // current implementation will update the map only if the movement
    // between 12 decimals in the reference system to avoid rounded value
    // changes due to float mathematic operations.
    const isNearlyEqual = function (a, b) {
      if (a === undefined || b === undefined) {
        return false;
      }
      return a.toFixed(10) - b.toFixed(10) === 0;
    };

    // getting all centers we need to check
    const newCenter = newProps.map3d.center;
    const currentCenter = this.props.map3d.center;
    const mapCenter = this._map.getCenter();
    // checking if the current props are the same
    const propsCentersEqual =
      isNearlyEqual(newCenter[0], currentCenter[0]) &&
      isNearlyEqual(newCenter[1], currentCenter[1]);
    // if props are the same nothing to do, otherwise
    // we need to check if the new center is equal to map center
    const centerIsNotUpdated =
      propsCentersEqual ||
      (isNearlyEqual(newCenter[0], mapCenter[0]) &&
        isNearlyEqual(newCenter[1], mapCenter[1]));

    // getting all zoom values we need to check
    const newZoom = newProps.map3d.zoom;
    const newPitch = newProps.map3d.pitch;
    const newBearing = newProps.map3d.bearing;
    const currentZoom = this.props.map3d.zoom;
    const currentPitch = this.props.map3d.pitch;
    const currentBearing = this.props.map3d.bearing;
    const mapZoom = this._map.getZoom();
    // checking if the current props are the same
    const propsZoomEqual = newZoom === currentZoom;

    const propsPitchEqual = newPitch === currentPitch;

    const propsBearingEqual = newBearing === currentBearing;
    // if props are the same nothing to do, otherwise
    // we need to check if the new zoom is equal to map zoom
    const zoomIsNotUpdated = propsZoomEqual || newZoom === mapZoom;

    //中心点坐标和缩放级别同时修改
    if (!centerIsNotUpdated && !zoomIsNotUpdated && newZoom) {
      this._map.flyTo({ center: newProps.map3d.center, zoom: newZoom });
    }
  };

  fillExtrusionOnMouseMove = () => {
    if (e.features.length > 0) {
      if (hoveredStateId) {
        this._map.setFeatureState(
          { source: "building", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      this._map.setFeatureState(
        { source: "building", id: hoveredStateId },
        { hover: true }
      );
    }
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    // if(this._map&&newProps.map.curarea&&newProps.map.curarea !== this.props.map.curarea){
    //   var relatedFeatures = this._map.querySourceFeatures('xzq_polygon', {
    //     sourceLayer: 'xzq_polygon',
    //     filter: ['==', 'NAME', newProps.map.curarea]
    //     });
    //   console.log(relatedFeatures);
    // }
    // if (newProps.showmode !== this.props.showmode) {
    //   if (newProps.showmode === "Corporation") {
    //     [
    //       "farenclusters",
    //       "unfarenclusterspoint",
    //       "farenclusterscount",
    //       // "兴趣点-level-towm",
    //     ].forEach((ele) => {
    //       this.props.updateLayer(ele, {
    //         layout: { visibility: "visible" },
    //       });
    //     });
    //   } else {
    //     [
    //       "farenclusters",
    //       "unfarenclusterspoint",
    //       "farenclusterscount",
    //       // "兴趣点-level-towm",
    //     ].forEach((ele) => {
    //       this.props.updateLayer(ele, {
    //         layout: { visibility: "none" },
    //       });
    //     });
    //   }
    // }

    if (this._map) {
      this._updateMapPositionFromNewProps(newProps);
    }

    if (this._map && newProps.orderlist !== this.props.orderlist) {
      for (let i = 0; i < newProps.orderlist.length - 1; i++) {
        const layername = "thematic_" + newProps.orderlist[i].props.title;
        const nextayername =
          "thematic_" + newProps.orderlist[i + 1].props.title;
        this._map.moveLayer(layername, nextayername);
      }
    }

    if (
      newProps.map3d.latitude !== this.props.map3d.latitude ||
      newProps.map3d.longitude !== this.props.map3d.longitude
    ) {
      if (this._map) {
        let bounds = this._map.getBounds();
        this.props.updateBounds(bounds);
      }
    }

    if (
      (newProps.draw &&
        this.props.draw.drawStatus !== newProps.draw.drawStatus) ||
      this.props.draw.drawMethod !== newProps.draw.drawMethod ||
      this.props.draw.features !== newProps.draw.features
    ) {
      if (!this.drawControl) return;
      switch (newProps.draw.drawStatus) {
        case "create":
          break;
        case "start":
          switch (newProps.draw.drawMethod) {
            case "polygon":
              this.drawControl.draw.changeMode("draw_polygon");
              break;
            case "polyline":
              this.drawControl.draw.changeMode("draw_line_string");
              break;
            case "point":
              this.drawControl.draw.changeMode("draw_point");
              break;
            case "rectangle":
              this.drawControl.draw.changeMode("draw_rectangle");
              break;
            default:
              break;
          }
          break;
        case "drawOrEdit":
          break;
        case "stop":
          break;
        case "replace":
          break;
        case "clean":
          this.drawControl.draw.deleteAll();
          break;
        case "endDrawing":
          break;
        case "print":
          this.printMap();
          break;
        default:
          return;
      }
    }
  }

  floorClick=(e)=>{

    if(this.state.roomover)return;
    this.props.updateLayer("楼栋2", {
      filter: ["all"],
    });
    this.props.updateLayer("楼栋1", {
      filter: ["all"],
    });
    this.props.updateLayer("楼栋", {layout:{visibility: 'visible'}});
    document.getElementById("labelCanvas").innerHTML="";
    
    this._map.doorobjs.map(obj => {
      tb.hide(obj);
    });
    this._map.doorobjs=[];
    this.setState({fheight:0})
  }

  render() {
    const { mapstyle, center, zoom, bearing, pitch } = this.props.map3d;
    //右键菜单
    const menu = (
      <Menu onClick={this.handleMenuClick} className="mapcontentmenu">
        {/* <Menu.Item key="3">
          <span className=" iconfont icon-24xanywhere blue-6" />
          这是哪儿
        </Menu.Item> */}
        <Menu.Item key="5">
          <span className=" iconfont icon-location1 blue-6" />
          设为地图中心
        </Menu.Item>
        <Menu.Item key="6">
          <span className=" iconfont icon-qingchu blue-6" />
          清除
        </Menu.Item>
      </Menu>
    );

    if (center) {
      return (
        <div>
          <Map
            {...this.props.map3d}
            id="mapboxgl-canvas"
            onDragEnd={this.mapviewchange}
            onZoomEnd={this.mapviewchange}
            onRotateEnd={this.mapviewchange}
            onMouseUp={this.onMouseUp}
            zoom={[zoom]}
            // bearing={[bearing||0]}
            // pitch={[pitch||0]}
            center={center}
            style={mapstyle}
            onClick={this.onMapClick}
            onStyleLoad={this.onStyleLoad}
            onMouseDown={this._hideContextMenu}
            containerStyle={{
              height: "100vh",
            }}
          >
            {this.state.fheight && (
              <GeoJSONLayer
                data={mapConfigJson.dataurl + "/floor.geojson"}
                fillExtrusionOnClick={this.floorClick}
                fillExtrusionPaint={{
                  "fill-extrusion-color": "rgba(85,253,171, 0.8)",
                  "fill-extrusion-height": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    10,
                    0,
                    18,
                    this.state.fheight * 6-3
                  ],
                  "fill-extrusion-base": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    10,
                    0,
                    18,
                    this.state.fbheight * 6
                  ],
                  "fill-extrusion-opacity": 0.8,
                  "fill-extrusion-intensity": 5,
                  "fill-extrusion-bottom-color": "#081d58",
                  "fill-extrusion-vertical-gradient": false,
                }}
              />
            )}
            {this._renderXiaoFangPopup()}
            {this.renderObjPopup()}
            {/* {this.renderEmergencyPopup()} */}
            <DrawControl
              modes={modes}
              ref={(drawControl) => {
                if (!this.drawControl) {
                  console.log(drawControl);
                  this.drawControl = drawControl;
                  this.props.drawEnable(true);
                }
              }}
              styles={[
                {
                  id: "highlight-active-points",
                  type: "circle",
                  filter: [
                    "all",
                    ["==", "$type", "Point"],
                    ["==", "meta", "feature"],
                    ["==", "active", "true"],
                  ],
                  paint: {
                    "circle-radius": 3,
                    "circle-color": "#D20C0C",
                  },
                },
                {
                  id: "points-are-blue",
                  type: "circle",
                  filter: [
                    "all",
                    ["==", "$type", "Point"],
                    ["==", "meta", "feature"],
                    ["==", "active", "false"],
                  ],
                  paint: {
                    "circle-radius": 5,
                    "circle-color": "#D20C0C",
                  },
                },
                // ACTIVE (being drawn)
                // line stroke
                {
                  id: "gl-draw-line",
                  type: "line",
                  filter: [
                    "all",
                    ["==", "$type", "LineString"],
                    ["!=", "mode", "static"],
                  ],
                  layout: {
                    "line-cap": "round",
                    "line-join": "round",
                  },
                  paint: {
                    "line-color": "#D20C0C",
                    "line-dasharray": [0.2, 2],
                    "line-width": 2,
                  },
                },
                // polygon fill
                {
                  id: "gl-draw-polygon-fill",
                  type: "fill",
                  filter: [
                    "all",
                    ["==", "$type", "Polygon"],
                    ["!=", "mode", "static"],
                  ],
                  paint: {
                    "fill-color": "#D20C0C",
                    "fill-outline-color": "#D20C0C",
                    "fill-opacity": 0.1,
                  },
                },
                // polygon outline stroke
                // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
                {
                  id: "gl-draw-polygon-stroke-active",
                  type: "line",
                  filter: [
                    "all",
                    ["==", "$type", "Polygon"],
                    ["!=", "mode", "static"],
                  ],
                  layout: {
                    "line-cap": "round",
                    "line-join": "round",
                  },
                  paint: {
                    "line-color": "#D20C0C",
                    "line-dasharray": [0.2, 2],
                    "line-width": 2,
                  },
                },
                // vertex point halos
                {
                  id: "gl-draw-polygon-and-line-vertex-halo-active",
                  type: "circle",
                  filter: [
                    "all",
                    ["==", "meta", "vertex"],
                    ["==", "$type", "Point"],
                    ["!=", "mode", "static"],
                  ],
                  paint: {
                    "circle-radius": 5,
                    "circle-color": "#FFF",
                  },
                },
                // vertex points
                {
                  id: "gl-draw-polygon-and-line-vertex-active",
                  type: "circle",
                  filter: [
                    "all",
                    ["==", "meta", "vertex"],
                    ["==", "$type", "Point"],
                    ["!=", "mode", "static"],
                  ],
                  paint: {
                    "circle-radius": 3,
                    "circle-color": "#D20C0C",
                  },
                },

                // INACTIVE (static, already drawn)
                // line stroke
                {
                  id: "gl-draw-line-static",
                  type: "line",
                  filter: [
                    "all",
                    ["==", "$type", "LineString"],
                    ["==", "mode", "static"],
                  ],
                  layout: {
                    "line-cap": "round",
                    "line-join": "round",
                  },
                  paint: {
                    "line-color": "#000",
                    "line-width": 3,
                  },
                },
                // polygon fill
                {
                  id: "gl-draw-polygon-fill-static",
                  type: "fill",
                  filter: [
                    "all",
                    ["==", "$type", "Polygon"],
                    ["==", "mode", "static"],
                  ],
                  paint: {
                    "fill-color": "#000",
                    "fill-outline-color": "#000",
                    "fill-opacity": 0.1,
                  },
                },
                // polygon outline
                {
                  id: "gl-draw-polygon-stroke-static",
                  type: "line",
                  filter: [
                    "all",
                    ["==", "$type", "Polygon"],
                    ["==", "mode", "static"],
                  ],
                  layout: {
                    "line-cap": "round",
                    "line-join": "round",
                  },
                  paint: {
                    "line-color": "#000",
                    "line-width": 3,
                  },
                },
              ]}
              onDrawCreate={(e) => this.onDrawCreate(e)}
              displayControlsDefault={false}
            />
          </Map>
          <div
            id="menudiv"
            style={{
              left: this.state.menupoint.x,
              top: this.state.menupoint.y,
              position: "absolute",
              visibility: this.state.menushow ? "visible" : "hidden",
            }}
          >
            {this.state.menushow && (
              <Dropdown
                getPopupContainer={() => document.getElementById("menudiv")}
                visible={true}
                overlay={menu}
              >
                <a className="ant-dropdown-link" href="#" />
              </Dropdown>
            )}
          </div>
          <Modal
            title="图片"
            visible={this.state.imagevisible}
            onOk={this.hideImages}
            onCancel={this.hideImages}
            okText="关闭"
            cancelText=""
          >
            <Carousel autoplay>
              {this.state.images.map((item) => (
                <img
                  src={`http://61.177.139.232:8088/data/Picture/${item}`}
                ></img>
              ))}
            </Carousel>
          </Modal>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  (state) => {
    return {
      query: state.query,
      map3d: state.map3d,
      map: state.map,
      thematics: state.thematics,
      routing: state.routing,
      sidebar: state.sidebar,
      arealocation: state.arealocation,
      toolbar: state.toolbar,
      mapConfig: state.mapConfig,
      draw: state.draw,
      intellisense: state.intellisense,
      devops: state.devops,
    };
  },
  {
    changeMap3DView,
    zoomToPoint3D,
    updateBounds,
    changeDrawingStatus,
    endDrawing,
    drawEnable,
    updateLayer,
    setSelectFaRenItem,
  }
)(MapBoxMap);
