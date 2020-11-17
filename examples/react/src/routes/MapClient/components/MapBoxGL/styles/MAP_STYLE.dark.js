const mapDarkStyle={
  "version": 8,
  "metadata": {},
  "sources": {
    block: {
      type: "vector",
      scheme: "xyz",
     // zoomOffset: -1,
      minzoom: 10,
      tiles: [
        "http://geowork.wicp.vip:25081/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=swsk:block&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
      ],
    },
    roads: {
      type: "vector",
      scheme: "xyz",
    //  zoomOffset: -1,
      minzoom: 10,
      tiles: [
        "http://geowork.wicp.vip:25081/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=swsk:roads&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
      ],
    },
    poi: {
      type: "vector",
      scheme: "xyz",
    //  zoomOffset: -1,
      minzoom: 10,
      tiles: [
        "http://geowork.wicp.vip:25081/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=swsk:poi&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
      ],
    },
    citybuilding: {
      type: "vector",
      scheme: "xyz",
    //  zoomOffset: -1,
      minzoom: 10,
      tiles: [
        "http://geowork.wicp.vip:25081/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=swsk:building&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
      ],
    },
    faren: {
      type: "geojson",
      data: mapConfigJson.dataurl+"/faren.geojson",
      cluster: true,
    },
  },
  sprite: "http://localhost:8081/mapbox/darksprites/sprite",
  glyphs: "http://localhost:8081/mapbox/glyphs/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "背景",
      "type": "background",
      "minzoom": 0,
      "layout": {"visibility": "visible"},
      "paint": {"background-color": "#343332"}
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": ["all"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#262626", "fill-antialias": false}
    },
    {
      "id": "highway_motorway_inner",
      "type": "line",
      "metadata": {"mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "motorway"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "none"
      },
      "paint": {
        "line-color": {"base": 1, "stops": [[5.8, "#525252"], [6, "#000"]]},
        "line-width": {"base": 1.4, "stops": [[4, 2], [6, 1.3], [20, 30]]}
      }
    },
    {
      "id": "highway_motorway_casing",
      "type": "line",
      "metadata": {"mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "motorway"]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "none"
      },
      "paint": {
        "line-dasharray": [2, 0],
        "line-opacity": 1,
        "line-width": {"base": 1.4, "stops": [[5.8, 0], [6, 3], [20, 40]]},
        "line-color": "#525252"
      }
    },
    {
      "id": "highway_major_inner",
      "type": "line",
      "metadata": {"mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 11,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "none"
      },
      "paint": {
        "line-width": {"base": 1.3, "stops": [[10, 2], [20, 20]]},
        "line-color": "#E5E9A0"
      }
    },
    {
      "id": "highway_major_casing",
      "type": "line",
      "metadata": {"mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 11,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "none"
      },
      "paint": {
        "line-color": "#CFD291",
        "line-dasharray": [12, 0],
        "line-width": {"base": 1.3, "stops": [[10, 0.5], [20, 0.2]]}
      }
    },
    {
      "id": "highway_major_subtle",
      "type": "line",
      "metadata": {"mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "maxzoom": 24,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "none"
      },
      "paint": {
        "line-color": "#525252",
        "line-width": {"stops": [[6, 0], [8, 2]]}
      }
    },
    {
      "id": "place_city",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["all", ["!=", "capital", 2], ["==", "class", "city"], [">", "rank", 3]]
      ],
      "layout": {
        "icon-image": {"base": 1, "stops": [[0, "circle-11"], [8, ""]]},
        "icon-size": 0.4,
        "text-anchor": {"base": 1, "stops": [[0, "left"], [8, "center"]]},
        "text-field": "{name:nonlatin}",
        "text-font": ["Microsoft YaHei Regular"],
        "text-justify": "left",
        "text-offset": [0.5, 0.2],
        "text-size": 18,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#EFF1F3",
        "text-halo-width": 1,
        "text-halo-color": "#0A141C"
      }
    },
    {
      "id": "乡镇",
      "type": "fill",
      "source": "block",
      "source-layer": "ZQ_XiangQu_A",
      "maxzoom": 24,
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#2F2E2D"}
    },
    {
      "id": "道路线-乡村路-边线",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 15,
      "filter": ["all", ["==", "GLXZDJ", "乡村路"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#464646",
        "line-width": {
          "base": 1.2,
          "stops": [[12, 0.5], [13, 1], [14, 4], [20, 15]]
        }
      }
    },
    {
      "id": "院落-公共服务设施",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "YL_YuanLuo_A",
      "minzoom": 14,
      "filter": ["all", ["==", "备注", "公共服务设施"]],
      "layout": {"visibility": "visible"},
      "paint": {
        "fill-color": {"base": 1, "stops": [[12, "#1F1F1E"], [20, "#1F1F1E"]]},
        "fill-outline-color": "#272626"
      }
    },
    {
      "id": "院落-医院",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "YL_YuanLuo_A",
      "minzoom": 13,
      "filter": ["all", ["==", "$type", "Polygon"], ["==", "小区", "医院"]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#1F1F1E", "fill-outline-color": "#272626"}
    },
    {
      "id": "院落-商业",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "YL_YuanLuo_A",
      "minzoom": 13,
      "filter": ["all", ["==", "$type", "Polygon"], ["==", "备注", "商业广场"]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#1F1F1E", "fill-outline-color": "#272626"}
    },
    {
      "id": "院落-小区",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "YL_YuanLuo_A",
      "minzoom": 13,
      "filter": ["all", ["==", "备注", "小区"]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#1F1F1E", "fill-outline-color": "#232222"}
    },
    {
      "id": "院落-学校",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "YL_YuanLuo_A",
      "minzoom": 13,
      "filter": ["all", ["==", "$type", "Polygon"], ["==", "备注", "学校"]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#1F1F1E", "fill-outline-color": "#272626"}
    },
    {
      "id": "道路面",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "roads",
      "source-layer": "DL_DaoLu_A",
      "minzoom": 13,
      "filter": ["all", ["==", "$type", "Polygon"]],
      "layout": {"visibility": "none"},
      "paint": {"fill-color": "#464646"}
    },
    {
      "id": "道路面-路口",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "roads",
      "source-layer": "DL_LuKou_A",
      "minzoom": 13,
      "filter": ["all", ["==", "$type", "Polygon"]],
      "layout": {"visibility": "none"},
      "paint": {"fill-color": "#464646"}
    },
    {
      "id": "植被-城市",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "ZB_ChengShi_A",
      "minzoom": 10,
      "maxzoom": 24,
      "filter": ["all", [">=", "SHAPE_Area", 6000]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#1E1F1E"}
    },
    {
      "id": "植被-农林",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "ZB_NongLin_A",
      "minzoom": 10,
      "filter": ["all", [">=", "SHAPE_Area", 6000]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#1E1F1E"}
    },
    {
      "id": "水域-湖泊",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "HL_HuPo_A",
      "minzoom": 12,
      "filter": ["all"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#0E0F0E"}
    },
    {
      "id": "水域-河流-小",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "HL_HeiLiu_A",
      "minzoom": 13,
      "filter": ["all", ["<=", "SHAPE_Area", 5000]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#0E0F0E"}
    },
    {
      "id": "水域-河流-大",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "HL_HeiLiu_A",
      "minzoom": 10,
      "filter": ["all", [">", "SHAPE_Area", 8000]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#0D0E0D"}
    },
    {
      "id": "水域-河流-主",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "block",
      "source-layer": "HL_HeiLiu_A",
      "minzoom": 0,
      "filter": [
        "all",
        ["in", "NAME", "焦港河", "如泰运河", "如海运行", "丁堡河", "通扬运河", "长江"]
      ],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "#0D0E0D"}
    },
    {
      "id": "道路线-支路-边线",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 13,
      "filter": ["all", ["==", "CSDLDJ", "支路"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#3F3F3F",
        "line-width": {
          "base": 1.2,
          "stops": [[12, 0.5], [13, 1], [14, 4], [20, 15]]
        }
      }
    },
    {
      "id": "道路线-机耕路-边线",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 20,
      "filter": ["all", ["==", "GLXZDJ", "机耕路"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#3F3F3F",
        "line-width": {
          "base": 1.2,
          "stops": [[12, 0.5], [13, 1], [14, 4], [20, 15]]
        }
      }
    },
    {
      "id": "道路线-次干道-边线",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 13,
      "filter": ["all", ["==", "CSDLDJ", "次干道"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#3F3F3F",
        "line-width": {"base": 1.2, "stops": [[8, 1.5], [20, 10]]}
      }
    },
    {
      "id": "道路线-主干道-边线",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 11.5,
      "maxzoom": 24,
      "filter": ["all", ["==", "CSDLDJ", "主干道"]],
      "layout": {"line-join": "round", "visibility": "visible"},
      "paint": {
        "line-color": "#3F3F3F",
        "line-width": {"base": 1.2, "stops": [[5, 0.4], [10, 1.5], [20, 22]]}
      }
    },
    {
      "id": "道路线-县道-边线",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 11.5,
      "maxzoom": 24,
      "filter": ["all", ["==", "GLXZDJ", "县道"]],
      "layout": {"line-join": "round", "visibility": "visible"},
      "paint": {
        "line-color": "#3F3F3F",
        "line-width": {"base": 1.2, "stops": [[5, 0.4], [10, 0.6], [20, 22]]}
      }
    },
    {
      "id": "道路线-省道-边线",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 0,
      "maxzoom": 24,
      "filter": ["all", ["==", "GLXZDJ", "省道"]],
      "layout": {
        "line-join": "round",
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#3F3F3F",
        "line-dasharray": [1],
        "line-width": {
          "base": 1.2,
          "stops": [[5, 0.4], [6, 0.8], [7, 1.5], [20, 34]]
        }
      }
    },
    {
      "id": "道路线-国道-边线",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 0,
      "maxzoom": 24,
      "filter": ["all", ["==", "GLXZDJ", "国道"]],
      "layout": {
        "line-join": "round",
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#3F3F3F",
        "line-dasharray": [1],
        "line-width": {
          "base": 1.2,
          "stops": [[5, 0.4], [6, 0.6], [7, 1.5], [20, 34]]
        }
      }
    },
    {
      "id": "道路线-乡村路",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 15,
      "filter": ["all", ["==", "GLXZDJ", "乡村路"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#464646",
        "line-width": {"base": 1.2, "stops": [[13, 0], [14, 2.5], [20, 11.5]]}
      }
    },
    {
      "id": "道路线-机耕路",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 20,
      "filter": ["all", ["==", "GLXZDJ", "机耕路"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#E5E9A0",
        "line-width": {"base": 1.2, "stops": [[13, 0], [14, 2.5], [20, 11.5]]}
      }
    },
    {
      "id": "道路线-支路",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 13,
      "filter": ["all", ["==", "CSDLDJ", "支路"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#464646",
        "line-width": {"base": 1.2, "stops": [[13, 0], [14, 2.5], [20, 11.5]]}
      }
    },
    {
      "id": "道路线-次干道",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 13,
      "filter": ["all", ["==", "CSDLDJ", "次干道"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#464646",
        "line-width": {"base": 1.2, "stops": [[6, 0], [8, 0.5], [20, 8]]}
      }
    },
    {
      "id": "道路线-主干道",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 11.5,
      "maxzoom": 24,
      "filter": ["all", ["==", "CSDLDJ", "主干道"]],
      "layout": {"line-join": "round", "visibility": "visible"},
      "paint": {
        "line-color": "#464646",
        "line-width": {"base": 1.2, "stops": [[6.5, 0], [10, 0.5], [20, 18]]}
      }
    },
    {
      "id": "道路线-县道",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 11.5,
      "maxzoom": 24,
      "filter": ["all", ["==", "GLXZDJ", "县道"]],
      "layout": {"line-join": "round", "visibility": "visible"},
      "paint": {
        "line-color": "#464646",
        "line-width": {"base": 1.2, "stops": [[6.5, 0], [10, 0.5], [20, 18]]}
      }
    },
    {
      "id": "道路线-省道",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 0,
      "maxzoom": 24,
      "filter": ["all", ["==", "GLXZDJ", "省道"]],
      "layout": {
        "line-join": "round",
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#464646",
        "line-width": {"base": 1.2, "stops": [[6.5, 0], [7, 0.8], [20, 30]]}
      }
    },
    {
      "id": "道路线-国道",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 0,
      "maxzoom": 24,
      "filter": ["all", ["in", "GLXZDJ", "国道", "高速公路", "国道（旧）"]],
      "layout": {
        "line-join": "round",
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#404040",
        "line-width": {"base": 1.2, "stops": [[6.5, 0], [7, 1], [20, 30]]}
      }
    },
    {
      "id": "建筑物",
      "type": "fill-extrusion",
      "source": "citybuilding",
      "source-layer": "FW_FangWu_A",
      "minzoom": 16,
      "filter": ["all"],
      "layout": {"visibility": "visible"},
      "paint": {
        "fill-extrusion-color": "#1F1F1E",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["*", 3, ["get", "Floor"]]
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "BasementFl"]
        ],
        "fill-extrusion-opacity": 0.5,
        "fill-extrusion-intensity":6,
      }
    },
    {
      "id": "兴趣点--水系设施",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 18,
      "maxzoom": 24,
      "filter": ["all", ["in", "TYPE", "闸坝", "泵站", "变电所"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "other",
        "text-field": "{NAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 1,
        "text-halo-color": "#0D0E0D"
      }
    },
    {
      "id": "兴趣点-企业",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 17,
      "maxzoom": 24,
      "filter": ["all", ["==", "TYPE", "企业"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "text-field": "{NAME}",
        "text-offset": [0.3, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right",
        "icon-image": "公司"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 1,
        "text-halo-color": "#0D0E0D"
      }
    },
    {
      "id": "兴趣点-居民点",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 16,
      "maxzoom": 24,
      "filter": ["all", ["in", "TYPE", "城市自治组织", "农村自治组织"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "text-field": "{NAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 0,
        "text-halo-color": "#0D0E0D"
      }
    },
    {
      "id": "兴趣点-体育场广场",
      "type": "symbol",
      "source": "poi",
      "source-layer": "POI",
      "minzoom": 14,
      "maxzoom": 24,
      "filter": [
        "all",
        ["in", "TYPE", "体育场馆", "广场", "农贸市场", "商场", "商铺", "家具建材"]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{TYPE}",
        "text-field": "{NAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 1,
        "text-color": "#FFFFFF",
        "text-halo-width": 1.5,
        "text-halo-color": "#191B20"
      }
    },
    {
      "id": "兴趣点-风景名胜区",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 14,
      "maxzoom": 24,
      "filter": ["all", ["in", "TYPE", "风景名胜区", "人物纪念地", "公园", "事件纪念地"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "风景区",
        "text-field": "{NAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 0,
        "text-halo-color": "#FFFFFF"
      }
    },
    {
      "id": "兴趣点-宗教纪念地",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 11,
      "maxzoom": 24,
      "filter": ["all", ["in", "TYPE", "宗教纪念地"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "text-field": "{NAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right",
        "icon-image": "寺庙"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "rgba(0, 0, 0, 1)",
        "text-halo-width": 1,
        "text-halo-color": "#FEFEFE"
      }
    },
    {
      "id": "兴趣点-教育",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 11,
      "maxzoom": 24,
      "filter": ["all", ["in", "TYPE", "幼儿园", "小学", "中学"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "小学",
        "text-field": "{NAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 1.5,
        "text-halo-color": "#191B20"
      }
    },
    {
      "id": "兴趣点-事业单位",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 12,
      "maxzoom": 24,
      "filter": ["all", ["in", "TYPE", "事业单位", "军事单位", "党政机关", "公检法机构"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "bottom-right",
        "icon-image": "{TYPE}",
        "text-field": "{NAME}",
        "text-offset": [2, -1],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right",
        "text-ignore-placement": false,
        "text-rotation-alignment": "auto",
        "text-justify": "center",
        "text-transform": "none",
        "text-letter-spacing": 0,
        "text-max-angle": 45,
        "text-rotate": 0
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FEFEFE",
        "text-halo-width": 1,
        "text-halo-color": "#0D0E0D"
      }
    },
    {
      "id": "兴趣点-医疗",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 14,
      "maxzoom": 24,
      "filter": ["all", ["==", "TYPE", "医院"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "综合医院",
        "text-field": "{NAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 1,
        "text-halo-color": "#0D0E0D"
      }
    },
    {
      "id": "兴趣点-政府机构",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 10.5,
      "maxzoom": 24,
      "filter": ["all", ["==", "TYPE", "政府机关"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "text-field": "{NAME}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right",
        "text-pitch-alignment": "auto",
        "symbol-z-order": "auto",
        "icon-ignore-placement": true,
        "icon-optional": false,
        "icon-rotation-alignment": "auto",
        "icon-text-fit": "none",
        "icon-keep-upright": true,
        "icon-pitch-alignment": "auto",
        "icon-allow-overlap": true,
        "icon-image": "行政单位"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 1,
        "text-color": "#E0E0E0",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(0, 0, 0, 1)",
        "icon-translate-anchor": "viewport"
      }
    },
    {
      "id": "兴趣点-交通",
      "type": "symbol",
      "source": "poi",
      "source-layer": "DMDZ",
      "minzoom": 14,
      "maxzoom": 24,
      "filter": [
        "all",
        ["in", "TYPE", "机场", "出入口", "道路", "加油站", "收费站", "渡口", "火车站", "汽车站"]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{TYPE}",
        "text-field": "{TYPE}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 1,
        "text-halo-color": "#0D0E0D"
      }
    },
    {
      "id": "铁路",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_TieLu_L",
      "minzoom": 0,
      "maxzoom": 24,
      "filter": ["all"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "#242424",
        "line-width": {"stops": [[15, 3], [16, 7]]}
      }
    },
    {
      "id": "铁路-白",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "roads",
      "source-layer": "DL_TieLu_L",
      "minzoom": 0,
      "maxzoom": 24,
      "filter": ["all"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "#565656",
        "line-width": {"stops": [[15, 3], [16, 5]]},
        "line-dasharray": [2, 2]
      }
    },
    {
      "id": "边框-浅",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "block",
      "source-layer": "bounds",
      "minzoom": 0,
      "filter": ["all"],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible",
        "line-round-limit": 1,
        "line-miter-limit": 2
      },
      "paint": {
        "line-color": "#464646",
        "line-opacity": 1,
        "line-dasharray": [2],
        "line-offset": -4,
        "line-width": 3.5
      }
    },
    {
      "id": "边框-深",
      "type": "line",
      "metadata": {"mapbox:group": "1444849354174.1904"},
      "source": "block",
      "source-layer": "bounds",
      "minzoom": 0,
      "filter": ["all"],
      "layout": {
        "line-join": "round",
        "line-cap": "round",
        "visibility": "visible",
        "line-round-limit": 1,
        "line-miter-limit": 2
      },
      "paint": {
        "line-color": "rgba(6, 6, 6, 1)",
        "line-opacity": 1,
        "line-width": 1,
        "line-dasharray": [1, 2],
        "line-offset": 0
      }
    },
    {
      "id": "兴趣点-level-country",
      "type": "symbol",
      "source": "poi",
      "source-layer": "loc_point",
      "minzoom": 13,
      "maxzoom": 24,
      "filter": ["all", ["==", "TYPE", 22200]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{TYPE}",
        "text-field": "{MapName}",
        "text-offset": [0.6, 0],
        "text-size": 13,
        "text-max-width": 6,
        "visibility": "none",
        "icon-offset": [6, 0],
        "icon-anchor": "right"
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 0,
        "text-halo-color": "#FFFFFF"
      }
    },
    {
      "id": "兴趣点-level-towm",
      "type": "symbol",
      "source": "poi",
      "source-layer": "loc_point",
      "minzoom": 0,
      "maxzoom": 10.57,
      "filter": ["all", ["==", "TYPE", 21500]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{TYPE}",
        "text-field": "{MapName}",
        "text-offset": [0.6, 0],
        "text-size": 12,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "right",
        "icon-size": 1
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 13,
        "text-halo-color": "#2BBBF0",
        "text-opacity": 1
      }
    },
    {
      "id": "道路-国道省道",
      "type": "symbol",
      "source": "roads",
      "source-layer": "DL_DaoLu_L",
      "minzoom": 0,
      "maxzoom": 24,
      "filter": [
        "all",
        [
          "in",
          "GLNO",
          "G204",
          "G40",
          "G15",
          "S28",
          "G345",
          "S356",
          "Y018",
          "S226",
          "S334",
          "S355"
        ]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["Microsoft YaHei Regular"],
        "text-anchor": "left",
        "icon-image": "{TYPE}",
        "text-field": "{GLNO}",
        "text-offset": [0, 0],
        "text-size": 12,
        "text-max-width": 6,
        "visibility": "visible",
        "icon-offset": [6, 0],
        "icon-anchor": "center",
        "icon-size": 1,
        "text-pitch-alignment": "map",
        "text-justify": "auto",
        "icon-pitch-alignment": "map",
        "symbol-spacing": 250,
        "text-line-height": 1.2,
        "text-max-angle": 45,
        "icon-rotation-alignment": "auto",
        "icon-text-fit": "none",
        "icon-padding": 2
      },
      "paint": {
        "icon-opacity": 1,
        "text-halo-blur": 0.5,
        "text-color": "#FFFFFF",
        "text-halo-width": 15,
        "text-opacity": 1,
        "icon-halo-color": "#191B20",
        "text-translate-anchor": "map"
      }
    },
    {
      "id": "水域-河流-标注",
      "type": "symbol",
      "source": "block",
      "source-layer": "HL_HeiLiu_A",
      "filter": [
        "all",
        ["in", "NAME", "焦港河", "如泰运河", "如海运行", "丁堡河", "通扬运河", "长江"]
      ],
      "layout": {
        "text-field": "{NAME}",
        "text-font": ["Microsoft YaHei Regular"],
        "text-size": 13,
        "symbol-placement": "point",
        "text-anchor": "center",
        "text-justify": "center",
        "text-keep-upright": false,
        "symbol-z-order": "auto",
        "text-max-width": 10,
        "symbol-spacing": 250
      },
      "paint": {
        "text-color": "#FFFFFF",
        "text-halo-color": "#191B20",
        "text-halo-width": 1.5,
        "text-translate-anchor": "map"
      }
    }
  ],
  "id": "hrmq9na14"
}